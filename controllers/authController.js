// INCLUDE MODELS
const userModel = require('../models/userModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
// const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

exports.signUp = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);

    res.status(201).json({
      stastus: 'success',
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
