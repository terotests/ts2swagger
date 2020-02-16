"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type guards
function isAnyOf(value) {
    return value && typeof (value.anyOf) !== 'undefined';
}
exports.isAnyOf = isAnyOf;
function isAllOf(value) {
    return value && typeof (value.allOf) !== 'undefined';
}
exports.isAllOf = isAllOf;
function isRef(value) {
    return value && typeof (value.$ref) !== 'undefined';
}
exports.isRef = isRef;
function isOneOf(value) {
    return value && typeof (value.oneOf) !== 'undefined';
}
exports.isOneOf = isOneOf;
function isObject(value) {
    return value && value.type === 'object';
}
exports.isObject = isObject;
function isString(value) {
    return value && value.type === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return value && value.type === 'number';
}
exports.isNumber = isNumber;
function isBoolean(value) {
    return value && value.type === 'boolean';
}
exports.isBoolean = isBoolean;
function isInteger(value) {
    return value && value.type === 'integer';
}
exports.isInteger = isInteger;
/**
 * Examples to test validataion in editors which can parse TypeScript
 */
var arrayDeclarationExample = {
    type: "array",
    items: { type: "integer" }
};
var objectExample = {
    type: "object",
    properties: { id: { type: "number" } }
};
var hashDeclaration = {
    type: "object",
    additionalProperties: { type: "string" }
};
var exampleResponse = {
    description: "A complex object array response",
    content: {
        "application/json": {
            schema: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/VeryComplexType"
                }
            }
        }
    }
};
var exampleSchema = {
    type: "object",
    required: ["name"],
    properties: {
        name: {
            type: "string"
        },
        address: {
            $ref: "#/components/schemas/Address"
        },
        age: {
            type: "integer",
            format: "int32",
            minimum: 0
        }
    }
};
var infoExample = {
    title: "Sample Pet Store App",
    description: "This is a sample server for a pet store.",
    termsOfService: "http://example.com/terms/",
    contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "support@example.com"
    },
    license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    version: "1.0.1"
};
var contactExample = {
    name: "API Support",
    url: "http://www.example.com/support",
    email: "support@example.com"
};
var licenseExample = {
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
};
var serverExample = {
    url: "https://{username}.gigantic-server.com:{port}/{basePath}",
    description: "The production API server",
    variables: {
        username: {
            default: "demo",
            description: "this value is assigned by the service provider, in this example `gigantic-server.com`"
        },
        port: {
            enum: ["8443", "443"],
            default: "8443"
        },
        basePath: {
            default: "v2"
        }
    }
};
var exampleSchema2 = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            format: "int64"
        },
        name: {
            type: "string"
        }
    }
};
var paramExample = {
    name: "skip",
    in: "query",
    description: "number of items to skip",
    required: true,
    schema: {
        type: "integer",
        format: "int32"
    }
};
var respExample = {
    description: "General Error",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/GeneralError"
            }
        }
    }
};
if (respExample === respExample) {
}
var OAuthSchemeExample = {
    type: "oauth2",
    flows: {
        implicit: {
            authorizationUrl: "http://example.org/api/oauth/dialog",
            scopes: {
                "write:pets": "modify pets in your account",
                "read:pets": "read your pets"
            }
        }
    }
};
var miminalAPISpec = {
    openapi: "3.0.0",
    info: {
        title: "Miminal service",
        version: "0.0.1"
    },
    paths: {}
};
var petstoreExample = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Swagger Petstore",
        description: "A sample API that uses a petstore as an example to demonstrate features in the OpenAPI 3.0 specification",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            name: "Swagger API Team",
            email: "apiteam@swagger.io",
            url: "http://swagger.io"
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    servers: [
        {
            url: "http://petstore.swagger.io/api"
        }
    ],
    paths: {
        "/pets": {
            get: {
                description: "Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n",
                operationId: "findPets",
                parameters: [
                    {
                        name: "tags",
                        in: "query",
                        description: "tags to filter by",
                        required: false,
                        style: "form",
                        schema: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "maximum number of results to return",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int32"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "pet response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Pet"
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                description: "Creates a new pet in the store.  Duplicates are allowed",
                operationId: "addPet",
                requestBody: {
                    description: "Pet to add to the store",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NewPet"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "pet response",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Pet"
                                }
                            }
                        }
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/pets/{id}": {
            get: {
                description: "Returns a user based on a single ID, if the user does not have access to the pet",
                operationId: "find pet by id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of pet to fetch",
                        required: true,
                        schema: {
                            type: "integer",
                            format: "int64"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "pet response",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Pet"
                                }
                            }
                        }
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                description: "deletes a single pet based on the ID supplied",
                operationId: "deletePet",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of pet to delete",
                        required: true,
                        schema: {
                            type: "integer",
                            format: "int64"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: "pet deleted"
                    },
                    default: {
                        description: "unexpected error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Pet: {
                allOf: [
                    {
                        $ref: "#/components/schemas/NewPet"
                    },
                    {
                        type: 'object',
                        required: ["id"],
                        properties: {
                            id: {
                                type: "integer",
                                format: "int64"
                            }
                        }
                    }
                ]
            },
            NewPet: {
                type: 'object',
                required: ["name"],
                properties: {
                    name: {
                        type: "string"
                    },
                    tag: {
                        type: "string"
                    }
                }
            },
            Error: {
                type: 'object',
                required: ["code", "message"],
                properties: {
                    code: {
                        type: "integer",
                        format: "int32"
                    },
                    message: {
                        type: "string"
                    }
                }
            }
        }
    }
};
var swagger2test = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "Swagger Petstore",
        description: "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            name: "Swagger API Team",
            email: "apiteam@swagger.io",
            url: "http://swagger.io"
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    host: "petstore.swagger.io",
    basePath: "/api",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        "/pets": {
            get: {
                description: "Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n",
                operationId: "findPets",
                parameters: [
                    {
                        name: "tags",
                        in: "query",
                        description: "tags to filter by",
                        required: false,
                        type: "array",
                        collectionFormat: "csv",
                        items: {
                            type: "string"
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        description: "maximum number of results to return",
                        required: false,
                        type: "integer",
                        format: "int32"
                    }
                ],
                responses: {
                    "200": {
                        description: "pet response",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Pet"
                            }
                        }
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    }
                }
            },
            post: {
                description: "Creates a new pet in the store.  Duplicates are allowed",
                operationId: "addPet",
                parameters: [
                    {
                        name: "pet",
                        in: "body",
                        description: "Pet to add to the store",
                        required: true,
                        schema: {
                            $ref: "#/definitions/NewPet"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "pet response",
                        schema: {
                            $ref: "#/definitions/Pet"
                        }
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/pets/{id}": {
            get: {
                description: "Returns a user based on a single ID, if the user does not have access to the pet",
                operationId: "find pet by id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of pet to fetch",
                        required: true,
                        type: "integer",
                        format: "int64"
                    }
                ],
                responses: {
                    "200": {
                        description: "pet response",
                        schema: {
                            $ref: "#/definitions/Pet"
                        }
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    }
                }
            },
            delete: {
                description: "deletes a single pet based on the ID supplied",
                operationId: "deletePet",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of pet to delete",
                        required: true,
                        type: "integer",
                        format: "int64"
                    }
                ],
                responses: {
                    "204": {
                        description: "pet deleted"
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    }
                }
            }
        }
    },
    definitions: {
        Pet: {
            type: "object",
            allOf: [
                {
                    $ref: "#/definitions/NewPet"
                },
                {
                    type: 'object',
                    required: ["id"],
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64"
                        }
                    }
                }
            ]
        },
        NewPet: {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string"
                },
                tag: {
                    type: "string"
                }
            }
        },
        Error: {
            type: "object",
            required: ["code", "message"],
            properties: {
                code: {
                    type: "integer",
                    format: "int32"
                },
                message: {
                    type: "string"
                }
            }
        }
    }
};
//# sourceMappingURL=OpenAPI3.js.map