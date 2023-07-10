-- handler.lua
local CustomHandler = {
    VERSION = "1.0.0",
    PRIORITY = 10
}

local hc = require('httpclient').new()
local json = require('cjson')
local https = require("ssl.https") -- Load the HTTPS module
local json = require("cjson") -- Load the JSON module

local kong = kong

function CustomHandler:access(config)

    local apiKey = kong.request.get_header('x-api-key')
    local appId = kong.request.get_header('x-app-id')
    local route = kong.router.get_route()
    local routeId = route['id']

    print('x-api-key,x-app-id and routeId: ')
    kong.log.notice(apiKey)
    kong.log.notice(appId)
    kong.log.notice(routeId)
    if (apiKey == nil) or (appId == nil) then
        kong.log.alert("Data missing")
        return kong.response.exit(403, {
            message = "Please provide x-api-key,x-app-id values in headers"
        })
    end
    if (routeId == nil) then
        kong.log.alert("routeId missing")
        return kong.response.exit(403, {
            message = "No routeId found with given request"
        })
    end

    -- @TODO : Make authorization url dynamic
    local authorizationUrl = "https://192.168.19.84:3000/api-auth"
    local body = {
        apiKey = apiKey,
        appId = appId,
        routeId = routeId
    }

    local authorizationBody = json.encode(body)

    local options = {
        url = authorizationUrl,
        method = "POST",
        headers = {
            ["Content-Type"] = "application/json", -- Set the content type to JSON
            ["Content-Length"] = #authorizationBody, -- Set the content length header
            ["User-Agent"] = "LuaSocket"
        },
        source = ltn12.source.string(authorizationBody), -- Set the request body as the source
        sink = ltn12.sink.table(response_body)
    }

    print('Authorization body')
    kong.log.notice(authorizationBody);

    local success, status_code, headers, status_string = https.request(options)

    if success and status_code == 201 then
        -- The request was successful, so process the response body
        local response_text = table.concat(response_body)
        print(response_text)
    else
        -- The request failed, so print the status code and status string
        print(status_code, status_string)
        return kong.response.exit(400, {
            message = "Authorization failed"
        })
    end

end

return CustomHandler

