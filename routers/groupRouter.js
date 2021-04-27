// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const groupController = require('../controllers/groupController.js');

// CREATE ROUTER
const groupRouter = express.Router();

//APIs
groupRouter
.POST('/'); 

groupRouter
.DELETE('/:id');

groupRouter
.GET('/:id');

groupRouter
.POST('/:id/user/:userid');

groupRouter
.POST('/:id/request/:userid');

groupRouter
.POST('/:id/invite/:userid');

groupRouter
.DELETE('/:id/invite/:userid');

groupRouter
.GET('/search');

groupRouter
.POST('/:id/discussion');

groupRouter
.PATCH('/discussion/:id');

groupRouter
.GET('/discussion/:id');

groupRouter
.GET('/:id/discussion');

groupRouter
.DELETE('/discussion/:id');

groupRouter
.PATCH('/:id/pinned/:topicId');

groupRouter
.POST('/discussions/:id/replies');

groupRouter
.DELETE('/discussions/replies/:id');

groupRouter
.PATCH('/discussions/replies/:id');

groupRouter
.GET('/discussions/replies/:id');

groupRouter
.GET('/discussions/:id/replies');

groupRouter
.GET('/:id/members');

groupRouter
.POST('/:id/pool/:id');

groupRouter
.GET('/:id/photo/:id/context');

groupRouter
.GET('/:id/pool');

groupRouter
.DELETE('/:id/pool');
