// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const userController = require('../controllers/userController.js');

// CREATE ROUTER
const userRouter = express.Router();

// ROUTE URLs

userRouter.get('/createUser', userController.simple);

userRouter.post('/sign-up');
userRouter.post('confirm');
userRouter.post('/sign-in');
userRouter.post('/sign-out');
userRouter.get('/:id');
userRouter.get('/showcase/:id');
userRouter.get('/limits');
userRouter.get('/:id/stats');
userRouter.get('/:id/popular');
userRouter.get('/:id/recent');
userRouter.get('/:id/recent-update');
userRouter.get('/:id/:locationId');
userRouter.get('/:id/not-set');
userRouter.get('/:id/untagged');
userRouter.get('/:id/geo');
userRouter.get('/:id/no-geo');
userRouter.get('/:id/testimonials');
userRouter.post(':id/testimonials');
userRouter.delete('/testimonials/:id');
userRouter.put('/');
userRouter.delete('/');
userRouter.get('/disp-name');
userRouter.put('/disp-name');
userRouter.put('/password');
userRouter.post('/forget-password');
userRouter.post('/confirm-password');
userRouter.get('/perm');
userRouter.get('/notif');
userRouter.put('/perm');
userRouter.put('/notif');
userRouter.get('/:id/stream');
userRouter.get('/:id/albums');
userRouter.post('/faves');
userRouter.delete('/faves');
userRouter.get('/fave-context');
userRouter.get('/:id/faves');
userRouter.get('/:id/gallery');
userRouter.get('/:id/groups');
userRouter.get('/addable-pool');
userRouter.get('/camera-roll');
userRouter.post('/follow/:id');
userRouter.put('/follow/:id');
userRouter.delete('/follow/:id');
userRouter.post('/block/:id');
userRouter.delete('/block/:id');
userRouter.get('/followed');
userRouter.get('/follower');
userRouter.get('/follower-not-followed');
userRouter.get('/block');
userRouter.get('/messages/sent');
userRouter.get('/messages/inbox');
userRouter.post('/messages');
userRouter.delete('/messages');
userRouter.get('/notif/contact');
userRouter.get('/notif/follow');
userRouter.get('/notif/interact');
userRouter.get('/recent-activity/comments');
userRouter.get('/recent-activity/photo');

// EXPORT ROUTER
module.exports = userRouter;
