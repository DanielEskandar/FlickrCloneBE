// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const gallerySchema = new mongoose.Schema({
  galleryName: {
    type: String,
    required: true,
  },
  primaryPhotoId : String,
  photosCount : {
    type: Number,
     max: 500},
  videoCount : Number,
  photos: [
    {
      photoId: mongoose.Schema.ObjectId,
      remark: mongoose.Schema.ObjectId,
    },
  ],
  description: String,
  comments: [{ commentId: mongoose.Schema.ObjectId }],
});

// CREATE MODEL
const galleryModel = mongoose.model('galleryModel', gallerySchema);

// EXPORT MODEL
module.exports = galleryModel;
