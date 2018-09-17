

export type SwaggerParameterLocation = 'path' | 'query' | 'body'
export type SwaggerNumberName = 'number' | 'integer' 
export type SwaggerPrimitiveType = 'string' | 'number' | 'integer' | 'boolean'
export type SwaggerAllTypes = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
export type SwaggerStringFormats = 'date' | 'date-time' | 'password' | 'byte' | 'binary' | 'object'
export type SwaggerNumberFormat = 'float' | 'double' | 'int32' | 'int64'

export interface SwaggerDiscriminator {
  propertyName: string;
  mapping?: {[key:string]: string}
}

export interface SwaggerXML {
  name?: string
  namespace?: string
  prefix?: string
  attribute?: boolean
  wrapped?: boolean
}

export interface SwaggerSchemaBase {
  nullable?: boolean;
  discriminator?: SwaggerDiscriminator
  readOnly?: boolean
  writeOnly?: boolean
  xml?: SwaggerXML
  externalDocs?: SwaggerExternalDocumentation
  example?: any
  deprecated?: boolean
}

export interface SwaggerStringDefinition extends SwaggerSchemaBase {
  ['type']: 'string',
  ['minLength']?: number
  ['maxLength']?: number
  ['format']?: number
  ['enum']?: string[]
}

export interface SwaggerNumberDefinition extends SwaggerSchemaBase {
  ['type']: SwaggerNumberName,
  ['format']?: SwaggerNumberFormat
  ['minimum']?: number
  ['maximum']?: number
  ['multipleOf']?: number
  ['exclusiveMinimum']?: boolean
  ['exclusiveMaximim']?: boolean
}

export interface SwaggerBooleanTypeDefinition extends SwaggerSchemaBase {
  ['type']: 'boolean'
}

export interface SwaggerReference extends SwaggerSchemaBase {
  ['$ref']: string
}

export interface SwaggerObjectDefinition extends SwaggerSchemaBase {
  /**
   * Question to OpenAPI3: should type really be optional?
   */
  ['type']? : 'object',
  properties?: {
    [key:string] : SwaggerSchema
  }
  required?: string[]
  additionalProperties?: boolean | SwaggerSchema
  example?: {[key:string]:any}
}

export interface SwaggerArrayDefinition extends SwaggerSchemaBase {
  ['type'] : 'array',
  items: SwaggerSchema
}

export interface SwaggerNotTypeDefinition extends SwaggerSchemaBase {
  ['not'] : SwaggerSchema
}

export interface SwaggerOneOf extends SwaggerSchemaBase {
  ['oneOf'] : SwaggerSchema[]
}
export interface SwaggerAllOf extends SwaggerSchemaBase {
  ['allOf'] : SwaggerSchema[]
}
export interface SwaggerAnyOf extends SwaggerSchemaBase {
  ['anyOf'] : SwaggerSchema[]
}

export type SwaggerSchema = (
  SwaggerOneOf | 
  SwaggerAllOf | 
  SwaggerAnyOf |
  SwaggerNotTypeDefinition | 
  SwaggerReference | 
  SwaggerStringDefinition | 
  SwaggerBooleanTypeDefinition | 
  SwaggerNumberDefinition | 
  SwaggerObjectDefinition | 
  SwaggerArrayDefinition)

export interface SwaggerExample {
  value: any
  summary?: string
  description?: string
  externalValue?: string  
}

export interface SwaggerParameterDefinition {
  in: SwaggerParameterLocation
  name: string
  description?: string
  required: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  schema: SwaggerSchema
  example?: any
  examples?: {[key:string] : SwaggerExample}

  style?: string
  explode?: boolean
  allowReserved?: boolean
}

// https://swagger.io/docs/specification/authentication/api-keys/
export type SwaggerHTTPScheme = 'http' | 'https'
export type SwaggerSecurityKeyLocation = 'header' | 'query' | 'cookie'
export type SwaggerBasicAuthcheme = 'http' | 'https'
export type SwaggerSecuritySchemeType = 'basic' | 'bearer' | 'apiKey' | 'openIdConnect' | 'oauth2'

