// INCLUDE DEPENDENCIES
const multer = require('multer');
const sharp = require('sharp');
const exif = require('exif-reader');

// INCLUDE ERROR CLASS AND ERROR CONTROLLER
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

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

    if (metadata.exif) req.file.Exif = exif(metadata.exif);

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

    await image
      .toFormat('jpeg')
      .withMetadata()
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_original}`)
      .then((info) => {
        req.file.sizeOriginal = { w: info.width, h: info.height };
      });

    await image
      .resize(w[0], h[0])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_large}`)
      .then((info) => {
        req.file.sizeLarge = { w: info.width, h: info.height };
      });

    await image
      .resize(w[1], h[1])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium800}`)
      .then((info) => {
        req.file.sizeMedium800 = { w: info.width, h: info.height };
      });

    await image
      .resize(w[2], h[2])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium640}`)
      .then((info) => {
        req.file.sizeMedium640 = { w: info.width, h: info.height };
      });

    await image
      .resize(w[3], h[3])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_medium}`)
      .then((info) => {
        req.file.sizesizeMedium = { w: info.width, h: info.height };
      });

    await image
      .resize(w[4], h[4])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_small320}`)
      .then((info) => {
        req.file.sizeSmall320 = { w: info.width, h: info.height };
      });

    await image
      .resize(w[5], h[5])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_small}`)
      .then((info) => {
        req.file.sizeSmall = { w: info.width, h: info.height };
      });

    await image
      .resize(w[6], h[6])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_thumbnail}`)
      .then((info) => {
        req.file.sizeThumb = { w: info.width, h: info.height };
      });

    await image
      .resize(w[7], h[7])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_largesq}`)
      .then((info) => {
        req.file.sizeLargeSq = { w: info.width, h: info.height };
      });

    await image
      .resize(w[8], h[8])
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${req.file.uploadPath}${req.file.filename_square}`)
      .then((info) => {
        req.file.sizeSquare = { w: info.width, h: info.height };
      });

    next();
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};
