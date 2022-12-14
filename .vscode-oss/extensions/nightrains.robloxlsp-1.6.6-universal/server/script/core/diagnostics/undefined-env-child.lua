local files  = require 'files'
local guide  = require 'core.guide'
local vm     = require 'vm'
local lang   = require 'language'

return function (uri, callback)
    local ast = files.getAst(uri)
    if not ast then
        return
    end
    guide.eachSourceType(ast.ast, 'getglobal', function (source)
        -- 单独验证自己是否在重载过的 _ENV 中有定义
        if source.node.tag == '_ENV' then
            return
        end
        local defs = guide.requestDefinition(source)
        if #defs > 0 then
            return
        end
        local key = source[1]
        callback {
            start   = source.start,
            finish  = source.finish,
            message = lang.script('DIAG_UNDEF_ENV_CHILD', key),
        }
    end)
end
