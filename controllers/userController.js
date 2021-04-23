// INCLUDE MODELS
const userModel = require('../models/userModel.js');

exports.simple = (req, res, next) => {
  res.send('simple function');
};

exports.createUser = async (req, res, next) => {
  await userModel
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    })
    .then(() => console.log('Added a new user successfully'))
    .catch(() => console.log('Failed to add a new user'));
  console.log(req.body);
};
