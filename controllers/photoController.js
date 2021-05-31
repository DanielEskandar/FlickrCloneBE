// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');
const galleryModel = require('../models/galleryModel.js');
const locationModel = require('../models/locationModel.js');

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

    req.body.tags.forEach((element) => {
      if (element.includes(' ')) {
        throw new AppError('Cannot Set Tag With Spaces', 409);
      }
    });

    await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { tags: req.body.tags },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const photoTags = await photoModel
      .findById(req.params.id)
      .select({ tags: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: { updatedTags: JSON.parse(JSON.stringify(photoTags.tags)) },
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

    if (req.body.tags.includes(' ')) {
      throw new AppError('Cannot Set Tag With Spaces', 409);
    }

    await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { tags: req.body.tags },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const photoTags = await photoModel
      .findById(req.params.id)
      .select({ tags: 1, _id: 0 });

    res.status(200).json({
      status: 'success',
      data: { updatedTags: JSON.parse(JSON.stringify(photoTags.tags)) },
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
      const updatedPhoto = await photoModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { tags: tag },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          updatedTags: JSON.parse(JSON.stringify(updatedPhoto.tags)),
        },
      });
    } else {
      throw new AppError('No such Tag Exists', 404);
    }
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// EDIT PHOTO INFORMATION
exports.editPhotoInformation = async (req, res) => {
  try {
    // check if photo id exist or not
    const photo = await photoModel.findById(req.params.id);
    if (!photo) {
      throw new AppError('No Photo Found with This ID', 404);
    }
    // auth
    if (photo.userId.toString() !== req.user.id.toString())
      throw new AppError(
        'Permission Denied. You are not allowed to do this action',
        403
      );
    // Update details in Photo Object
    const updatedPhoto = await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          dateUploaded: req.body.dateUploaded,
          dateTaken: req.body.dateTaken,
          permissions: req.body.permissions,
          license: req.body.license,
          safetyLevel: req.body.safetyLevel,
          contentType: req.body.contentType,
        },
      },
      {
        new: true,
        runValidators: false,
      }
    );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(
        JSON.stringify({
          _id: updatedPhoto._id,
          title: updatedPhoto.title,
          description: updatedPhoto.description,
          tags: updatedPhoto.tags,
          dateUploaded: updatedPhoto.dateUploaded,
          dateTaken: updatedPhoto.dateTaken,
          permissions: updatedPhoto.permissions,
          license: updatedPhoto.license,
          safetyLevel: updatedPhoto.safetyLevel,
          contentType: updatedPhoto.contentType,
        })
      ),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.getGalleriesforPhoto = async (req, res) => {
  try {
    // No auth
    const photo = await photoModel.findById(req.params.id);
    if (!photo) {
      throw new AppError('No Photo Found with This ID', 404);
    }

    // pagination
    const page = req.body.page || 1;
    const perPage = req.body.per_page || 100;
    const skip = (page - 1) * perPage;

    if (req.body.page) {
      //  if number of skipped pages > number of documents -> this page not found
      const galleriesNum = await galleryModel
        .find({ 'photos.photoId': req.params.id })
        .countDocuments();
      if (galleriesNum < skip)
        throw new AppError('This page does not exist', 404);
    }
    const galleries = await galleryModel
      .find({ 'photos.photoId': req.params.id })
      .select({ _id: 1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: 'success',
      data: {
        galleries: JSON.parse(JSON.stringify(galleries.map(({ _id }) => _id))),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// GET LOCATION
exports.getLocation = async (req, res) => {
  try {
    const photo = await photoModel
      .findById(req.params.id)
      .select({
        _id: 0,
        location: 1,
      })
      .populate([
        {
          path: 'location',
          model: 'locationModel',
          select: 'coordinates.latitude coordinates.longitude',
          select: { _id: 0, __v: 0 },
        },
      ]);

    if (!photo) {
      throw new AppError('No Photo Found with this ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(photo)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// SET LOCATION
exports.setLocation = async (req, res) => {
  try {
    const photo = await photoModel.findById(req.params.id);
    if (!photo) {
      throw new AppError('No Photo Found with This ID', 404);
    }

    const location = await locationModel.create(req.body); //create new location instance

    const updated = await photoModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: { location: location },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select({
        _id: 0,
        location: 1,
      })
      .populate([
        {
          path: 'location',
          model: 'locationModel',
          select: 'coordinates.latitude coordinates.longitude',
          select: { _id: 0, __v: 0 },
        },
      ]);

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(updated)),
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

// DELETE LOCATION
exports.deleteLocation = async (req, res) => {
  try {
    //photo validation
    if (!(await photoModel.findById(req.params.id))) {
      throw new AppError('No Photo Found with this ID', 404);
    }
    const check = await photoModel.findById(req.params.id);
    if (check.location == null) {
      throw new AppError('Photo Already doesnt have a location', 404);
    }
    const photo = await photoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { location: null },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(photo)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
