-- handler.lua
local CustomHandler = {
    VERSION = "1.0.0",
    PRIORITY = 10
}

local hc = require('httpclient').new()
local json = require('cjson')

local kong = kong

-- returns true if key is present in the table, false otherwise
local function checkForKey(table, key)
    return table[key] ~= nil
end

function CustomHandler:access(config)
    kong.log.notice("Running plugin for modifying request body")

    kong.log.notice("CONFIG ", config)

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
    local authorizationUrl = "http://host.docker.internal:3000/api-auth"
    local body = {
        apiKey = apiKey,
        appId = appId,
        routeId = routeId
    }

    local authorizationBody = json.encode(body)

    print('Authorization body')
    kong.log.notice(authorizationBody);

    local res = hc:post(authorizationUrl, authorizationBody, {
        content_type = 'application/json'
    })
    kong.log.notice("Response code")
    kong.log.alert(res.code)

    if (res.code ~= 201) then
        return kong.response.exit(400, {
            message = "Authorization failed"
        })
    end

    kong.log.notice("Response from authorization endpoint")
    kong.log.notice(res.body)

    kong.log.notice("data value")
    kong.log.notice(res.body.data)

    if res.body then
        kong.log.notice("data found inside the response")

        local request_body = json.decode(kong.request.get_raw_body());
        kong.log.notice("first request body:", request_body)

        -- local request_body = request_body.data;

        -- kong.log.notice("second request body:", request_body)

        -- decode response and then use the values is working fine
        local myBody = json.decode(res.body)
        local myBody = myBody.data
        kong.log.notice("myBody", myBody)

        -- check for each value is not already present in the key
        for k, v in pairs(myBody) do -- key is 1 and v is the {attribute_name : 'attribute name bero',value:'value bero'}
            if (checkForKey(request_body, v['attribute'])) then
                return kong.response.exit(400, {
                    message = "Field " .. v['attribute'] .. " is not allowed"
                })
            end

            -- if the attribute is not present in the body, then add the new value in request_body
            request_body[v['attribute']] = v['value']
        end

        local ok, err = kong.service.request.set_body(request_body)
    elseif res.err then
        return kong.response.exit(400, {
            message = "Error when fetching valid field information"
        })
    end
end

return CustomHandler

