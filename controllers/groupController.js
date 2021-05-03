// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');

//GET ALL GROUPS
exports.GetInfo = async (req, res) => {
    try {
      const groups = await groupModel.find()
      res.status(200).send({
        status: 'success',
        data: {groups}
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err,
      });
    }
  };
