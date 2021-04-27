// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const photoController = require('../controllers/photoController.js');

// CREATE ROUTER
const photoRouter = express.Router();

// ROUTE URLs
photoRouter.post('/');
photoRouter.patch('/:id/perm');
photoRouter.patch('/:id/');
photoRouter.delete('/:id/');
photoRouter.get('/:id');
photoRouter.get('/:id/url');
photoRouter.patch('/:id/tags');
photoRouter.post('/:id/tags');
photoRouter.delete('/:id/tags');
photoRouter.get('/:id/galleries');
photoRouter.get('/:id/contexts/all');
photoRouter.get('/:id/contexts');
photoRouter.get('/:id/counts');
photoRouter.get('/:id/exif');
photoRouter.get('/:id/faves');
photoRouter.get('/:id/perm');
photoRouter.get('/:id/sizes');
photoRouter.patch('/:id/content');
photoRouter.patch('/:id/date');
photoRouter.patch('/:id/meta-data');
photoRouter.patch('/:id/safety-level');
photoRouter.post('/:id/comments');
photoRouter.delete('/comments/:id');
photoRouter.patch('/comments/:id');
photoRouter.get('/:id/comments');
photoRouter.get('/:id/comments/recent');
photoRouter.get('/:id/location');
photoRouter.patch('/:id/location');
photoRouter.delete('/:id/location');
photoRouter.get('/:id/licenses');
photoRouter.patch('/:id/licenses');
photoRouter.post('/:id/tags/:userId');
photoRouter.delete('/:id/tags/:userId');
photoRouter.get('/:id/tags');
photoRouter.patch('/:id/rotate')


// EXPORT ROUTER
module.exports = photoRouter;
