const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 

const swaggerUi = require('swagger-ui-express');

// sample server...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger/api.json')));
// app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(require('../../swagger/server2.json')));

// generated routes for the app 
import {ServerInterface} from './api';

/**
 * 
 * @rewrite server
 * @service service1
 * @param app 
 * 
 */
function automaticServices(app:any, server:ServerInterface) {
  // Service endpoint for putUser
  app.put('/v1/user/:id', function( req, res ) {
    try {
      res.json( server.putUser(req.params.id,req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for getUser
  app.get('/v1/user/:id', function( req, res ) {
    try {
      res.json( server.getUser(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for deleteUser
  app.delete('/v1/user/:id', function( req, res ) {
    try {
      res.json( server.deleteUser(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for newfn
  app.get('/v1/newfn/:s', function( req, res ) {
    try {
      res.json( server.newfn(req.params.s) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for getDevices
  app.get('/v1/getDevices/:id', function( req, res ) {
    try {
      res.json( server.getDevices(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for allUsers
  app.get('/v1/allUsers/', function( req, res ) {
    try {
      res.json( server.allUsers() );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for users
  app.get('/v1/users/:id', function( req, res ) {
    try {
      res.json( server.users(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for createUser
  app.post('/v1/createUser/', function( req, res ) {
    try {
      res.json( server.createUser(req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for setDeviceData
  app.post('/v1/setDeviceData/', function( req, res ) {
    try {
      res.json( server.setDeviceData(req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for obj
  app.get('/v1/obj/:v', function( req, res ) {
    try {
      res.json( server.obj(req.params.v) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for test3
  app.get('/v1/test3/:id', function( req, res ) {
    try {
      res.json( server.test3(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for HelloWorld
  app.get('/v1/HelloWorld/:name', function( req, res ) {
    try {
      res.json( server.HelloWorld(req.params.name) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for hello
  app.get('/v1/hello/:name', function( req, res ) {
    try {
      res.json( server.hello(req.params.name) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
}
automaticServices( app, new ServerInterface() )


if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}  
  
