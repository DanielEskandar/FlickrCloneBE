/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

// INCLUDE DEPENDENCIES
const multer = require('multer');
const sharp = require('sharp');
const exif = require('exif-reader');
const cloudinary = require('cloudinary');
const fs = require('fs');

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

// MULTER CONFIG
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//MULTER UPLOAD FUNC
exports.uploadToFile = upload.single('photo');

// UPLOADED PHOTO PROCESSOR

exports.photoProcessor = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No File is Attached', 409);
    }

    console.log(req.file);

    const image = sharp(req.file.buffer);

    const metadata = await image.metadata();

    let h = [null, null, null, null, null, null, null, null, 150, 75];
    let w = [null, null, null, null, null, null, null, null, 150, 75];
    const sizeArr = [null, 1024, 800, 640, 500, 320, 240, 100, 150, 75];

    if (metadata.height > metadata.width) {
      h = Array.from(sizeArr);
    } else {
      w = Array.from(sizeArr);
    }

    if (metadata.exif) req.file.Exif = exif(metadata.exif);

    req.file.data = [
      {
        label: 'original',
        filename: `photo-0-${req.user.id}-${Date.now()}-o.jpeg`,
        resizeFactor: {
          h: h[0],
          w: w[0],
        },
      },
      {
        label: 'large',
        filename: `photo-1-${req.user.id}-${Date.now()}-b.jpeg`,
        resizeFactor: {
          h: h[1],
          w: w[1],
        },
      },
      {
        label: 'medium800',
        filename: `photo-2-${req.user.id}-${Date.now()}-c.jpeg`,
        resizeFactor: {
          h: h[2],
          w: w[2],
        },
      },
      {
        label: 'medium640',
        filename: `photo-3-${req.user.id}-${Date.now()}-z.jpeg`,
        resizeFactor: {
          h: h[3],
          w: w[3],
        },
      },
      {
        label: 'medium',
        filename: `photo-4-${req.user.id}-${Date.now()}.jpeg`,
        resizeFactor: {
          h: h[4],
          w: w[4],
        },
      },
      {
        label: 'small320',
        filename: `photo-5-${req.user.id}-${Date.now()}-n.jpeg`,
        resizeFactor: {
          h: h[5],
          w: w[5],
        },
      },
      {
        label: 'small',
        filename: `photo-6-${req.user.id}-${Date.now()}-m.jpeg`,
        resizeFactor: {
          h: h[6],
          w: w[6],
        },
      },
      {
        label: 'thumbnail',
        filename: `photo-7-${req.user.id}-${Date.now()}-t.jpeg`,
        resizeFactor: {
          h: h[7],
          w: w[7],
        },
      },
      {
        label: 'largeSquare',
        filename: `photo-8-${req.user.id}-${Date.now()}-q.jpeg`,
        resizeFactor: {
          h: h[8],
          w: w[8],
        },
      },
      {
        label: 'square',
        filename: `photo-9-${req.user.id}-${Date.now()}-s.jpeg`,
        resizeFactor: {
          h: h[9],
          w: w[9],
        },
      },
    ];

    req.file.uploadPath = './public/img/';

    await Promise.all(
      req.file.data.map(async (sizeItem) => {
        await image
          .resize(sizeItem.resizeFactor.w, sizeItem.resizeFactor.h)
          .withMetadata()
          .toFormat('jpeg')
          .jpeg(
            sizeItem.label === 'original' ? { quality: 30 } : { quality: 80 }
          )
          .toFile(`${req.file.uploadPath}${sizeItem.filename}`)
          .then((info) => {
            sizeItem.size = { w: info.width, h: info.height };
          });
      })
    );
    next();
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CDN UPLOADER
exports.uploadToCloud = async (req, res, next) => {
  for (const sizeItem of req.file.data) {
    try {
      await cloudinary.v2.uploader.upload(
        `./public/img/${sizeItem.filename}`,
        {
          public_id: `${sizeItem.filename.split('.')[0]}`,
          timeout: 600000,
        },
        (error, result) => {
          if (error) {
            throw new AppError(
              'Failed to upload the image to the server.',
              504
            );
          }

          if (result) {
            console.log(result);
            sizeItem.source = result.secure_url;
            fs.unlink(`./public/img/${sizeItem.filename}`, (err) => {
              if (err) console.log(err);
            });
          }
        }
      );
    } catch (err) {
      errorController.sendError(err, req, res);
    }
  }

  next();
};
