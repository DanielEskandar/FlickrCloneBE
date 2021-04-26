// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
//const albumController = require('./controllers/albumController.js');

// CREATE ROUTER
const albumRouter = express.Router();

// ROUTE URLs

albumRouter.post('/');
albumRouter.delete('/:id');
albumRouter.get('/:id');
albumRouter.patch('/:id/meta');

albumRouter.get('/:id/photos');
albumRouter.put('/:id/photos');
albumRouter.post('/:id/photos');
albumRouter.delete('/:id/photos');
albumRouter.delete('/:id/:photoid');

albumRouter.get('/:id/context/:photoid');
albumRouter.patch('/:id/primary/:photoid');
albumRouter.patch('/setorder');
albumRouter.patch('/:id/reorder');

albumRouter.post('/:id/comments');
albumRouter.get('/:id/comments');
albumRouter.patch('/comments/:id');
albumRouter.delete('/comments/:id');

// EXPORT ROUTER
module.exports = albumRouter;
