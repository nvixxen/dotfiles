local files  = require 'files'
local guide  = require 'parser.guide'
local vm     = require 'vm'
local infer  = require 'core.infer'
local await  = require 'await'
local hasVarargs, errType

local tableMap = {
    ['table']  = true,
    ['array']  = true,
    ['ltable'] = true,
    ['[]']     = true,
}

local typeNameMap = {
    ['doc.extends.name'] = true,
    ['doc.class.name']   = true,
    ['doc.alias.name']   = true,
    ['doc.type.name']    = true,
    ['doc.type.enum']    = true,
    ['doc.resume']       = true,

}

local function isTable(name)
    if type(name) ~= 'string' then
        return
    end
    if tableMap[name]
    ---table<K: number, V: string> table
    or tableMap[name:sub(1, 5)]
    ---string[]
    or tableMap[name:sub(-2, -1)] then
        return true
    end
    return false
end

local function isUserDefineClass(name)
    if vm.isBuiltinType(name) then
        return false
    else
        local defs = vm.getDocDefines(name)
        for _, v in ipairs(defs) do
            if v.type == 'doc.class.name' then
                return true
            end
        end
    end
    return false
end

local function isClassOralias(typeName)
    if not typeName then
        return false
    elseif typeNameMap[typeName]
    or vm.isBuiltinType(typeName) then
        return true
    else
        return false
    end
end

local function isGeneric(type)
    if type.typeGeneric then
        return true
    end
    return false
end

local function compatibleType(param, args)
    if string.sub(param.type, 1, 9) == 'doc.type.'
    and not param[1] then
        param[1] = string.sub(param.type, 10)
    end
    for _, v in ipairs(args) do
        if v[1] == 'any' then
            return true
        elseif param[1] == v[1] then
            return true
        elseif (param[1] == 'number' or param[1] == 'integer')
        and (v[1] == 'integer' or v[1] == 'number') then
            return true
        elseif v[1] == 'string' then
            ---??????alias
            --@alias searchmode '"ref"'|'"def"'
            if param[1] and param[1]:sub(1,1) == '"' then
                return true
            end
        elseif (isTable(v.type) or isTable(v[1]))
        and (isTable(param[1]) or isTable(param.type)) then
            return true
        end
    end
    return false
end

-- local function addFatherClass(types, type)
--     if not type[1] then
--         return
--     end
--     local docDefs = vm.getDocDefines(type[1])
--     for _, doc in ipairs(docDefs) do
--         if doc.parent
--         and doc.parent.type == 'doc.class'
--         and doc.parent.extends then
--             for _, tp in ipairs(doc.parent.extends) do
--                 if tp.type == 'doc.extends.name' then
--                     types[#types+1] = {
--                         [1] = tp[1],
--                         type = 'doc.class.name'
--                     }
--                 end
--             end
--         end
--     end
-- end

local function addFatherClass(infers)
    for k in pairs(infers) do
        if type(k) == 'string' then
            local docDefs = vm.getDocDefines(k)
            for _, doc in ipairs(docDefs) do
                if doc.parent
                and doc.parent.type == 'doc.class'
                and doc.parent.extends then
                    for _, tp in ipairs(doc.parent.extends) do
                        if tp.type == 'doc.extends.name' then
                            infers[tp[1]] = true
                        end
                    end
                end
            end
        end
    end
end

