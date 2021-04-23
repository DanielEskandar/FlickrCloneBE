// INCLUDE DEPENDENCIES
const express = require('express');

// INCLUDE CONTROLLERS
const userController = require('../controllers/userController.js');

// CREATE ROUTER
const userRouter = express.Router();

// ROUTE URLs
userRouter.get('/login', userController.simple);
userRouter.post('/createUser', userController.createUser);

// EXPORT ROUTER
module.exports = userRouter;