export interface OAuthFlow {
  authorizationUrl?: string
  tokenUrl?: string
  refreshUrl?: string
  scopes?: {[key:string]:string}
}

export interface OAuthFlows {
  implicit?: OAuthFlow
  password?: OAuthFlow
  clientCredentials?: OAuthFlow
  authorizationCode?: OAuthFlow
}
export interface SwaggerSecurityScheme {
  type: SwaggerSecuritySchemeType
  scheme?: SwaggerSecuritySchemeType   // BUG in OpenAPI3 ??? 
  in?: SwaggerSecurityKeyLocation
  name?: string
  bearerFormat?: string
  flows?: OAuthFlows
}

export interface AppliedSecurityScheme {
  [key:string]: Array<any>
}

export interface SwaggerContact {
  name?: string
  url?: string
  email?: string
}

export interface SwaggerLicense {
  name?: string
  url?: string
}

export interface SwaggerExternalDocumentation {
  description?: string
  url?: string
}

export interface SwaggerInfo {
  title: string
  version: string
  description?: string
  termsOfService?: string
  contact?: SwaggerContact
  license?: SwaggerLicense
}

// https://swagger.io/specification/#serverVariableObject
export interface SwaggerServerVariable {
  enum?: string[]
  default: string
  description?: string
}

export interface SwaggerServer {
  url: string
  description?: string
  variables?: {[key:string]: SwaggerServerVariable}
}


export interface SwaggerHeader {
  // Header object is almosta same as Parameter, in and name are not defined
  // in: SwaggerParameterLocation
  // name: string
  required: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  schema: SwaggerSchema
  example?: any
  examples?: {[key:string] : SwaggerExample}

  style?: string
  explode?: boolean
  allowReserved?: boolean
}


// https://swagger.io/specification/#encodingObject
export interface SwaggerEncoding {
  contentType?: string
  headers?: {[key:string]:(SwaggerHeader|SwaggerPrimitiveType)}
  style?: string
}

// 
export interface SwaggerMediaType {
  schema?: SwaggerSchema|SwaggerReference
  example?: any
  examples?: {[key:string] : SwaggerExample}
  encoding?:{[key:string]:SwaggerEncoding}
}

export interface SwaggerRequestBody {
  content: {[key:string]:SwaggerMediaType}
  description?: string
  required?: boolean
}

export interface SwaggerTag {
  name: string
  description?: string
  externalDocs?: SwaggerExternalDocumentation
}

/**
 * The Link object represents a possible design-time link for a response.
 */
export interface SwaggerLink {
  /**
   * points to OperationObject https://swagger.io/specification/#operationObject
   */
  operationRef?: string   
  operationId?: string 
  parameters?: {[key:string]: any}
  requestBody?: any
  description?: string
  server?: SwaggerServer
}

export interface SwaggerSecurityRequirement {
  [key:string] : string[]
}

export interface SwaggerOperation {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: SwaggerExternalDocumentation
  operationId?: string
  parameters?:(SwaggerParameterDefinition|SwaggerReference)[]
  requestBody?: (SwaggerRequestBody|SwaggerReference)
  responses: {[key:string] : SwaggerResponse}
  callbacks?: {[key:string] : SwaggerCallback | SwaggerReference}
  deprecated?: boolean
  security?: SwaggerSecurityRequirement
  servers?: SwaggerServer[]
}

export interface SwaggerResponse {
  description: string
  headers?: {[key:string]: (SwaggerHeader|SwaggerReference)}

  /**
   * key: media type, for example "application/json"
   */
  content?: {[key:string]: (SwaggerMediaType|SwaggerReference)}
  links?: {[key:string]: (SwaggerLink|SwaggerReference)}
}

export interface SwaggerPathItem {

  ['$ref']?: string
  summary?: string
  description?: string

  // possible methods
  get? : SwaggerOperation
  post? : SwaggerOperation
  patch? : SwaggerOperation
  delete? : SwaggerOperation
  put? : SwaggerOperation
  head? : SwaggerOperation
  options? : SwaggerOperation
  trace? : SwaggerOperation

