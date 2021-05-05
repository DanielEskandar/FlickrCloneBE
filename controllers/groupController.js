// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');
const discModel = require('../models/discussionModel.js');
const userModel = require('../models/userModel.js');
//GET ALL GROUPS INFO
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
    if ((await groupModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'Couldnt find group',
      });
      return;
    }

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
    if ((await groupModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'Couldnt find group',
      });
      return;
    }
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
    if ((await groupModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'Couldnt find group',
      });
      return;
    }
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
    if ((await discModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'discussion doesnt exist',
      });
      return;
    }
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
    if ((await discModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'discussion doesnt exist',
      });
      return;
    }
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
    const newDiscussion = await discModel.create(req.body); //create new discussion instance

    await groupModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { discussionTopics: newDiscussion },
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
    //if discussion doesnt exist, end
    if ((await discModel.findById(req.params.id)) === null) {
      res.status(400).send({
        status: 'error',
        message: 'discussion doesnt exist',
      });
      return;
    }
    //else update
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
//CREATE NEW GROUP
exports.CreateGroup = async (req, res) => {
  try {
    const admin = await userModel.findById(req.headers.userid); //group creator
    // console.log(admin);
    const newGroup = await groupModel.create(req.body); //create instance of groupModel
    console.log(req.body);
    //add group creator and set as admin
    await groupModel.findByIdAndUpdate(newGroup._id, {
      $push: { users: admin, $set: { admin: true } },
    });
    console.log(newGroup);
    res.status(200).send({
      status: 'success',
      data: JSON.parse(JSON.stringify(newGroup)),
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err,
    });
  }
};
