// INCLUDE MODELS
const userModel = require('../models/userModel.js');

exports.simple = (req, res) => {
  console.log('simple function called');
  res.status(200).json({
    status: 'success',
    data: 'OK',
  });
};

exports.createUser = async (req, res, next) => {
  await userModel
    .create(req.body)
    .then(() => console.log('Added a new user successfully'))
    .catch(() => console.log('Failed to add a new user'));
  console.log(req.body);
};
