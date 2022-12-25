local files   = require 'files'
local guide   = require 'core.guide'
local vm      = require 'vm'
local define  = require 'proto.define'
local lang    = require 'language'
local await   = require 'await'
local client  = require 'provider.client'

local function isToBeClosed(source)
    if not source.attrs then
        return false
    end
    for _, attr in ipairs(source.attrs) do
        if attr[1] == 'close' then
            return true
        end
    end
    return false
end

return function (uri, callback)
    local ast = files.getAst(uri)
    if not ast then
        return
    end

    local cache = {}
    local function checkFunction(source)
        if cache[source] ~= nil then
            return cache[source]
        end
        cache[source] = false
        local parent = source.parent
        if not parent then
            return false
        end
        if  parent.type ~= 'local'
        and parent.type ~= 'setlocal' then
            return false
        end
        if isToBeClosed(parent) then
            return false
        end
        local hasGet
        local refs = vm.getRefs(source)
        for _, src in ipairs(refs) do
            if vm.isGet(src) then
                local func = guide.getParentFunction(src)
                if not checkFunction(func) then
                    hasGet = true
                    break
                end
            end
        end
        if not hasGet then
            if client.isVSCode() then
                callback {
                    start   = source.start,
                    finish  = source.finish,
                    tags    = { define.DiagnosticTag.Unnecessary },
                    message = lang.script.DIAG_UNUSED_FUNCTION,
                }
            else
                callback {
                    start   = source.keyword[1],
                    finish  = source.keyword[2],
                    tags    = { define.DiagnosticTag.Unnecessary },
                    message = lang.script.DIAG_UNUSED_FUNCTION,
                }
            end
            cache[source] = true
            return true
        end
        return false
    end

    -- 只检查局部函数
    guide.eachSourceType(ast.ast, 'function', function (source)
        checkFunction(source)
    end)
end
