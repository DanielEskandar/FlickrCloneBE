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
  comments: [mongoose.Schema.ObjectId],
  favourites: Number,
  views: Number,
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
        height: Number,
        width: Number,
      },
      //    ------------EACH LABEL HAS DIFFERENT HEIGHTS AND WIDTHS, BBOLEAN DONT SEEM FIT
      label: {
        small: Boolean,
        medium: Boolean,
        large: Boolean,
        thumbnail: Boolean,
        largeSquare: Boolean,
        original: Boolean,
      },
      //
    },
  ],
  title: String,
  description: String,
  EXIF: String,
  safetyLevel: Number,
  contentType: Number,
  hidden: Boolean,

  //TO ADD BUT APPROVE FIRST
  rotation: Number,
  license: Number,
});

// CREATE MODEL
const photoModel = mongoose.model('photoModel', photoSchema);

// EXPORT MODEL
module.exports = photoModel;
