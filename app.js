// INLCUDE DEPENDENCIES
const express = require('express');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');

// CREATE EXPRESS APP
const app = express();

// ATTACH ROUTES
app.use("/user", userRouter);

// EXPORT APP
module.exports = app;
