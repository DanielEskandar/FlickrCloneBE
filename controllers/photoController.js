// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');

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

// ADD COMMENT TO PHOTO
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

// SET PHOTO TAGS
exports.setTags = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { tags: req.body.tags },
      },
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(req.body)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// ADD PHOTO TAGS
exports.addTag = async (req, res) => {
  try {
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { tags: req.body.tags },
      },
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(req.body)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// REMOVE PHOTO TAGS
exports.removeTag = async (req, res) => {
  try {
    const photoWithTag = await photoModel
      .findById(req.params.id)
      .select({ tags: 1, _id: 0 });

    if (!photoWithTag) {
      throw new AppError('No Photo Found with this ID', 404);
    }
    const tag = photoWithTag.tags.find(
      (element) => element.toString() === req.body.tags.toString()
    );

    if (tag) {
      await photoModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { tags: tag },
        },
        {
          runValidators: true,
        }
      );
      res.status(204).json({
        status: 'success',
        data: 'deleted',
      });
    } else {
      throw new AppError('No such Tag Exists', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
