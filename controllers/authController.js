// INCLUDE DEPENDENCIES
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

// INCLUDE MODELS
const userModel = require('../models/userModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// INCLUDE EMAIL SENDER
const sendEmail = require('../utils/emailSender.js');

// SIGN TOKEN
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// CREATE SIGN TOKEN
const createSignToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: { _id: JSON.parse(JSON.stringify(user._id)) },
    },
  });
};

// SIGN UP
exports.signUp = async (req, res) => {
  try {
    const newUser = await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
    });

    createSignToken(newUser, 201, res);
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// SIGN IN
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if email and password exist
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // check if user exists
    const user = await userModel.findOne({ email }).select('password');
    if (!user) {
      throw new AppError('Invalid Email', 401);
    }

    // check if password is correct
    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      throw new AppError('Invalid Password', 401);
    }

    // if everything ok, send token to client
    createSignToken(user, 200, res);
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// PROTECT
exports.protect = async (req, res, next) => {
  try {
    // Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
    }

    if (!token) {
      throw new AppError(
        'You are not logged in. Please log in to get access.',
        401
      );
    }

    // Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
      throw new AppError(
        'The user belonging to this token does not exist',
        401
      );
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new AppError(
        'User changed password recently. Please log in again.',
        401
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    // Get user based on email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      throw new AppError('No user is found by that email', 404);
    }

    // Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send it to the users's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/user/reset-password/${resetToken}`;

    const message = {
      html: `<p>To reset the password on your account, simply use the link below and follow the steps.</p>
      <a href="${resetURL}">Reset your password</a>
      <p>If you did not request a password reset, please disregard this email. Nothing will change to your account.</p>
      <p>The Flickr team.</p>`,
    };

    try {
      await sendEmail({
        email: user.email,
        subject: 'Flickr - Reset your password',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      throw new AppError(
        'There was an error sending the email. Please try again later.',
        500
      );
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    // Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // If token has not expired, user exists, set the new password
    if (!user) {
      throw new AppError('Token is invalid or has expired', 400);
    }

    // udpate password property
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Log the user in and send JWT
    createSignToken(user, 200, res);
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    // Get user from collection
    const user = await userModel.findById(req.user.id).select('password');

    // Check if POSTed current password is corrcect
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      throw new AppError('Your current password is wrong.', 401);
    }

    // Update password
    user.password = req.body.password;

    // Log user and send JWT
    createSignToken(user, 200, res);
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
