import * as express from 'express'

const app = express()

const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 

const swaggerUi = require('swagger-ui-express');

// sample server...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger/api.json')));
// app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(require('../../swagger/server2.json')));

// generated routes for the app 
import {ServerInterface} from './api';

// use the server factory

type serverFactory = (req,res) => ServerInterface

/**
 * 
 * @rewrite server
 * @service service1
 * @param app 
 * 
 */
function automaticServices(app:any, server:serverFactory) {
  // Service endpoint for putUser
  app.put('/sometest2/v1/user/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).putUser(req.params.id, typeof(req.query.overwrite) === 'undefined' ? req.query.overwrite : req.query.overwrite === 'true', req.body) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for getUser
  app.get('/sometest2/v1/users/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).getUser(req.params.id) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for searchByKeyword
  app.get('/sometest2/v1/searchByKeyword/', async function( req, res ) {
    try {
      res.json( await server(req, res).searchByKeyword(req.query.searchKeyword) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for getUserFriends
  app.get('/sometest2/v1/users/:userId/friends/:friendId/', async function( req, res ) {
    try {
      res.json( await server(req, res).getUserFriends(req.params.userId, req.params.friendId, req.query.filter) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for deleteUser
  app.delete('/sometest2/v1/user/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).deleteUser(req.params.id) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for newfn
  app.get('/sometest2/v1/newfn/:s/', async function( req, res ) {
    try {
      res.json( await server(req, res).newfn(req.params.s) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for getDevices
  app.get('/sometest2/v1/getDevices/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).getDevices(req.params.id) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for allUsers
  app.get('/sometest2/v1/allUsers/', async function( req, res ) {
    try {
      res.json( await server(req, res).allUsers() );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for users
  app.get('/sometest2/v1/users/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).users(req.params.id) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for createUser
  app.post('/sometest2/v1/createUser/', async function( req, res ) {
    try {
      res.json( await server(req, res).createUser(req.body) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for setDeviceData
  app.post('/sometest2/v1/setDeviceData/', async function( req, res ) {
    try {
      res.json( await server(req, res).setDeviceData(req.body) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for obj
  app.get('/sometest2/v1/obj/:v/', async function( req, res ) {
    try {
      res.json( await server(req, res).obj(req.params.v) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for test3
  app.get('/sometest2/v1/test3/:id/', async function( req, res ) {
    try {
      res.json( await server(req, res).test3(req.params.id) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for HelloWorld
  app.get('/sometest2/v1/HelloWorld/:name/', async function( req, res ) {
    try {
      res.json( await server(req, res).HelloWorld(req.params.name) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for hello
  app.get('/sometest2/v1/hello/:name/', async function( req, res ) {
    try {
      res.json( await server(req, res).hello(req.params.name) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Service endpoint for custom
  app.get('/sometest2/v1/custom/:name/', async function( req, res ) {
    try {
      await server(req, res).custom(req.params.name);
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}

// initialize the API endpoint
automaticServices( app, ( req, res ) => new ServerInterface(req, res) )

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}  
  
