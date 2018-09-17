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
  app.put('/foo2/v1/user/:id/', async function( req, res ) {
    try {
      res.json( await server.putUser(req.params.id, typeof(req.query.overwrite) === 'undefined' ? req.query.overwrite : req.query.overwrite === 'true', req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for getUser
  app.get('/foo2/v1/users/:id/', async function( req, res ) {
    try {
      res.json( await server.getUser(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for searchByKeyword
  app.get('/foo2/v1/searchByKeyword/', async function( req, res ) {
    try {
      res.json( await server.searchByKeyword(req.query.searchKeyword) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for getUserFriends
  app.get('/foo2/v1/users/:userId/friends/:friendId/', async function( req, res ) {
    try {
      res.json( await server.getUserFriends(req.params.userId, req.params.friendId, req.query.filter) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for deleteUser
  app.delete('/foo2/v1/user/:id/', async function( req, res ) {
    try {
      res.json( await server.deleteUser(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for newfn
  app.get('/foo2/v1/newfn/:s/', async function( req, res ) {
    try {
      res.json( await server.newfn(req.params.s) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for getDevices
  app.get('/foo2/v1/getDevices/:id/', async function( req, res ) {
    try {
      res.json( await server.getDevices(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for allUsers
  app.get('/foo2/v1/allUsers/', async function( req, res ) {
    try {
      res.json( await server.allUsers() );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for users
  app.get('/foo2/v1/users/:id/', async function( req, res ) {
    try {
      res.json( await server.users(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for createUser
  app.post('/foo2/v1/createUser/', async function( req, res ) {
    try {
      res.json( await server.createUser(req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for setDeviceData
  app.post('/foo2/v1/setDeviceData/', async function( req, res ) {
    try {
      res.json( await server.setDeviceData(req.body) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for obj
  app.get('/foo2/v1/obj/:v/', async function( req, res ) {
    try {
      res.json( await server.obj(req.params.v) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for test3
  app.get('/foo2/v1/test3/:id/', async function( req, res ) {
    try {
      res.json( await server.test3(req.params.id) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for HelloWorld
  app.get('/foo2/v1/HelloWorld/:name/', async function( req, res ) {
    try {
      res.json( await server.HelloWorld(req.params.name) );
    } catch(e) {
      res.status(400);
      res.json( e.message );
    }
  })
  // Service endpoint for hello
  app.get('/foo2/v1/hello/:name/', async function( req, res ) {
    try {
      res.json( await server.hello(req.params.name) );
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
  
