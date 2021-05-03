// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');
const galleryRouter = require('./routers/galleryRouter.js');
const albumRouter = require('./routers/albumRouter.js');

// CREATE EXPRESS APP
const app = express();

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ATTACH ROUTES
app.use('/user', userRouter);
app.use('/gallery', galleryRouter);
app.use('/album', albumRouter);

// EXPORT APP
module.exports = app;
