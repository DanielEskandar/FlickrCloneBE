// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');

// CREATE EXPRESS APP
const app = express();

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ATTACH ROUTES
app.use("/user", userRouter);

// EXPORT APP
module.exports = app;
