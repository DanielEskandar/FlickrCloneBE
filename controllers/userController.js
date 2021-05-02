// INCLUDE MODELS
const userModel = require('../models/userModel.js');

// GET REAL NAME
exports.getRealName = async (req, res) => {
  try {
    const realName = await userModel
      .findById(req.headers.userid)
      .select({ firstName: 1, lastName: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: realName.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

// GET DISPLAY NAME
exports.getDispName = async (req, res) => {
  try {
    const dispName = await userModel
      .findById(req.headers.userid)
      .select({ displayName: 1, _id: 0 });

    res.status(200).send({
      status: 'success',
      data: dispName.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
