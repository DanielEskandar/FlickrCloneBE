// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendEmail = require('./utils/emailSender');

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

// CONFIGURE CORS POLICY
const whitelist = ['*'];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      process.env.NODE_ENV === 'development' ||
      whitelist.indexOf(origin) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new AppError('Cross-Origin Request Blocked', 401));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,X-Forwarded-For,xsrf-token',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// ATTACH CORS
app.use(cors(corsOptions));

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ATTACH ROUTES
app.use('/user', userRouter);
app.use('/photo', photoRouter);
app.use('/gallery', galleryRouter);
app.use('/photoset', albumRouter);
app.use('/group', groupRouter);

// FUNCTION FOR TESTING EMAIL SENDER
app.get('/testMail', async (req, res) => {
  const trialMail = 'a_tarek1999@yahoo.com';
  try {
    await sendEmail({
      email: trialMail,
      subject: 'Flickr – Testing Mail',
      message: {
        html: `<p>To reset the password on your account, simply use the link below and follow the steps.</p>
          <a href="https://www.google.com">Reset your password</a>
          <p>If you did not request a password reset, please disregard this email. Nothing will change to your account.</p>
          <p>The Flickr team.</p>`,
      },
    });
    res.json({ message: 'Sent successfully!!' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

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
