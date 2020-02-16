export declare type SwaggerParameterLocation = "path" | "query" | "body";
export declare type SwaggerNumberName = "number" | "integer";
export declare type SwaggerPrimitiveType = "string" | "number" | "integer" | "boolean";
export declare type SwaggerAllTypes = "string" | "number" | "integer" | "boolean" | "array" | "object";
export declare type SwaggerStringFormats = "date" | "date-time" | "password" | "byte" | "binary" | "object";
export declare type SwaggerNumberFormat = "float" | "double" | "int32" | "int64";
export interface SwaggerDiscriminator {
    propertyName: string;
    mapping?: {
        [key: string]: string;
    };
}
export interface SwaggerXML {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
}
export interface SwaggerSchemaBase {
    nullable?: boolean;
    discriminator?: SwaggerDiscriminator;
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: SwaggerXML;
    externalDocs?: SwaggerExternalDocumentation;
    example?: any;
    deprecated?: boolean;
}
export interface SwaggerStringDefinition extends SwaggerSchemaBase {
    ["type"]: "string";
    ["minLength"]?: number;
    ["maxLength"]?: number;
    ["format"]?: number;
    ["enum"]?: string[];
}
export interface SwaggerNumberDefinition extends SwaggerSchemaBase {
    type: 'number';
    ["format"]?: SwaggerNumberFormat;
    ["minimum"]?: number;
    ["maximum"]?: number;
    ["multipleOf"]?: number;
    ["exclusiveMinimum"]?: boolean;
    ["exclusiveMaximim"]?: boolean;
}
export interface SwaggerIntegerDefinition extends SwaggerSchemaBase {
    type: 'integer';
    ["format"]?: SwaggerNumberFormat;
    ["minimum"]?: number;
    ["maximum"]?: number;
    ["multipleOf"]?: number;
    ["exclusiveMinimum"]?: boolean;
    ["exclusiveMaximim"]?: boolean;
}
export interface SwaggerBooleanTypeDefinition extends SwaggerSchemaBase {
    ["type"]: "boolean";
}
export interface SwaggerReference extends SwaggerSchemaBase {
    ["$ref"]: string;
}
export interface SwaggerObjectDefinition {
    /**
     * Question to OpenAPI3: should type really be optional?
     */
    type: "object";
    properties?: {
        [key: string]: SwaggerSchema;
    };
    required?: string[];
    additionalProperties?: boolean | SwaggerSchema;
    example?: {
        [key: string]: any;
    };
    ["allOf"]?: SwaggerSchema[];
    ["anyOf"]?: SwaggerSchema[];
    ["oneOf"]?: SwaggerSchema[];
}
export interface SwaggerArrayDefinition extends SwaggerSchemaBase {
    type: "array";
    items: SwaggerSchema;
}
export interface SwaggerNotTypeDefinition extends SwaggerSchemaBase {
    ["not"]: SwaggerSchema;
}
export interface SwaggerOneOf {
    oneOf: SwaggerSchema[];
}
export interface SwaggerAllOf {
    allOf: SwaggerSchema[];
}
export interface SwaggerAnyOf extends SwaggerSchemaBase {
    anyOf: SwaggerSchema[];
}
export declare type SwaggerSchema = SwaggerOneOf | SwaggerAllOf | SwaggerAnyOf | SwaggerNotTypeDefinition | SwaggerReference | SwaggerStringDefinition | SwaggerBooleanTypeDefinition | SwaggerNumberDefinition | SwaggerIntegerDefinition | SwaggerObjectDefinition | SwaggerArrayDefinition;
export declare function isAnyOf(value: SwaggerSchema): value is SwaggerAnyOf;
export declare function isAllOf(value: SwaggerSchema): value is SwaggerAllOf;
export declare function isRef(value: SwaggerSchema): value is SwaggerReference;
export declare function isOneOf(value: SwaggerSchema): value is SwaggerOneOf;
export declare function isObject(value: SwaggerSchema): value is SwaggerObjectDefinition;
export declare function isString(value: SwaggerSchema): value is SwaggerStringDefinition;
export declare function isNumber(value: SwaggerSchema): value is SwaggerNumberDefinition;
export declare function isBoolean(value: SwaggerSchema): value is SwaggerBooleanTypeDefinition;
export declare function isInteger(value: SwaggerSchema): value is SwaggerNumberDefinition;
export interface SwaggerExample {
    value: any;
    summary?: string;
    description?: string;
    externalValue?: string;
}
export interface SwaggerParameterDefinition {
    in: SwaggerParameterLocation;
    name: string;
    description?: string;
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema: SwaggerSchema;
    example?: any;
    examples?: {
        [key: string]: SwaggerExample;
    };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
}
export declare type SwaggerHTTPScheme = "http" | "https";
export declare type SwaggerSecurityKeyLocation = "header" | "query" | "cookie";
export declare type SwaggerBasicAuthcheme = "http" | "https";
export declare type SwaggerSecuritySchemeType = "basic" | "bearer" | "apiKey" | "openIdConnect" | "oauth2";
export interface OAuthFlow {
    authorizationUrl?: string;
    tokenUrl?: string;
    refreshUrl?: string;
    scopes?: {
        [key: string]: string;
    };
}
export interface OAuthFlows {
    implicit?: OAuthFlow;
    password?: OAuthFlow;
    clientCredentials?: OAuthFlow;
    authorizationCode?: OAuthFlow;
}
export interface SwaggerSecurityScheme {
    type: SwaggerSecuritySchemeType;
    scheme?: SwaggerSecuritySchemeType;
    in?: SwaggerSecurityKeyLocation;
    name?: string;
    bearerFormat?: string;
    flows?: OAuthFlows;
}
export interface AppliedSecurityScheme {
    [key: string]: Array<any>;
}
export interface SwaggerContact {
    name?: string;
    url?: string;
    email?: string;
}
export interface SwaggerLicense {
    name?: string;
    url?: string;
}
export interface SwaggerExternalDocumentation {
    description?: string;
    url?: string;
}
export interface SwaggerInfo {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: SwaggerContact;
    license?: SwaggerLicense;
}
export interface SwaggerServerVariable {
    enum?: string[];
    default: string;
    description?: string;
}
export interface SwaggerServer {
    url: string;
    description?: string;
    variables?: {
        [key: string]: SwaggerServerVariable;
    };
}
export interface SwaggerHeader {
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema: SwaggerSchema;
    example?: any;
    examples?: {
        [key: string]: SwaggerExample;
    };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
}
export interface SwaggerEncoding {
    contentType?: string;
    headers?: {
        [key: string]: SwaggerHeader | SwaggerPrimitiveType;
    };
    style?: string;
}
export interface SwaggerMediaType {
    schema?: SwaggerSchema | SwaggerReference;
    example?: any;
    examples?: {
        [key: string]: SwaggerExample;
    };
    encoding?: {
        [key: string]: SwaggerEncoding;
    };
}
export interface SwaggerRequestBody {
    content: {
        [key: string]: SwaggerMediaType;
    };
    description?: string;
    required?: boolean;
}
export interface SwaggerTag {
    name: string;
    description?: string;
    externalDocs?: SwaggerExternalDocumentation;
}
/**
 * The Link object represents a possible design-time link for a response.
 */
