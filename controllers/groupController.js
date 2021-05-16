// INCLUDE MODELS
const groupModel = require('../models/groupModel.js');
const discModel = require('../models/discussionModel.js');
const userModel = require('../models/userModel.js');
const replyModel = require('../models/replyModel.js');
// INCLUDE ERROR CLASS AND ERROR CONTROLLER

const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// GET ALL GROUPS INFO
exports.getInfo = async (req, res) => {
  try {
    const group = await groupModel.find().sort({ startDate: -1 });

    if (!group) {
      throw new AppError('No groups found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(group)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// CREATE NEW GROUP
exports.createGroup = async (req, res) => {
  try {
    const creator = await userModel.findById(req.headers.userid);
    const newGroup = await groupModel.create(req.body);

    if (!newGroup) {
      throw new AppError('Failed to Create New Group', 409);
    }

    //add group creator and set as admin
    const updatedGroup = await groupModel
      .findByIdAndUpdate(
        newGroup,
        {
          $addToSet: {
            users: {
              userId: creator,
              joinDate: '2021-01-01',
              admin: true,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ users: { _id: 0 } });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(updatedGroup)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET ALL DISCUSSIONS IN A GROUP
exports.getAllDiscussions = async (req, res) => {
  try {
    if ((await groupModel.findById(req.params.id)) === null) {
      throw new AppError('No Group Found with this ID', 404);
    }

    const discussions = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('discussionTopics'); // returns id

    if (discussions === null) {
      throw new AppError('No Discussions Found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(discussions)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// DELETE A DISCUSSION BY ID
exports.deleteDiscussion = async (req, res) => {
  try {
    if ((await discModel.findById(req.params.id)) === null) {
      throw new AppError('No Discussion Found with this ID', 404);
    }

    await discModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// DELETE A REPLY BY ID
exports.deleteReply = async (req, res) => {
  try {
    if ((await replyModel.findById(req.params.id)) === null) {
      throw new AppError('No Reply Found with this ID', 404);
    }

    await replyModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET A DISCUSSION BY ID
exports.getDiscussion = async (req, res) => {
  try {
    const discussion = await discModel
      .findById(req.params.id)
      .select({ _id: 0 });

    if (!discussion) {
      throw new AppError('No Discussion Found with this ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(discussion)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// CREATE DISCUSSION
exports.createDiscussion = async (req, res) => {
  try {
    //validations on group ID
    if ((await groupModel.findById(req.params.id)) === null) {
      throw new AppError('No Group Found with this ID', 404);
    }

    const Discussion = await discModel.create(req.body); //create new discussion instance

    await groupModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          discussionTopics: {
            _id: Discussion._id,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ); //pushing new discussion topic to group
    //   const author = await userModel.findById(req.headers.userid);
    const newDiscussion = await discModel.findByIdAndUpdate(
      Discussion,
      {
        user: req.headers.userid,
      },
      {
        new: true,
        runValidators: true,
      }
    ); //pushing user in new discussion
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newDiscussion)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD REPLY
exports.addReply = async (req, res) => {
  try {
    //validations on discussion ID
    if ((await discModel.findById(req.params.id)) === null) {
      throw new AppError('No Discussion Found with this ID', 404);
    }

    const reply = await replyModel.create(req.body); //create new reply instance

    await discModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          replies: {
            _id: reply._id,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    //  authoriztation
    const newReply = await replyModel.findByIdAndUpdate(
      reply,
      {
        user: req.headers.userid,
      },
      {
        new: true,
        runValidators: true,
      }
    ); //reply author
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newReply)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// EDIT A DISCUSSION
exports.editDiscussion = async (req, res) => {
  try {
    //if discussion doesnt exist, end
    const disc = await discModel.findById(req.params.id);

    if (!disc) {
      throw new AppError('No Discussion Found with this ID', 404);
    }

    //else update
    const newDisc = await discModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newDisc)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// EDIT A REPLY
exports.editReply = async (req, res) => {
  try {
    const reply = await replyModel.findById(req.params.id);

    if (!reply) {
      throw new AppError('No Reply Found with this ID', 404);
    }

    //else update
    const newReply = await replyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newReply)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
// GET MEMBERS
exports.getMembers = async (req, res) => {
  try {
    if ((await groupModel.findById(req.params.id)) === null) {
      throw new AppError('No Group Found with this ID', 404);
    }

    const members = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('users');

    if (!members) {
      throw new AppError('No Members Found in this Group', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(members)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET PHOTO POOL
exports.getPhotoPool = async (req, res) => {
  try {
    if ((await groupModel.findById(req.params.id)) === null) {
      throw new AppError('No Group Found with this ID', 404);
    }

    const photos = await groupModel
      .findById(req.params.id)
      .select({ _id: 0 })
      .select('photos');

    if (!photos) {
      throw new AppError('No Photots Found in this Group', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(photos)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET A REPLY
exports.getReply = async (req, res) => {
  try {
    const reply = await replyModel.findById(req.params.id).select({ _id: 0 });

    if (!reply) {
      throw new AppError('No Reply Found with this ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(reply)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET ALL REPLIES
exports.getAllReplies = async (req, res) => {
  try {
    if ((await discModel.findById(req.params.id)) === null) {
      throw new AppError('No discussion Found with this ID', 404);
    }

    const replies = await discModel
      .findById(req.params.id)
      .select({ replies: 1, _id: 0 })
      .populate([
        {
          path: 'replies',
          model: 'replyModel',
          select: 'content',
          select: 'date',
          select: { _id: 0 },
          populate: {
            path: 'user',
            model: 'userModel',
            select: 'displayName',
          },
        },
      ]);

    if (replies === null) {
      throw new AppError('No Replies Found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(replies)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
