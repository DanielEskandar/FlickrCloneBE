// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// INCLUDE ERROR CLASS
const AppError = require('./utils/appError.js');

// INCLUDE ERROR CONTROLLER
const errorController = require('./controllers/errorController.js');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');
const photoRouter = require('./routers/photoRouter.js');
const galleryRouter = require('./routers/galleryRouter.js');
const albumRouter = require('./routers/albumRouter.js');
const groupRouter = require('./routers/groupRouter.js');

// CREATE EXPRESS APP
const app = express();

// ATTACH PARSERS
app.use(cors());

// CONFIGURE CORS
app.options('*', cors());

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ATTACH ROUTES
app.use('/user', userRouter);
app.use('/photo', photoRouter);
app.use('/gallery', galleryRouter);
app.use('/photoset', albumRouter);
app.use('/group', groupRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  errorController.sendError(
    new AppError(`Cannot find ${req.originalUrl} on the server`, 404),
    req,
    res,
    next
  );
});

// EXPORT APP
module.exports = app;
