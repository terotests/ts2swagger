import * as express from "express";
import { MyService } from "./sample";

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("public"));
const swaggerUi = require("swagger-ui-express");

// sample server...
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../../swagger/sample.json"))
);

type serverFactory = (req, res) => MyService;
type TRequest = express.Request;
type TResponse = express.Response;

/**
 * @service myserviceid
 */
function bootstrap(app: any, server: serverFactory) {
  // Automatically generated endpoint for ping
  app.get('/sometest/v1/ping/:message/', async function( req:TRequest, res:TResponse ) {
    try {
      if(typeof req.params.message !== 'string') throw({statusCode:422})
      res.json( await server(req, res).ping(req.params.message) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for sayHello
  app.get('/sometest/v1/hello/:name/', async function( req:TRequest, res:TResponse ) {
    try {
      if(typeof req.params.name !== 'string') throw({statusCode:422})
      res.json( await server(req, res).sayHello(req.params.name) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for getDevice
  app.get('/sometest/v1/getDevice/:id/', async function( req:TRequest, res:TResponse ) {
    try {
      const maybe_id:any = parseInt(String(req.params.id)) 
      const id:number | null = (!isNaN(maybe_id) && (Number.isInteger(maybe_id)) && (maybe_id >= 0)) ? maybe_id : null
      if(id === null) throw({statusCode:422})
      const yesno:any = req.query.yesno === "true" ? true : req.query.yesno === "false" ? false : req.query.yesno
      if(typeof yesno !== 'boolean') throw({statusCode:422})
      if(typeof req.query.what !== 'string') throw({statusCode:422})
      res.json( await server(req, res).getDevice(id, yesno, req.query.what) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for getDeviceSecond
  app.get('/sometest/v1/getDeviceSecond/', async function( req:TRequest, res:TResponse ) {
    try {
      const maybe_id:any = parseInt(String(req.query.id)) 
      const id:number | null = (!isNaN(maybe_id) && (Number.isInteger(maybe_id)) && (maybe_id >= 0)) ? maybe_id : null
      if(id === null) throw({statusCode:422})
      const yesno:any = req.query.yesno === "true" ? true : req.query.yesno === "false" ? false : req.query.yesno
      if(typeof yesno !== 'boolean') throw({statusCode:422})
      if(typeof req.query.what !== 'string') throw({statusCode:422})
      res.json( await server(req, res).getDeviceSecond(id, yesno, req.query.what) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for upload
  app.post('/sometest/v1/upload/', async function( req:TRequest, res:TResponse ) {
    try {
      res.json( await server(req, res).upload() );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for testAnyResp
  app.get('/sometest/v1/testAnyResp/:value/', async function( req:TRequest, res:TResponse ) {
    try {
      if(typeof req.params.value !== 'string') throw({statusCode:422})
      res.json( await server(req, res).testAnyResp(req.params.value) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for recursiveTest
  app.get('/sometest/v1/recursiveTest/', async function( req:TRequest, res:TResponse ) {
    try {
      res.json( await server(req, res).recursiveTest() );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}

// initialize the API endpoint
bootstrap(app, (req, res) => new MyService(req, res));

if (!module.parent) {
  app.listen(1337);
  console.log("listening on port 1337");
}
