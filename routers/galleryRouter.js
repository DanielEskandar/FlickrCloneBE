// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
//const galleryController = require('./controllers/galleryController.js');

// CREATE ROUTER
const galleryRouter = express.Router();

// ROUTE URLs

galleryRouter.get('/:id');
galleryRouter.post('/');
galleryRouter.patch('/:id/meta');
galleryRouter.delete('/:id');

galleryRouter.get('/:id/photos');
galleryRouter.put('/:id/photos');
galleryRouter.post('/:id/photos');
galleryRouter.patch('/:id/:photoid');
galleryRouter.delete('/:id/:photoid');

galleryRouter.post('/:id/comments');
galleryRouter.get('/:id/comments');
galleryRouter.patch('/comments/:id');
galleryRouter.delete('/comments/:id');

// EXPORT ROUTER
module.exports = galleryRouter;