export interface SwaggerLink {
    /**
     * points to OperationObject https://swagger.io/specification/#operationObject
     */
    operationRef?: string;
    operationId?: string;
    parameters?: {
        [key: string]: any;
    };
    requestBody?: any;
    description?: string;
    server?: SwaggerServer;
}
export interface SwaggerSecurityRequirement {
    [key: string]: string[];
}
export interface SwaggerOperation {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: SwaggerExternalDocumentation;
    operationId?: string;
    parameters?: (SwaggerParameterDefinition | SwaggerReference)[];
    requestBody?: SwaggerRequestBody | SwaggerReference;
    responses: {
        [key: string]: SwaggerResponse;
    };
    callbacks?: {
        [key: string]: SwaggerCallback | SwaggerReference;
    };
    deprecated?: boolean;
    security?: SwaggerSecurityRequirement;
    servers?: SwaggerServer[];
}
export interface SwaggerResponse {
    description: string;
    headers?: {
        [key: string]: SwaggerHeader | SwaggerReference;
    };
    /**
     * key: media type, for example "application/json"
     */
    content?: {
        [key: string]: SwaggerMediaType | SwaggerReference;
    };
    links?: {
        [key: string]: SwaggerLink | SwaggerReference;
    };
    schema?: SwaggerSchema | SwaggerReference;
}
export interface SwaggerPathItem {
    ["$ref"]?: string;
    summary?: string;
    description?: string;
    get?: SwaggerOperation;
    post?: SwaggerOperation;
    patch?: SwaggerOperation;
    delete?: SwaggerOperation;
    put?: SwaggerOperation;
    head?: SwaggerOperation;
    options?: SwaggerOperation;
    trace?: SwaggerOperation;
    servers?: SwaggerServer[];
    parameters?: (SwaggerParameterDefinition | SwaggerReference)[];
}
export interface SwaggerCallback {
    [key: string]: SwaggerOperation;
}
export interface OpenAPI3 {
    openapi: string;
    info: SwaggerInfo;
    paths: {
        [key: string]: SwaggerPathItem;
    };
    servers?: SwaggerServer[];
    components?: {
        schemas?: {
            [key: string]: SwaggerSchema | SwaggerReference;
        };
        parameters?: {
            [key: string]: SwaggerParameterDefinition | SwaggerReference;
        };
        examples?: {
            [key: string]: SwaggerExample | SwaggerReference;
        };
        requestBodies?: {
            [key: string]: SwaggerRequestBody | SwaggerReference;
        };
        headers?: {
            [key: string]: SwaggerHeader | SwaggerReference;
        };
        securitySchemes?: {
            [key: string]: SwaggerSecurityScheme | SwaggerReference;
        };
        links?: {
            [key: string]: SwaggerLink | SwaggerReference;
        };
        callbacks?: {
            [key: string]: SwaggerCallback | SwaggerReference;
        };
    };
    security?: AppliedSecurityScheme;
    tags?: SwaggerTag[];
    externalDocs?: SwaggerExternalDocumentation;
}
export interface Swagger2ParameterDefinition {
    in: SwaggerParameterLocation;
    name: string;
    description?: string;
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema?: SwaggerSchema;
    example?: any;
    examples?: {
        [key: string]: SwaggerExample;
    };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    type?: SwaggerAllTypes;
    format?: string;
    collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
    items?: {
        type: SwaggerAllTypes;
    };
}
export interface Swagger2Operation {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: SwaggerExternalDocumentation;
    operationId?: string;
    parameters?: (Swagger2ParameterDefinition | SwaggerReference)[];
    requestBody?: SwaggerRequestBody | SwaggerReference;
    responses: {
        [key: string]: SwaggerResponse;
    };
    callbacks?: {
        [key: string]: SwaggerCallback | SwaggerReference;
    };
    deprecated?: boolean;
    security?: SwaggerSecurityRequirement;
    servers?: SwaggerServer[];
}
export interface Swagger2PathItem {
    ["$ref"]?: string;
    summary?: string;
    description?: string;
    get?: Swagger2Operation;
    post?: Swagger2Operation;
    patch?: Swagger2Operation;
    delete?: Swagger2Operation;
    put?: Swagger2Operation;
    head?: Swagger2Operation;
    options?: Swagger2Operation;
    trace?: Swagger2Operation;
    servers?: SwaggerServer[];
    parameters?: (Swagger2ParameterDefinition | SwaggerReference)[];
}
export interface OpenAPI2 {
    swagger: string;
    info: SwaggerInfo;
    host?: string;
    basePath?: string;
    schemes?: string[];
    consumes?: string[];
    produces?: string[];
    paths: {
        [key: string]: Swagger2PathItem;
    };
    servers?: SwaggerServer[];
    definitions?: {
        [key: string]: SwaggerSchema;
    };
    parameters?: {
        [key: string]: Swagger2ParameterDefinition;
    };
    components?: {
        schemas?: {
            [key: string]: SwaggerSchema | SwaggerReference;
        };
        parameters?: {
            [key: string]: Swagger2ParameterDefinition | SwaggerReference;
        };
        examples?: {
            [key: string]: SwaggerExample | SwaggerReference;
        };
        requestBodies?: {
            [key: string]: SwaggerRequestBody | SwaggerReference;
        };
        headers?: {
            [key: string]: SwaggerHeader | SwaggerReference;
        };
        securitySchemes?: {
            [key: string]: SwaggerSecurityScheme | SwaggerReference;
        };
        links?: {
            [key: string]: SwaggerLink | SwaggerReference;
        };
        callbacks?: {
            [key: string]: SwaggerCallback | SwaggerReference;
        };
    };
    security?: AppliedSecurityScheme;
    tags?: SwaggerTag[];
    externalDocs?: SwaggerExternalDocumentation;
}
