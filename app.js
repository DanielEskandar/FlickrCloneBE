// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');
const photoRouter = require('./routers/photoRouter.js');
const galleryRouter = require('./routers/galleryRouter.js');
const albumRouter = require('./routers/albumRouter.js');


// CREATE EXPRESS APP
const app = express();

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ATTACH ROUTES
app.use('/user', userRouter);
app.use('/photo', photoRouter);
app.use('/gallery', galleryRouter);
app.use('/photoset', albumRouter);

// EXPORT APP
module.exports = app;
