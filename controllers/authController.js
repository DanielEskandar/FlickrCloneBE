// INCLUDE DEPENDENCIES
const jwt = require('jsonwebtoken');

// INCLUDE MODELS
const userModel = require('../models/userModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// SIGN TOKEN
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

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

    const token = signToken(newUser._id);

    res.status(201).json({
      stastus: 'success',
      token,
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
      },
    });
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
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
