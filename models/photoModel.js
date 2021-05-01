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
  location: mongoose.Schema.ObjectId,
  comments: [mongoose.Schema.ObjectId],
  favourites: Number,
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
  tags: [String],
  taggedUsers: [mongoose.Schema.ObjectId],
  sizes: [
    {
      size: {
        originalheight: [
          Number,
          'Image dimensions cannot be longer than 2048 pixels at height!',
        ],
        originalwidth: [
          Number,
          'Image dimensions cannot be longer than 2048 pixels at width!',
        ],
      },
      //  Other than original, sizes are fixed
      label: {
        small: Boolean,
        medium: Boolean,
        large: Boolean,
        thumbnail: Boolean,
        largeSquare: Boolean,
        original: Boolean,
      },
    },
  ],
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
  safetyLevel: {
    type: Number,
    minimum: 1,
    maximum: 3,
  },
  contentType: {
    type: String,
    enum: ['Photo', 'Screenshot', 'Other'],
  },
  hidden: Boolean,
  rotation: Number,
  license: Number,

  //SET A MAXMIMUM MEMORY SIZE FOR IMAGE TO PREVENT UPLOAD OF LARGE IMAGES?
});

// CREATE MODEL
const photoModel = mongoose.model('photoModel', photoSchema);

// EXPORT MODEL
module.exports = photoModel;
