// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const gallerySchema = new mongoose.Schema({
  galleryName: {
    type: String,
    required: [true, 'A gallery must have a name'],
    minlength: 1,
    trim: true,
  },
  primaryPhotoId: mongoose.Schema.ObjectId,
  viewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  photos: {
    type: [
      {
        photoId: mongoose.Schema.ObjectId,
        remark: String,
      },
    ],
    validate: function () {
      const id = this.photos.find(
        (element) =>
          element.photoId.toString() === this.primaryPhotoId.toString()
      );
      return this.photos.length <= 500 && id !== undefined;
    },
  },
  description: {
    type: String,
    trim: true,
  },
  comments: [mongoose.Schema.ObjectId],
});

// CREATE MODEL
const galleryModel = mongoose.model('galleryModel', gallerySchema);

// EXPORT MODEL
module.exports = galleryModel;