local function getParamTypes(arg)
    if not arg then
        return false
    end
    local types
    ---??????doc.type.function
    if arg.type == 'doc.type.arg' then
        if arg.name and arg.name[1] == '...' then
            types = {
                [1] = {
                    [1] = '...',
                    type = 'varargs'
                }
            }
            return true, types
        end
        types = arg.extends.types
        return true, types
    ---??????function
    elseif arg.type == 'local' then
        local argDefs = vm.getDefs(arg)
        if #argDefs == 0 then
            return false
        end
        types = {}
        ---method, ??????self?????????????????????class??????type??????????????????any
        if arg.tag == 'self' then
            for _, argDef in ipairs(argDefs) do
                if argDef.type == 'doc.class.name'
                or argDef.type == 'doc.type.name'
                or argDef.type == 'doc.type.enum'
                or argDef.type == 'doc.type.ltable' then
                    types[#types+1] = argDef
                end
            end
            if #types == 0 then
                return false
            end
            return true, types
        else
            for _, argDef in ipairs(argDefs) do
                if argDef.type == 'doc.param' and argDef.extends then
                    types = argDef.extends.types
                    if argDef.optional then
                        types[#types+1] = {
                            [1] = 'nil',
                            type = 'nil'
                        }
                    end
                elseif argDef.type == 'doc.type.enum'
                or argDef.type == 'doc.type.ltable'  then
                    types[#types+1] = argDef
                ---????????????
                elseif argDef.name and argDef.name[1] == '...' then
                    types = {
                        [1] = {
                            [1] = '...',
                            type = 'varargs'
                        }
                    }
                    break
                end
            end
            if #types == 0 then
                return false
            else
                return true, types
            end
        end
    ---??????????????????????????????
    elseif arg.type == '...' then
        types = {
            [1] = {
                [1] = '...',
                type = 'varargs'
            }
        }
        return true, types
    end
end

local function getInfoFromDefs(defs)
    local paramsTypes = {}
    local funcArgsType
    local mark = {}
    for _, def in ipairs(defs) do
        funcArgsType = {}
        if def.value then
            def = def.value
        end
        if not mark[def] then
            mark[def] = true
            if def.type == 'function'
            or def.type == 'doc.type.function' then
                if def.args then
                    for _, arg in ipairs(def.args) do
                        local suc, types = getParamTypes(arg)
                        if suc then
                            local plusAlias = {}
                            for i, tp in ipairs(types) do
                                local aliasDefs =  vm.getDefs(tp)
                                for _, v in ipairs(aliasDefs) do
                                    ---TODO(arthur)
                                    -- if not v.type then
                                    -- end
                                    if v[1] ~= tp[1]
                                    and isClassOralias(v.type) then
                                        plusAlias[#plusAlias+1] = v
                                    end
                                end
                                plusAlias[#plusAlias+1] = types[i]
                            end
                            funcArgsType[#funcArgsType+1] = plusAlias
                        else
                            ---?????????????????????????????????type?????????????????????
                            funcArgsType = {}
                            break
                        end
                    end
                end
                if #funcArgsType > 0 then
                    paramsTypes[#paramsTypes+1] = funcArgsType
                end
            end
        end
    end
    return paramsTypes
end

local function getArgsInfo(callArgs)
    local callArgsType = {}
    for _, arg in ipairs(callArgs) do
        -- local defs = vm.getDefs(arg)
        local infers = infer.searchInfers(arg)
        if infers['_G'] or infer['_ENV'] then
            infers['_G'] = nil
            infers['_ENV'] = nil
            infers['table'] = true
        end
        local hasAny = infers['any']
        ---????????????
        addFatherClass(infers)
        if not hasAny then
            infers['any'] = nil
            infers['unknown'] = nil
        end
        local types = {}
        if not infers['table'] then
            for k in pairs(infers) do
                if not vm.isBuiltinType(k)
                and isUserDefineClass(k) then
                    infers['table'] = true
                    break
                end
            end
        end
        for k in pairs(infers) do
            if k then
                types[#types+1] = {
                    [1] = k,
                    type = k
                }
            end
        end
        if #types < 1 then
            return false
        end
        types.start = arg.start
        types.finish = arg.finish
        callArgsType[#callArgsType+1] = types
        -- local defs = vm.getDefs(arg)
        -- local types = {}
        -- types.typeMap = {}
        -- for _, def in ipairs(defs) do
        --     if vm.isBuiltinType(def.type) then
        --         types[#types+1] = {
        --             [1] = def.type,
        --             type = def.type
        --         }
        --     elseif def.type == 'doc.class.name'
        --     or def.type == 'doc.type.name'
        --     or def.type == 'doc.type.enum'
        --     or def.type == 'doc.type.ltable' then
        --         if def[1] then
        --             if not types.typeMap[def[1]] then
        --                 types[#types+1] = def
        --                 types.typeMap[def[1]] = true
        --             end
        --         else
        --             types[#types+1] = def
        --         end
        --     elseif def.type == 'doc.type' then
        --         print(1)
        --     elseif def.type == 'doc.type.arg' then
        --         for _, tp in ipairs(arg.extends.types) do
        --             types[#types+1] = arg.extends.types[1]
        --         end
        --     elseif def.type == 'doc.param' then
        --         for i, tp in ipairs(def.extends.types) do
        --             types[#types+1] = def.extends.types[i]
        --         end
        --         if def.optional then
        --             types[#types+1] = {
        --                 [1] = 'nil',
        --                 type = 'nil'
        --             }
        --         end
        --     end
        -- end
        -- for _, tp in ipairs(types) do
        --     if not vm.isBuiltinType(tp.type) then
        --         addFatherClass(types, tp)
        --     end
        -- end
        -- types.start = arg.start
        -- types.finish = arg.finish
        -- if #types == 0 then
        --     types = {
        --         [1] = {
        --             [1] = 'any',
        --             type = 'any',
        --         }
        --     }
        -- end
        -- callArgsType[#callArgsType+1] = types
    end
    return true, callArgsType
end

local function matchParams(paramsTypes, i, arg)
    local flag = ''
    local messages = {}
    ---paramsTypes ????????????????????????????????????
    ---paramTypes  ??????????????????????????????????????????
    ---param       ???????????????????????????i??????????????????
    for _, paramTypes in ipairs(paramsTypes) do
        if not paramTypes[i] then
            goto CONTINUE
        end
        flag = ''
        for _, param in ipairs(paramTypes[i]) do
            if param[1] == '...' then
                hasVarargs = true
                return true
            ---????????????????????????????????????
            elseif compatibleType(param, arg)
            or param[1] == 'any' then
                flag = ''
                return true
            ---???????????????????????????
            elseif isGeneric(param) then
                return true
            else
                ---TODO(arthur) ????????????param[1]???nil???
                if param[1] and not errType[param[1]] then
                    errType[param[1]] = true
                    flag = flag ..' ' .. (param[1] or '')
                end
            end
        end
        if flag ~= '' then
            local argm = '[ '
            for _, v in ipairs(arg) do
                argm = argm .. v[1]..' '
            end
            argm = argm .. ']'
            local message = 'Argument of type in '..argm..' is not assignable to parameter of type in ['..flag..' ]'
            if not messages[message] then
                messages[message] = true
                messages[#messages+1] = message
            end
        end
        ::CONTINUE::
    end
    return false, messages
end

---@async
return function (uri, callback)
    local ast = files.getState(uri)
    if not ast then
        return
    end
    guide.eachSourceType(ast.ast, 'call', function (source) ---@async
        if not source.args then
            return
        end
        await.delay()
        local callArgs = source.args
        local suc, callArgsType = getArgsInfo(callArgs)
        if not suc then
            return
        end
        local func = source.node
        local defs = vm.getDefs(func)
        ---????????????emmy?????????????????????
        local paramsTypes = getInfoFromDefs(defs)
        ---????????????
        for i, arg in ipairs(callArgsType) do
            ---????????????
            hasVarargs = false
            errType = {}
            local match, messages = matchParams(paramsTypes, i, arg)
            if hasVarargs then
                return
            end
            ---????????????
            if not match then
                if #messages > 0 then
                    callback{
                        start   = arg.start,
                        finish  = arg.finish,
                        message = table.concat(messages, '\n')
                    }
                end
            end
        end
        ---????????????????????????
    end)
end
