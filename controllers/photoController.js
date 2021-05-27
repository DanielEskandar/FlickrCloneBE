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

exports.photoProcessor = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No File is Attached', 409);
    }

    const image = sharp(req.file.buffer);

    const metadata = await image.metadata();

    let h = [null, null, null, null, null, null, null, 150, 75];
    let w = [null, null, null, null, null, null, null, 150, 75];
    const sizeArr = [1024, 800, 640, 500, 320, 240, 100, 150, 75];

    if (metadata.height > metadata.width) {
      h = Array.from(sizeArr);
    } else {
      w = Array.from(sizeArr);
    }

    req.file.uploadPath = './public/img/';

    req.file.filename_original = `photo-0-${req.user.id}-${Date.now()}-o.jpeg`;
    req.file.filename_large = `photo-1-${req.user.id}-${Date.now()}-b.jpeg`;
    req.file.filename_medium800 = `photo-2-${req.user.id}-${Date.now()}-c.jpeg`;
    req.file.filename_medium640 = `photo-3-${req.user.id}-${Date.now()}-z.jpeg`;
    req.file.filename_medium = `photo-4-${req.user.id}-${Date.now()}.jpeg`;
    req.file.filename_small320 = `photo-5-${req.user.id}-${Date.now()}-n.jpeg`;
    req.file.filename_small = `photo-6-${req.user.id}-${Date.now()}-m.jpeg`;
    req.file.filename_thumbnail = `photo-7-${req.user.id}-${Date.now()}-t.jpeg`;
    req.file.filename_largesq = `photo-8-${req.user.id}-${Date.now()}-q.jpeg`;
    req.file.filename_square = `photo-9-${req.user.id}-${Date.now()}-s.jpeg`;

    image
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_original}`);

    image
      .resize(w[0], h[0])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_large}`);

    image
      .resize(w[1], h[1])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium800}`);

    image
      .resize(w[2], h[2])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium640}`);

    image
      .resize(w[3], h[3])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium}`);

    image
      .resize(w[4], h[4])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_small320}`);

    image
      .resize(w[5], h[5])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_small}`);

    image
      .resize(w[6], h[6])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_thumbnail}`);

    image
      .resize(w[7], h[7])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_largesq}`);

    image
      .resize(w[8], h[8])
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_square}`);

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
