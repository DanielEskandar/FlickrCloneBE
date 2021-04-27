// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const photoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  cameraId: mongoose.Schema.ObjectId,
  dataUploaded: { Date, default: Date.now },
  dataTaken: { Date },
  location: mongoose.Schema.ObjectId,
  comments: [{ comment: mongoose.Schema.ObjectId }],
  favourites: Number,
  views: Number,
  photoUrls: [{ URL: String }],
  permissions: {
    isPublic: Boolean,
    isFriend: Boolean,
    isFamily: Boolean,
  },
  tags: [{ tag: String }],
  taggedUsers: [{ userId: mongoose.Schema.ObjectId }],
  sizes: [{ size: { height: Number, width: Number } }],
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
