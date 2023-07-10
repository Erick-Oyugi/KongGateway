-- schema.lua
local typedefs = require "kong.db.schema.typedefs"

return {
    name = "eclectics-authorization",
    fields = {{
        config = {
            type = "record",
            fields = {{
                environment = {
                    type = "string",
                    required = false,
                    one_of = {"production", "development"}
                }
            }}
        }
    }}
}
