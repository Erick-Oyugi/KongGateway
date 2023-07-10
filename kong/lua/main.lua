print('hello world')

-- This is a comment

--[[
    This is a multiline
    comment which i am testing
    in lua
]]

-- Concatenation
print("Hello" .. "jack. " .. "I am a good boi")

-- Data types
--[[
    nil 
    number 
    string 'hello' "hello"
    boolean 
    table - arrays objects, basically OOPS
]]

local a = 2
print(a + 5)

local name = 'Jack'
print("My name is " .. name .. " and I am happy")

name = 20
print(name)

name = "Jane"
print(name)

local name = "Pratyush"
local surname = "Thapliyal"
local full_name = name .. " " .. surname

print(full_name)

local description = [[Hello
    How
are you
]]
print(description)

C = 20 -- Global variable
local c = 10 -- local variable

print(C, c)

print(type(c))

local str = "22"
print(type(tonumber(str)))

print(math.pi)

print(math.random())

print(os.time())

local str = "hello mister"
-- length of the string
print(#str)

local x = 22
local y = tostring(x)
print(type(y))

-- IF ELSE
if true then
    print("True bero")
end

-- anything else also evaluates to true
if 2 then
    print("True bero")
end

local age = 19

if age ~= 20 then
    print("Your may enter")
end

if not (age < 20) then
    print("Something in the way")
end

if age > 20 then
    print("Your are old")
elseif age > 10 then
    print("Your are neither old nor young")
else
    print("You are young")
end

-- LOOPS 
for i = 1, 10, 2 do
    print(i)
end

local start_val, end_val, step_val = 1, 10, 1

for i = start_val, end_val, step_val do
    print(i)
end

local arr = {2, 34, 5, 4}

for i = 1, #arr do
    print(arr[i])
end

local peeps = 10
while peeps < 20 do
    print('peeps ' .. peeps)
    peeps = peeps + 1
end

local x = 1
repeat
    print("Hey")
    x = x + 1
until x == 5

-- User input

-- print('Enter input : ')
-- local input = io.read()

-- print("Your entered " .. input)

-- Tables 
-- it is like a container for multiple variables

-- Indexing starts from 1 in lua
local arr = {10, true, 'hello', 20}
print(arr[3])

local arr = {5, 4, 3, 7, 0}
table.sort(arr)
print(arr[1])

table.insert(arr, 2, "lol")
for i = 1, #arr do
    print(arr[i])
end

print(table.concat(arr, " "))

-- functions
local function displayAge(age)
    age = 5 or age
    print("My age is " .. age)
end

displayAge(50)
displayAge()

function sum(num1, num2)
    _G.y = num1 + num2 -- Global variable
    return y
end

print(sum(2, 5))
print(y)

local add10 = function(number)
    return number + 10
end

print(add10(5))

local function sum(...)
    local sums = 0
    for key, value in pairs({...}) do
        print(key, value)
        sums = sums + value
    end
    print(...)
    return sums
end

print(sum(10, 3, 5, 6))

-- importing custom module

local mod = require('mymath')

print("Module output : " .. mod.add(4, 6))

local LuaSocket = require("socket")
client = LuaSocket.connect("example.com", 80)
client:send("GET /login.php?login=admin&pass=admin HTTP/1.0\r\nHost: example.com\r\n\r\n")
while true do
    s, status, partial = client:receive('*a')
    print(s or partial)
    if status == "closed" then
        break
    end
end
client:close()
