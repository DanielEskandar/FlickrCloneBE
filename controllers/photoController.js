// INCLUDE DEPENDENCIES
const multer = require('multer');
const sharp = require('sharp');

// INCLUDE MODELS
const photoModel = require('../models/photoModel.js');
const commentModel = require('../models/commentModel.js');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

// UTILITY AND MIDDLEWARE FUNCTIONS

// MULTER STORAGE
const multerStorage = multer.memoryStorage();

// MULTER FILTER
const multerFilter = (req, file, cb) => {
  // mimetype always starts with image/ then png or jpeg or..
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('You are only allowed to upload image files.', 409), false);
  }
};

// MULTER UPLOAD FUNC
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.photoUpload = upload.single('photo');

// UPLOADED PHOTO PROCESSOR

exports.photoProcessor = (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No File is Attached', 409);
    }

    req.file.filename_original = `photo-${req.user.id}-${Date.now()}-o.jpeg`;
    req.file.filename_large = `photo-${req.user.id}-${Date.now()}-b.jpeg`;
    req.file.filename_medium800 = `photo-${req.user.id}-${Date.now()}-c.jpeg`;
    req.file.filename_medium640 = `photo-${req.user.id}-${Date.now()}-z.jpeg`;
    req.file.filename_medium = `photo-${req.user.id}-${Date.now()}.jpeg`;
    req.file.filename_small320 = `photo-${req.user.id}-${Date.now()}-n.jpeg`;
    req.file.filename_small = `photo-${req.user.id}-${Date.now()}-m.jpeg`;
    req.file.filename_thumbnail = `photo-${req.user.id}-${Date.now()}-t.jpeg`;
    req.file.filename_largesquare = `photo-${req.user.id}-${Date.now()}-q.jpeg`;
    req.file.filename_square = `photo-${req.user.id}-${Date.now()}-s.jpeg`;

    sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_original}`);

    sharp(req.file.buffer)
      .resize(1024, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_large}`);

    sharp(req.file.buffer)
      .resize(800, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_medium800}`);

    sharp(req.file.buffer)
      .resize(640, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_medium640}`);

    sharp(req.file.buffer)
      .resize(500, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_medium}`);

    sharp(req.file.buffer)
      .resize(320, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_small320}`);

    sharp(req.file.buffer)
      .resize(240, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_small}`);

    sharp(req.file.buffer)
      .resize(100, null)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_thumbnail}`);

    sharp(req.file.buffer)
      .resize(150, 150)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_largesquare}`);

    sharp(req.file.buffer)
      .resize(75, 75)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${req.file.filename_square}`);

    next();
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// PUBLIC API IMPLEMENTATIONS

// UPLOAD PHOTO
exports.uploadPhoto = async (req, res) => {
  try {
    console.log('Saved');
    res.status(201).json({
      status: 'success',
      data: 'uploaded',
    });
  } catch (err) {
    console.log('Error in upload');
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
