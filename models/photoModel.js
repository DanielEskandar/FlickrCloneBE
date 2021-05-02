// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const photoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  cameraId: mongoose.Schema.ObjectId,
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
  dateTaken: Date,
  location: mongoose.Schema.ObjectId, //-----HOW IS THE LOCATION AN OBJECT? AND SHOULD WE DO IT LATITUDE AND LONGITUDE LIKE FLICKR
  location: mongoose.Schema.ObjectId,
  comments: [mongoose.Schema.ObjectId],
  favourites: Number,
  views: Number,
  views: {
    type: Number,
    minimum: 0,
  },
  urls: [String],
  permissions: {
    public: Boolean,
    friend: Boolean,
    family: Boolean,
    comment: Number,
    addMeta: Number,
  },
  sizes: [
    {
      size: {
        height: Number,
        width: Number,
        originalheight: [
          Number,
          'Image dimensions cannot be longer than 2048 pixels at height!',
        ],
        originalwidth: [
          Number,
          'Image dimensions cannot be longer than 2048 pixels at width!',
        ],
      },
      //    ------------EACH LABEL HAS DIFFERENT HEIGHTS AND WIDTHS, BBOLEAN DONT SEEM FIT
      //  Other than original, sizes are fixed
      label: {
        small: Boolean,
        medium: Boolean,
        largeSquare: Boolean,
        thumbnail: Boolean,
        original: Boolean,
      },
      //
    },
  ],
  title: String,
  description: String,
  title: {
    type: String,
    maxlength: [
      100,
      'Title cannot be more than 100 characters, yours is {VALUE} long',
    ],
  },
  description: {
    type: String,
    maxlength: [
      1000,
      'Description cannot be more than 2000 characters, yours is {VALUE} long',
    ],
  },
  EXIF: String,
  safetyLevel: Number,
  contentType: Number,
  safetyLevel: {
    type: Number,
    minimum: 1,
    maximum: 3,
  },
  contentType: {
    type: String,
    enum: ['Photo', 'Screenshot', 'Other'],
    message: 'Has to be photo, screenshot, or other!',
  },
  hidden: Boolean,

  //TO ADD BUT APPROVE FIRST
  rotation: Number,
  license: Number,
});
//SET A MAXMIMUM MEMORY SIZE FOR IMAGE TO PREVENT UPLOAD OF LARGE IMAGES?

// CREATE MODEL
const photoModel = mongoose.model('photoModel', photoSchema);

// EXPORT MODEL
module.exports = photoModel;