  servers?: SwaggerServer[]
  parameters?:(SwaggerParameterDefinition|SwaggerReference)[]
}

export interface SwaggerCallback {
 [key:string]: SwaggerOperation 
}

export interface OpenAPI3 {
  openapi: string
  info: SwaggerInfo
  paths:{[key:string]:SwaggerPathItem}
  servers?: SwaggerServer[]
  components?: {
    // "$ref": "#/components/schemas/Pet"
    schemas?: {[key:string]: (SwaggerSchema|SwaggerReference)}
    parameters?: {[key:string]: (SwaggerParameterDefinition|SwaggerReference)}
    examples?: {[key:string]: (SwaggerExample|SwaggerReference)}
    requestBodies?: {[key:string]: (SwaggerRequestBody|SwaggerReference)}
    headers?: {[key:string]: (SwaggerHeader|SwaggerReference)}
    securitySchemes?: {[key:string]: (SwaggerSecurityScheme|SwaggerReference)}
    links?: {[key:string]: (SwaggerLink|SwaggerReference)}
    callbacks?: {[key:string]: (SwaggerCallback|SwaggerReference)}
  }
  security?: AppliedSecurityScheme
  tags?: SwaggerTag[]
  externalDocs?: SwaggerExternalDocumentation
}

/**
 * Examples to test validataion in editors which can parse TypeScript
 */

const arrayDeclarationExample:SwaggerSchema = { 
  type: 'array', 
  'items': {type:'integer'}
}
const objectExample:SwaggerSchema = { 'type' : 'object', properties:{id:{type:'number'}}}
const hashDeclaration:SwaggerSchema  = {
  type:'object',
  additionalProperties : {type:'string'}
}
const exampleResponse:SwaggerResponse = {
  "description": "A complex object array response",
  "content": {
    "application/json": {
      "schema": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/VeryComplexType"
        }
      }
    }
  }
}
const exampleSchema:SwaggerSchema = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/components/schemas/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}

const infoExample: SwaggerInfo = {
  "title": "Sample Pet Store App",
  "description": "This is a sample server for a pet store.",
  "termsOfService": "http://example.com/terms/",
  "contact": {
    "name": "API Support",
    "url": "http://www.example.com/support",
    "email": "support@example.com"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}

const contactExample: SwaggerContact = {
  "name": "API Support",
  "url": "http://www.example.com/support",
  "email": "support@example.com"
}

const licenseExample: SwaggerLicense = {
  "name": "Apache 2.0",
  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
}

const serverExample: SwaggerServer = {
  "url": "https://{username}.gigantic-server.com:{port}/{basePath}",
  "description": "The production API server",
  "variables": {
    "username": {
      "default": "demo",
      "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
    },
    "port": {
      "enum": [
        "8443",
        "443"
      ],
      "default": "8443"
    },
    "basePath": {
      "default": "v2"
    }
  }
}

const exampleSchema2: SwaggerSchema =  {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  }
}

const paramExample: SwaggerParameterDefinition = {
  "name": "skip",
  "in": "query",
  "description": "number of items to skip",
  "required": true,
  "schema": {
    "type": "integer",
    "format": "int32"
  }
}

const respExample: SwaggerResponse = {
  "description": "General Error",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/GeneralError"
      }
    }
  }
}

const OAuthSchemeExample: SwaggerSecurityScheme = {
  "type": "oauth2",
  "flows": {
    "implicit": {
      "authorizationUrl": "http://example.org/api/oauth/dialog",
      "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
      }
    }
  }
}

const miminalAPISpec:OpenAPI3 = {
  openapi:'3.0.0',
  info : {
    title:'Miminal service',
    version:'0.0.1'
  },
  paths:{
  }
}

