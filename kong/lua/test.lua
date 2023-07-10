local replacement_table = {
    one = 'debit',
    two = 'credit'
}

-- for k, v in pairs(replacement_table) do
--     print(k, v)
-- end

-- returns true if key is present in the table, false otherwise
local function checkForKey(table, key)
    return table[key] ~= nil
end

-- print(checkForKey(replacement_table, 'little'))

local input_table = {
    one = 'some value',
    two = 'some other value',
    three = 'little value '
}

-- input_table is the request body and replacement_table is the keys that are to be replaced in the request body
function checkIfUserHasPassedInvalidKeys(input_table, replacement_table)
    for k, v in pairs(input_table) do
        -- if the key current key is present in the replacement table then throw an error
        if (checkForKey(replacement_table, k)) then
            print('ERROR for the value ', k, v)
            -- @TODO replace with kong.response function passing error response for key value
        end
    end
end

checkIfUserHasPassedInvalidKeys(input_table, replacement_table)

local function updateRequestBody(request_body, replacement_table)
    for k, v in pairs(replacement_table) do
        -- print(k, v)
        request_body[k] = v
        -- if (not checkForKey(replacement_table, k)) then
        --     request_body[replacement_table[k]] = 'lover'
        -- end
    end
    return request_body
end

local request_body = {
    one = 'one',
    two = 'two'
}

local replacement_table = {
    four = 'new value',
    five = "five value",
    one = "bitch"
}

print('-------------------------')

-- local final_ans = updateRequestBody(request_body, replacement_table)
-- print('-------------------------')
-- for k, v in pairs(final_ans) do
--     print(k, v)
-- end

local function better_function(request_body, replacement_table)
    for k, v in pairs(replacement_table) do
        if (checkForKey(request_body, k)) then
            print(k, 'is not allowed')
            return {
                error = k
            }
        end
        request_body[k] = v
    end
    return request_body
end

local res = better_function(request_body, replacement_table)

print('--------------------------')
for k, v in pairs(res) do
    print(k, v)
end
