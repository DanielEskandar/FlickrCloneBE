// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// GET INFORMATION FOR A PHOTO
exports.getInformation = async (req, res) => {
  try {
    const info = await photoModel.findById(req.params.id).select({
      permissions: 0,
      _id: 0,
      safetyLevel: 0,
      hidden: 0,
      license: 0,
    });

    if (!info) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(info)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET FAVOURITES FOR A PHOTO
exports.getFavourites = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    const faves = await photoModel
      .findById(req.params.id)
      .select({ favourites: 1, _id: 0 });

    if (!faves) {
      throw new AppError('No Faves Found for this Photo', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(faves)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD COMMENT TO PHOTO --
exports.addComment = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    const newComment = await commentModel.create(req.body);

    await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: newComment._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newComment)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// EDIT COMMENT ON PHOTO
exports.editComment = async (req, res) => {
  try {
    // Incoming ID in params is of comment this time
    const editedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!editedComment) {
      throw new AppError('No Comment Found with this ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(editedComment)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const photoWithComment = await photoModel
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

    if (!photoWithComment) {
      throw new AppError('No Photo Found with this ID', 404);
    }
    const comment = photoWithComment.comments.find(
      (element) => element.toString() === req.params.commentid.toString()
    );

    if (comment) {
      await photoModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { comments: comment },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      await commentModel.findByIdAndDelete(req.params.commentid);
      res.status(204).json({
        status: 'success',
        data: 'deleted',
      });
    } else {
      throw new AppError('No Comment Found with this ID', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    const comments = await photoModel
      .findById(req.params.id)
      .select({ comments: 1, _id: 0 });

    if (!comments) {
      throw new AppError('No Comments Found for this Photo', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(comments)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET SIZES
exports.getSizes = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    const sizes = await photoModel
      .findById(req.params.id)
      .select({ sizes: 1, _id: 0 });

    if (!sizes) {
      throw new AppError('No Sizes Found for this Photo', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(sizes)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET TAGGED PEOPLE
exports.getTagged = async (req, res) => {
  try {
    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo Found with this ID', 404);
    }

    const tags = await photoModel
      .findById(req.params.id)
      .select({ _id: 0, peopleTagged: 1 });

    if (!tags) {
      throw new AppError('No tags found for this photo', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(tags)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD TAGGED PEOPLE
exports.tagUser = async (req, res) => {
  try {
    //if user trying to tag is authenticated
    if ((await userModel.findById(req.user.id)) === null) {
      throw new AppError('You are not authorized to do this action', 403);
    }

    //validations on photp ID
    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo Found with this ID', 404);
    }

    if ((await userModel.findById(req.params.userid)) === null) {
      throw new AppError('No user to tag Found with this ID', 404);
    }

    const photo = await photoModel.findById(req.params.id);
    //if user alread tagged
    const exists = photo.peopleTagged.find(
      (elem) => elem.userId.toString() === req.params.userid.toString()
    );
    if (exists) {
      throw new AppError('User already tagged', 409);
    }

    const tagTaggedList = await photoModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            peopleTagged: {
              userId: req.params.userid,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ peopleTagged: 1, _id: 0 });

    //tagTaggedList.map({ _id, userId, tagDate }, { userId, tagDate });
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(tagTaggedList)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// REMOVE A TAGGED USER
exports.removePerson = async (req, res) => {
  try {
    //if user trying to remove tagged person is authenticated
    if ((await userModel.findById(req.user.id)) === null) {
      throw new AppError('You are not authorized to do this action', 403);
    }

    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo Found with this ID', 404);
    }

    //check if photo exists in DB
    if ((await userModel.findById(req.params.userid)) === null) {
      throw new AppError('User doesnt Exist', 404);
    }

    const user = await userModel.findById(req.params.userid);

    const photo = await photoModel.findById(req.params.id);
    //if user already not tagged
    const exists = photo.peopleTagged.find(
      (elem) => elem.userId.toString() === req.params.userid.toString()
    );
    if (!exists) {
      throw new AppError('User already not tagged', 409);
    }

    const taggedlist = await photoModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            peopleTagged: { userId: user._id },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({ _id: 0, peopleTagged: 1 });

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(taggedlist)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
