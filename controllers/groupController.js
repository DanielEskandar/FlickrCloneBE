// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');
const discModel = require('../models/discussionModel.js');

//GET ALL GROUPS
exports.GetInfo = async (req, res) => {
  try {
    const group = await groupModel.find();

    res.status(200).send({
      status: 'success',
      data: { groups: JSON.parse(JSON.stringify(group)) },
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
      data: JSON.parse(JSON.stringify(members)),
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
      data: JSON.parse(JSON.stringify(photos)),
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
      data: JSON.parse(JSON.stringify(discussions)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//DELETE A DISCUSSION BY ID
exports.DeleteDiscussion = async (req, res) => {
  try {
    await discModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//GET A DISCUSSION BY ID
exports.getDiscussion = async (req, res) => {
  try {
    const discussion = await discModel
      .findById(req.params.id)
      .select({ _id: 0 });

    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(discussion)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};

//CREATE DISCUSSION
exports.createDiscussion = async (req, res) => {
  try {
    const newDiscussion = await discModel.create(req.body);
    await groupModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { discussionTopics: newDiscussion._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(newDiscussion)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail',
      message: 'failed to create',
    });
  }
};
//EDIT A DISCUSSION
exports.EditDiscussion = async (req, res) => {
  try {
    const newDisc = await discModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(newDisc)),
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err,
    });
  }
};
