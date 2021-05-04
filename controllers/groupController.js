// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');
const discModel = require('../models/discussionModel.js');
//GET ALL GROUPS
exports.GetInfo = async (req, res) => {
  try {
    const groups = await groupModel.find();
    res.status(200).send({
      status: 'success',
      data: { groups },
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//GET MEMBERS
exports.GetMembers = async (req, res) => {
  try {
    const members = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('users');

    res.status(200).send({
      status: 'success',
      data: members.toJSON(),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//GET PHOTO POOL

exports.GetPhotoPool = async (req, res) => {
  try {
    const photos = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('photos');

    res.status(200).send({
      status: 'success',
      data: photos,
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//GET ALL DISCUSSIONS IN A GROUP
exports.GetAllDiscussions = async (req, res) => {
  try {
    const discussions = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('discussionTopics'); // returns id

    res.status(200).send({
      status: 'success',
      data: discussions,
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
