
# TypeScript to Swagger

Automatically create Swagger documentation and Express endpoints from TypeScript classes.
The tool supports

- Automatically inferring types from TypeScript function declarations 
- Generating callable service endpoint for Express
- Reading class, interface and method and JSDoc comments into Swagger docs
- Defining parameter and return value Models using TypeScript
- Defining types returned at specific error codes
- Grouping functions using Tags
- Allows `Request` and `Response` to be handled in all functions
- Rewrites only functions, not entire files
- Optional values support

The tool search for all TypeScript files with JSDoc comment `@service <somename>` and
if it finds a declaration like this

```typescript
/** 
 * Freeform test of the API comes here
 * 
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1  
 */
export class MyService {  
  constructor( private req:express.Request, private res: express.Response) {}
  ping(message:string) : string {
    return `you sent ${message}`
  } 
}
```

It will compile that file into Swagger JSON file `/src/swagger/service.json` and write the
Express endpoint if it finds a file with a function which is declared using the service ID

```typescript
import * as express from 'express'
const app = express()
/**
 * @service myserviceid
 */
function bootstrap(app:any, server:(req,res) => MyService) {
  // The code will be generated in here
}
```

After running `ts2swagger` the function `overwritten` will have contents

```typescript
function bootstrap(app:any, server:(req,res) => MyService) {
  // Service endpoint for ping
  app.get('/sometest/v1/ping/:message/', async function( req, res ) {
    try {
      res.json( await server(req, res).ping(req.params.message) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}
```

It is almost ready to be used as a service, but you have to start it by adding line

```typescript
bootstrap( app, ( req, res ) => new MyService(req, res) )
// and start listening to some port with express
app.listen(1337);
console.log('listening on port 1337');
```

The if you navigate to `http://localhost:1337/sometest/v1/ping/hello` you get
```
"you sent hello"
```

You will also get Swagger documentation in JSON 

```yaml
swagger: '2.0'
basePath: /sometest/v1/
paths:
  '/ping/{message}':
    get:
      parameters:
        - name: message
          in: path
          description: ''
          required: true
          type: string
      description: ''
      summary: ''
      produces:
        - application/json
      responses:
        '200':
          description: ''
          schema:
            type: string
      tags: []
definitions: {}
schemes:
  - http
  - https
info:
  version: '1.0.1  '
  title: The title of the Doc
  description: Freeform test of the API comes here
  termsOfService: ''
tags: []
```

## Defining Models

Defined models can be used as return values

```typescript
/**
 * @model true
 */
export class Device {
  id: number
  name: string
  description?: string // optional
}
```

The service can then return typed values

```typescript
 class MyService {  
  getDevices() : Device[] {
    return [{id:1, name:'iPhone'}]
  } 
}
```

## Handling Errors

Define Error model, which must have `statusCode` set to the HTTP status code value.

```typescript
/**
 * @model true
 */
export class ErrorNotFound {
  statusCode = 404
  message?: string
}
```

Then you can define one or more method error codes like `@error 404 ErrorNotFound`, for example

```typescript
  /**
   * @error 403 ErrorForbidden
   * @error 404 ErrorNotFound
   */
  async hello(name:string) : Promise<string> {
    if(name==='foo') throw { errorCode:404, message:'User not found'}
    return `Hello ${name}!!!`
  } 
```

## Aliasing

```typescript
  /**
   * @alias hi
   */
  async sayHello(name:string) : Promise<string> {
    if(name==='foo') throw { errorCode:404, message:'User not found'}
    return `Hello ${name}!!!`
  } 
```

