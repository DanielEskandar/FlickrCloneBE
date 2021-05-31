// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');
const userModel = require('../models/userModel.js');
const galleryModel = require('../models/galleryModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// UPLOAD PHOTO
exports.uploadPhoto = async (req, res) => {
  try {
    let ExifString = '';
    let DateCapture = '';
    let metadataStream;

    if (req.file.Exif) {
      metadataStream = {
        cameraMake: '',
        cameraModel: '',
        lensName: '',
        fNumber: '',
        focalLength: '',
        exposureTime: '',
        flash: '',
        iso: '',
      };

      DateCapture = new Date(req.file.Exif.exif.DateTimeOriginal);

      if (req.file.Exif.image) {
        if (req.file.Exif.image.Make)
          metadataStream.cameraMake = req.file.Exif.image.Make;

        if (req.file.Exif.image.Model)
          metadataStream.cameraModel = req.file.Exif.image.Model;
      }

      if (req.file.Exif.exif) {
        if (req.file.Exif.exif.MakerNote) req.file.Exif.exif.MakerNote = '';

        ExifString = JSON.stringify(req.file.Exif.exif);

        if (req.file.Exif.exif.ExposureTime)
          metadataStream.exposureTime = req.file.Exif.exif.ExposureTime;

        if (req.file.Exif.exif.FNumber)
          metadataStream.fNumber = req.file.Exif.exif.FNumber;

        if (req.file.Exif.exif.FocalLength)
          metadataStream.focalLength = req.file.Exif.exif.FocalLength;

        if (req.file.Exif.exif.Flash)
          metadataStream.flash = req.file.Exif.exif.Flash;

        if (req.file.Exif.exif.ISO) metadataStream.iso = req.file.Exif.exif.ISO;

        if (req.file.Exif.exif.LensModel)
          metadataStream.lensName = req.file.Exif.exif.LensModel;
      }
    }

    const photoNew = {
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      metadata: metadataStream,
      EXIF: ExifString,
      license: req.body.license,
      safetyLevel: req.body.safetyLevel,
      contentType: req.body.contentType,
      dateTaken: DateCapture,
      sizes: {
        canDownload: 0,
        size: {
          original: {
            height: req.file.data[0].size.h,
            width: req.file.data[0].size.w,
            source: req.file.data[0].source,
            url: req.file.data[0].source,
          },
          large: {
            height: req.file.data[1].size.h,
            width: req.file.data[1].size.w,
            source: req.file.data[1].source,
            url: req.file.data[1].source,
          },
          medium800: {
            height: req.file.data[2].size.h,
            width: req.file.data[2].size.w,
            source: req.file.data[2].source,
            url: req.file.data[2].source,
          },
          medium640: {
            height: req.file.data[3].size.h,
            width: req.file.data[3].size.w,
            source: req.file.data[3].source,
            url: req.file.data[3].source,
          },
          medium: {
            height: req.file.data[4].size.h,
            width: req.file.data[4].size.w,
            source: req.file.data[4].source,
            url: req.file.data[4].source,
          },
          small320: {
            height: req.file.data[5].size.h,
            width: req.file.data[5].size.w,
            source: req.file.data[5].source,
            url: req.file.data[5].source,
          },
          small: {
            height: req.file.data[6].size.h,
            width: req.file.data[6].size.w,
            source: req.file.data[6].source,
            url: req.file.data[6].source,
          },
          thumbnail: {
            height: req.file.data[7].size.h,
            width: req.file.data[7].size.w,
            source: req.file.data[7].source,
            url: req.file.data[7].source,
          },
          largeSquare: {
            height: req.file.data[8].size.h,
            width: req.file.data[8].size.w,
            source: req.file.data[8].source,
            url: req.file.data[8].source,
          },
          square: {
            height: req.file.data[9].size.h,
            width: req.file.data[9].size.w,
            source: req.file.data[9].source,
            url: req.file.data[9].source,
          },
        },
      },
    };

    const newPhoto = await photoModel.create(photoNew);

    if (!newPhoto) {
      throw new AppError('Failed to Create New Photo.', 409);
    }

    const userPhotoList = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          $push: { photos: newPhoto._id },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .select('photos');

    const createdPhoto = await photoModel.findById(newPhoto._id);

    res.status(201).json({
      status: 'success',
      data: {
        newPhoto: JSON.parse(JSON.stringify(createdPhoto)),
        userPhotoList: JSON.parse(JSON.stringify(userPhotoList)),
      },
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

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

    if (editedComment.userId.toString() !== req.user.id.toString()) {
      throw new AppError('You are Not Allowed to Edit this Comment', 403);
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
      .select({ comments: 1, _id: 0, userId: 1 });

    if (!photoWithComment) {
      throw new AppError('No Photo Found with this ID', 404);
    }
    const comment = photoWithComment.comments.find(
      (element) => element.toString() === req.params.commentid.toString()
    );

    if (!comment) {
      throw new AppError('No Comment Found with this ID', 404);
    }
    if (photoWithComment.userId.toString() !== req.user.id.toString()) {
      throw new AppError('You are Not Allowed to Delete this Comment', 403);
    }

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
      .select({ tags: 1, _id: 0, userId: 1 });

    if (!photoWithTag) {
      throw new AppError('No Photo Found with this ID', 404);
    }
    const tag = photoWithTag.tags.find(
      (element) => element.toString() === req.body.tags.toString()
    );

    if (!tag) {
      throw new AppError('No such Tag Exists', 404);
    }
    if (photoWithTag.userId.toString() !== req.user.id.toString()) {
      throw new AppError('You are Not Allowed to Remove this Tag', 403);
    }

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
        $set: req.body,
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
      .sort('createdAt')
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

// GET TAGGED PEOPLE
exports.getTagged = async (req, res) => {
  try {
    if ((await photoModel.findById(req.params.id)) === null) {
      throw new AppError('No photo Found with this ID', 404);
    }

    const tags = await photoModel
      .findById(req.params.id)
      .select({ _id: 0, peopleTagged: 1 })
      .populate('peopleTagged.userId', 'displayName firstName lastName');

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
      .select({ peopleTagged: 1, _id: 0 })
      .populate('peopleTagged.userId', 'displayName firstName lastName');

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
      throw new AppError('User does not Exist', 404);
    }

    const user = await userModel.findById(req.params.userid);

    const photo = await photoModel.findById(req.params.id);
    //if user already not tagged
    const exists = photo.peopleTagged.find(
      (elem) => elem.userId.toString() === req.params.userid.toString()
    );
    if (!exists) {
      throw new AppError('User not tagged', 409);
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
      .select({ _id: 0, peopleTagged: 1 })
      .populate('peopleTagged.userId', 'displayName firstName lastName');

    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(taggedlist)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
