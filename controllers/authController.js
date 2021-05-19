// INCLUDE DEPENDENCIES
const jwt = require('jsonwebtoken');

// INCLUDE MODELS
const userModel = require('../models/userModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
// const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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
