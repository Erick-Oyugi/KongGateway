local https = require("ssl.https") -- Load the HTTPS module
local json = require("cjson") -- Load the JSON module

local request_body = {
    appId = "549907c8-5048-4d51-8164-36b3b60b47b1",
    routeId = "c804328d-4c76-4d6b-bfa6-ae33ac9c23f6",
    apiKey = "cbapi_sandbox_73d048ec7d254a1495f66eb3c3ec3805"
}

-- Encode the request body as JSON
local encoded_body = json.encode(request_body)

-- Set up the HTTPS request options
local options = {
    url = "https://192.168.19.84:3000/api-auth",
    method = "POST", -- Use the POST method to send the JSON body
    headers = {
        ["Content-Type"] = "application/json", -- Set the content type to JSON
        ["Content-Length"] = #encoded_body, -- Set the content length header
        ["User-Agent"] = "LuaSocket"
    },
    source = ltn12.source.string(encoded_body), -- Set the request body as the source
    sink = ltn12.sink.table(response_body)
}

-- Make the HTTPS request
local success, status_code, headers, status_string = https.request(options)

print('success')
print(success)
print('status code', status_code)
print('headers', headers)

print('status string ', status_string)
-- Check if the request was successful
if success and status_code == 200 then
    -- The request was successful, so process the response body
    local response_text = table.concat(response_body)
    print(response_text)
else
    -- The request failed, so print the status code and status string
    print(status_code, status_string)
end
