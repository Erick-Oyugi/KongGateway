-- handler.lua
local CustomHandler = {
    VERSION = "1.0.0",
    PRIORITY = 10
}

local hc = require('httpclient').new()
local json = require('cjson')

local kong = kong
-- see if the file exists
function file_exists(file)
    local f = io.open(file, "rb")
    if f then
        f:close()
    end
    return f ~= nil
end

-- get all lines from a file, returns an empty 
-- list/table if the file does not exist
function lines_from(file)
    if not file_exists(file) then
        return {}
    end
    local lines = {}
    for line in io.lines(file) do
        lines[#lines + 1] = line
    end
    return lines
end

function CustomHandler:access(config)
    kong.log.notice('running eclectics api key method')

    -- fetch api_key and client_id from a file, which is up updated using the cron job

    local api_key = 'hello'
    local clientId = 'something'

    -- tests the functions above
    local file = '/home/clientId.txt'
    local lines = lines_from(file)
    clientId = lines[1];

    file = '/home/api_key.txt'
    lines = lines_from(file)
    api_key = lines[1];

    file = '/home/token.txt'
    lines = lines_from(file)
    local token = 'Bearer ' .. lines[1];

    -- print all line numbers and their contents
    -- for k, v in pairs(lines) do
    --     kong.log.notice('line : ', v)
    -- end

    kong.log.notice("The values read from files")
    kong.log.notice(clientId, api_key, token)

    -- add api_key and clientId into the request body
    local request_body = json.decode(kong.request.get_raw_body())
    request_body['api_key'] = api_key
    request_body['clientId'] = clientId
    local ok, err = kong.service.request.set_body(request_body)
    kong.service.request.add_header('Authorization', token)
end

return CustomHandler

