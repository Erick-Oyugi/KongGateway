-- schema.lua
local typedefs = require "kong.db.schema.typedefs"

return {
    name = "request-enrichment",
    fields = {{
        config = {
            type = "record",
            fields = {{
                variable_name = {
                    type = "string",
                    required = false
                }
            }}
        }
    }}
}
