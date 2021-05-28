// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// UPLOAD PHOTO
exports.uploadPhoto = async (req, res) => {
  try {
    let ExifString;
    let DateCapture;
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
    res.status(201).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(newPhoto)),
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
