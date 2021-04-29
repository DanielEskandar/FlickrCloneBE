// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const gallerySchema = new mongoose.Schema({
  galleryName: {
    type: String,
    required: true,
  },
  primaryPhotoId : String,
  viewCount: Number,
  photos: [
    {
      photoId: mongoose.Schema.ObjectId,
      remark: String
    },
  ],
  description: String,
  comments: [mongoose.Schema.ObjectId],
});

// CREATE MODEL
const galleryModel = mongoose.model('galleryModel', gallerySchema);

// EXPORT MODEL
module.exports = galleryModel;
