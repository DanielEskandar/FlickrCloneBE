// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'userModel',
    required: [true, 'A photo must have an owner'],
  },
  title: {
    type: String,
    maxlength: [300, 'Title cannot be more than 300 characters long'],
    required: [true, 'A photo must have an title'],
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot be more than 2000 characters long'],
  },
  cameraId: {
    type: mongoose.Schema.ObjectId,
    ref: 'cameraModel',
  },
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
  dateTaken: Date,
  location: mongoose.Schema.ObjectId,
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'commentModel',
    },
  ],
  favourites: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  permissions: {
    public: { type: Boolean, default: 0 },
    friend: { type: Boolean, default: 0 },
    family: { type: Boolean, default: 0 },
    //For comment and addMeta properties
    //0: nobody 1: friends & family 2: contacts 3: everybody
    comment: { type: Number, default: 3 },
    addMeta: { type: Number, default: 0 },
  },
  sizes: {
    canDownload: { type: Boolean, default: 1 },
    size: {
      original: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      large: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      medium800: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      medium640: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      medium: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      small320: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      small: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      thumbnail: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      largeSquare: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
      square: {
        height: Number,
        width: Number,
        source: String,
        url: String,
      },
    },
  },
  EXIF: String,
  safetyLevel: {
    type: Number,
    minimum: 1,
    maximum: 3,
  },
  contentType: {
    type: String,
    enum: {
      values: ['Photo', 'Screenshot', 'Other'],
      message: 'Content type is photo, screenshot or other',
    },
  },
  tags: [String],
  peopleTagged: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: 'userModel' },
      tagDate: { type: Date, default: Date.now },
    },
  ],
  hidden: {
    type: Boolean,
    default: 1,
  },
  license: { type: Number, minimum: 0, maximum: 10 },
});

// CREATE MODEL
const photoModel = mongoose.model('photoModel', photoSchema);

// EXPORT MODEL
module.exports = photoModel;
