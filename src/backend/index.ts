import * as express from 'express'

const app = express()

const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 

const swaggerUi = require('swagger-ui-express');

// sample server...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger/sample.json')));
// app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(require('../../swagger/server2.json')));

// generated routes for the app 
import {MyService} from './sample';

// use the server factory

type serverFactory = (req,res) => MyService

/**
 * @service myserviceid
 */
function bootstrap(app:any, server:serverFactory) {
  // Automatically generated endpoint for ping
  app.get('/sometest/v1/ping/:message/', async function( req, res ) {
    try {
      res.json( await server(req, res).ping(req.params.message) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for sayHello
  app.get('/sometest/v1/hello/:name/', async function( req, res ) {
    try {
      res.json( await server(req, res).sayHello(req.params.name) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}

// initialize the API endpoint
bootstrap( app, ( req, res ) => new MyService(req, res) )

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}  
  
