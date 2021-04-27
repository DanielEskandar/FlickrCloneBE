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
  views: Number,
  urls: [String],
  permissions: {
    public: Boolean,
    friend: Boolean,
    family: Boolean,
  },
  tags: [String],
  taggedUsers: [mongoose.Schema.ObjectId],
  sizes: [
    {
      size: {
        height: Number,
        width: Number,
      },
    },
  ],
  title: String,
  description: String,
  EXIF: String,
  safetyLevel: Number,
  contentType: Number,
  hidden: Boolean,
});

// CREATE MODEL
const photoModel = mongoose.model('photoModel', photoSchema);

// EXPORT MODEL
module.exports = photoModel;
