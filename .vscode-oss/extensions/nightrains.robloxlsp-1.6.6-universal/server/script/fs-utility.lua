local fs           = require 'bee.filesystem'
local platform     = require 'bee.platform'

local type         = type
local ioOpen       = io.open
local pcall        = pcall
local pairs        = pairs
local setmetatable = setmetatable
local next         = next
local ipairs       = ipairs
local tostring     = tostring
local tableSort    = table.sort

_ENV = nil

local m = {}
--- 读取文件
---@param path string
function m.loadFile(path)
    if type(path) ~= 'string' then
        path = path:string()
    end
    local f, e = ioOpen(path, 'rb')
    if not f then
        return nil, e
    end
    if f:read(3) ~= '\xEF\xBB\xBF' then
        f:seek("set")
    end
    local buf = f:read 'a'
    f:close()
    return buf
end

--- 写入文件
---@param path string
---@param content string
function m.saveFile(path, content)
    if type(path) ~= 'string' then
        path = path:string()
    end
    local f, e = ioOpen(path, "wb")

    if f then
        f:write(content)
        f:close()
        return true
    else
        return false, e
    end
end

function m.relative(path, base)
    local sPath = fs.absolute(path):string()
    local sBase = fs.absolute(base):string()
    --TODO 先只支持最简单的情况
    if  sPath:sub(1, #sBase):lower() == sBase:lower()
    and sPath:sub(#sBase + 1, #sBase + 1):match '^[/\\]' then
        return fs.path(sPath:sub(#sBase + 1):gsub('^[/\\]+', ''))
    end
    return nil
end

local function buildOption(option)
    option     = option     or {}
    option.add = option.add or {}
    option.del = option.del or {}
    option.mod = option.mod or {}
    option.err = option.err or {}
    return option
end

local function split(str, sep)
    local t = {}
    local current = 1
    while current <= #str do
        local s, e = str:find(sep, current)
        if not s then
            t[#t+1] = str:sub(current)
            break
        end
        if s > 1 then
            t[#t+1] = str:sub(current, s - 1)
        end
        current = e + 1
    end
    return t
end

local dfs = {}
dfs.__index = dfs
dfs.type = 'dummy'
dfs.path = ''

function m.dummyFS(t)
    return setmetatable({
        files = t or {},
    }, dfs)
end

function dfs:__tostring()
    return 'dummy:' .. tostring(self.path)
end

function dfs:__div(filename)
    if type(filename) ~= 'string' then
        filename = filename:string()
    end
    local new = m.dummyFS(self.files)
    if self.path:sub(-1):match '[^/\\]' then
        new.path = self.path .. '\\' .. filename
    else
        new.path = self.path .. filename
    end
    return new
end

function dfs:_open(index)
    local paths = split(self.path, '[/\\]')
    local current = self.files
    if not index then
        index = #paths
    elseif index < 0 then
        index = #paths + index + 1
    end
    for i = 1, index do
        local path = paths[i]
        if current[path] then
            current = current[path]
        else
            return nil
        end
    end
    return current
end

function dfs:_filename()
    return self.path:match '[^/\\]+$'
end

function dfs:parent_path()
    local new = m.dummyFS(self.files)
    if self.path:find('[/\\]') then
        new.path = self.path:gsub('[/\\]+[^/\\]*$', '')
    else
        new.path = ''
    end
    return new
end

function dfs:filename()
    local new = m.dummyFS(self.files)
    new.path = self:_filename()
    return new
end

function dfs:string()
    return self.path
end

function dfs:list_directory()
    local dir = self:_open()
    if type(dir) ~= 'table' then
        return function () end
    end
    local keys = {}
    for k in pairs(dir) do
        keys[#keys+1] = k
    end
    tableSort(keys)
    local i = 0
    return function ()
        i = i + 1
        local k = keys[i]
        if not k then
            return nil
        end
        return self / k
    end
end

function dfs:isDirectory()
    local target = self:_open()
    if type(target) == 'table' then
        return true
    end
    return false
end

function dfs:remove()
    local dir = self:_open(-2)
    local filename = self:_filename()
    if not filename then
        return
    end
    dir[filename] = nil
end

function dfs:exists()
    local target = self:_open()
    return target ~= nil
end

function dfs:createDirectories(path)
    if type(path) ~= 'string' then
        path = path:string()
    end
    local paths = split(path, '[/\\]+')
    local current = self.files
    for i = 1, #paths do
        local sub = paths[i]
        if current[sub] then
            if type(current[sub]) ~= 'table' then
                return false
            end
        else
            current[sub] = {}
        end
        current = current[sub]
    end
    return true
end

function dfs:saveFile(path, text)
    if type(path) ~= 'string' then
        path = path:string()
    end
    local temp = m.dummyFS(self.files)
    temp.path = path
    local dir = temp:_open(-2)
    if not dir then
        return false, '无法打开:' .. path
    end
    local filename = temp:_filename()
    if not filename then
        return false, '无法打开:' .. path
    end
    if type(dir[filename]) == 'table' then
        return false, '无法打开:' .. path
    end
    dir[filename] = text
end

local function fsAbsolute(path, option)
    if type(path) == 'string' then
        local suc, res = pcall(fs.path, path)
        if not suc then
            option.err[#option.err+1] = res
            return nil
        end
        path = res
    elseif type(path) == 'table' then
        return path
    end
    local suc, res = pcall(fs.absolute, path)
    if not suc then
        option.err[#option.err+1] = res
        return nil
    end
    return res
end

local function fsIsDirectory(path, option)
    if path.type == 'dummy' then
        return path:isDirectory()
    end
    local suc, res = pcall(fs.is_directory, path)
    if not suc then
        option.err[#option.err+1] = res
        return false
    end
    return res
end

local function fsRemove(path, option)
    if path.type == 'dummy' then
        return path:remove()
    end
    local suc, res = pcall(fs.remove, path)
    if not suc then
        option.err[#option.err+1] = res
    end
    option.del[#option.del+1] = path:string()
end

local function fsExists(path, option)
    if path.type == 'dummy' then
        return path:exists()
    end
    local suc, res = pcall(fs.exists, path)
    if not suc then
        option.err[#option.err+1] = res
        return false
    end
    return res
end

local function fsSave(path, text, option)
    if path.type == 'dummy' then
        local dir = path:_open(-2)
        if not dir then
            option.err[#option.err+1] = '无法打开:' .. path:string()
            return false
        end
        local filename = path:_filename()
        if not filename then
            option.err[#option.err+1] = '无法打开:' .. path:string()
            return false
        end
        if type(dir[filename]) == 'table' then
            option.err[#option.err+1] = '无法打开:' .. path:string()
            return false
        end
        dir[filename] = text
    else
        local suc, err = m.saveFile(path, text)
        if suc then
            return true
        end
        option.err[#option.err+1] = err
        return false
    end
end

local function fsLoad(path, option)
    if path.type == 'dummy' then
        local text = path:_open()
        if type(text) == 'string' then
            return text
        else
            option.err[#option.err+1] = '无法打开:' .. path:string()
            return nil
        end
    else
        local text, err = m.loadFile(path)
        if text then
            return text
        else
            option.err[#option.err+1] = err
            return nil
        end
    end
end

local function fsCopy(source, target, option)
    if source.type == 'dummy' then
        local sourceText = source:_open()
        if not sourceText then
            option.err[#option.err+1] = '无法打开:' .. source:string()
            return false
        end
        return fsSave(target, sourceText, option)
    else
        if target.type == 'dummy' then
            local sourceText, err = m.loadFile(source)
            if not sourceText then
                option.err[#option.err+1] = err
                return false
            end
            return fsSave(target, sourceText, option)
        else
            local suc, res = pcall(fs.copy_file, source, target, true)
            if not suc then
                option.err[#option.err+1] = res
                return false
            end
        end
    end
    return true
end

local function fsCreateDirectories(path, option)
    if path.type == 'dummy' then
        return path:createDirectories()
    end
    local suc, res = pcall(fs.create_directories, path)
    if not suc then
        option.err[#option.err+1] = res
        return false
    end
    return true
end

local function fileRemove(path, option)
    if option.onRemove and option.onRemove(path) == false then
        return
    end
    if fsIsDirectory(path, option) then
        for child in fs.pairs(path) do
            fileRemove(child, option)
        end
    end
    if fsRemove(path, option) then
        option.del[#option.del+1] = path:string()
    end
end

local function fileCopy(source, target, option)
    local isDir1   = fsIsDirectory(source, option)
    local isDir2   = fsIsDirectory(target, option)
    local isExists = fsExists(target, option)
    if isDir1 then
        if isDir2 or fsCreateDirectories(target, option) then
            for filePath in fs.pairs(source) do
                local name = filePath:filename():string()
                fileCopy(filePath, target / name, option)
            end
        end
    else
        if isExists and not isDir2 then
            local buf1 = fsLoad(source, option)
            local buf2 = fsLoad(target, option)
            if buf1 and buf2 then
                if buf1 ~= buf2 then
                    if fsCopy(source, target, option) then
                        option.mod[#option.mod+1] = target:string()
                    end
                end
            end
        else
            if fsCopy(source, target, option) then
                option.add[#option.add+1] = target:string()
            end
        end
    end
end

local function fileSync(source, target, option)
    local isDir1   = fsIsDirectory(source, option)
    local isDir2   = fsIsDirectory(target, option)
    local isExists = fsExists(target, option)
    if isDir1 then
        if isDir2 then
            local fileList = m.fileList()
            for filePath in fs.pairs(target) do
                fileList[filePath] = true
            end
            for filePath in fs.pairs(source) do
                local name = filePath:filename():string()
                local targetPath = target / name
                fileSync(filePath, targetPath, option)
                fileList[targetPath] = nil
            end
            for path in pairs(fileList) do
                fileRemove(path, option)
            end
        else
            if isExists then
                fileRemove(target, option)
            end
            if fsCreateDirectories(target) then
                for filePath in fs.pairs(source) do
                    local name = filePath:filename():string()
                    fileCopy(filePath, target / name, option)
                end
            end
        end
    else
        if isDir2 then
            fileRemove(target, option)
        end
        if isExists then
            local buf1 = fsLoad(source, option)
            local buf2 = fsLoad(target, option)
            if buf1 and buf2 then
                if buf1 ~= buf2 then
                    if fsCopy(source, target, option) then
                        option.mod[#option.mod+1] = target:string()
                    end
                end
            end
        else
            if fsCopy(source, target, option) then
                option.add[#option.add+1] = target:string()
            end
        end
    end
end

--- 文件列表
function m.fileList(option)
    option = option or buildOption(option)
    local os = platform.OS
    local keyMap = {}
    local fileList = {}
    local function computeKey(path)
        path = fsAbsolute(path, option)
        if not path then
            return nil
        end
        local key
        if os == 'Windows' then
            key = path:string():lower()
        else
            key = path:string()
        end
        return key
    end
    return setmetatable({}, {
        __index = function (_, path)
            local key = computeKey(path)
            return fileList[key]
        end,
        __newindex = function (_, path, value)
            local key = computeKey(path)
            if not key then
                return
            end
            if value == nil then
                keyMap[key] = nil
            else
                keyMap[key] = path
                fileList[key] = value
            end
        end,
        __pairs = function ()
            local key, path
            return function ()
                key, path = next(keyMap, key)
                return path, fileList[key]
            end
        end,
    })
end

--- 删除文件（夹）
function m.fileRemove(path, option)
    option = buildOption(option)
    path = fsAbsolute(path, option)

    fileRemove(path, option)

    return option
end

--- 复制文件（夹）
---@param source string
---@param target string
---@return table
function m.fileCopy(source, target, option)
    option = buildOption(option)
    source = fsAbsolute(source, option)
    target = fsAbsolute(target, option)

    fileCopy(source, target, option)

    return option
end

--- 同步文件（夹）
---@param source string
---@param target string
---@return table
function m.fileSync(source, target, option)
    option = buildOption(option)
    source = fsAbsolute(source, option)
    target = fsAbsolute(target, option)

    fileSync(source, target, option)

    return option
end

function m.scanDirectory(dir, callback)
    for fullpath in fs.pairs(dir) do
        if fs.is_directory(fullpath) then
            m.scanDirectory(fullpath, callback)
        else
            callback(fullpath)
        end
    end
end

return m