const petstoreExample: OpenAPI3 = {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "A sample API that uses a petstore as an example to demonstrate features in the OpenAPI 3.0 specification",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Swagger API Team",
      "email": "apiteam@swagger.io",
      "url": "http://swagger.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "servers": [
    {
      "url": "http://petstore.swagger.io/api"
    }
  ],
  "paths": {
    "/pets": {
      "get": {
        "description": "Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n",
        "operationId": "findPets",
        "parameters": [
          {
            "name": "tags",
            "in": "query",
            "description": "tags to filter by",
            "required": false,
            "style": "form",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "limit",
            "in": "query",
            "description": "maximum number of results to return",
            "required": false,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Pet"
                  }
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "description": "Creates a new pet in the store.  Duplicates are allowed",
        "operationId": "addPet",
        "requestBody": {
          "description": "Pet to add to the store",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewPet"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "pet response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/pets/{id}": {
      "get": {
        "description": "Returns a user based on a single ID, if the user does not have access to the pet",
        "operationId": "find pet by id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of pet to fetch",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "description": "deletes a single pet based on the ID supplied",
        "operationId": "deletePet",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of pet to delete",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "pet deleted"
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Pet": {
        "allOf": [
          {
            "$ref": "#/components/schemas/NewPet"
          },
          {
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              }
            }
          }
        ]
      },
      "NewPet": {
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "Error": {
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
};


// TODO: not ready 
export interface OpenAPI2 {
  swagger: string
  info: SwaggerInfo
  host?: string
  basePath?: string
  schemes?: string[]
  consumes?: string[]
  produces?: string[]
  paths:{[key:string]:SwaggerPathItem}
  servers?: SwaggerServer[]
  definitions?: {[key:string]: SwaggerSchema}
  parameters?: {[key:string]: SwaggerParameterDefinition}
  components?: {
    // "$ref": "#/components/schemas/Pet"
    schemas?: {[key:string]: (SwaggerSchema|SwaggerReference)}
    parameters?: {[key:string]: (SwaggerParameterDefinition|SwaggerReference)}
    examples?: {[key:string]: (SwaggerExample|SwaggerReference)}
    requestBodies?: {[key:string]: (SwaggerRequestBody|SwaggerReference)}
    headers?: {[key:string]: (SwaggerHeader|SwaggerReference)}
    securitySchemes?: {[key:string]: (SwaggerSecurityScheme|SwaggerReference)}
    links?: {[key:string]: (SwaggerLink|SwaggerReference)}
    callbacks?: {[key:string]: (SwaggerCallback|SwaggerReference)}
  }
  security?: AppliedSecurityScheme
  tags?: SwaggerTag[]
  externalDocs?: SwaggerExternalDocumentation
}


const swagger2test:OpenAPI2 = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Swagger API Team",
      "email": "apiteam@swagger.io",
      "url": "http://swagger.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/api",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/pets": {
      "get": {
        "description": "Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n",
        "operationId": "findPets",
        "parameters": [
          {
            "name": "tags",
            "in": "query",
            "description": "tags to filter by",
            "required": false,
            "type": "array",
            "collectionFormat": "csv",
            "items": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "description": "maximum number of results to return",
            "required": false,
            "type": "integer",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Pet"
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "description": "Creates a new pet in the store.  Duplicates are allowed",
        "operationId": "addPet",
        "parameters": [
          {
            "name": "pet",
            "in": "body",
            "description": "Pet to add to the store",
            "required": true,
            "schema": {
              "$ref": "#/definitions/NewPet"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "schema": {
              "$ref": "#/definitions/Pet"
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/pets/{id}": {
      "get": {
        "description": "Returns a user based on a single ID, if the user does not have access to the pet",
        "operationId": "find pet by id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of pet to fetch",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "pet response",
            "schema": {
              "$ref": "#/definitions/Pet"
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "description": "deletes a single pet based on the ID supplied",
        "operationId": "deletePet",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of pet to delete",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "204": {
            "description": "pet deleted"
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Pet": {
      "type": "object",
      "allOf": [
        {
          "$ref": "#/definitions/NewPet"
        },
        {
          "required": [
            "id"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      ]
    },
    "NewPet": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "tag": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
