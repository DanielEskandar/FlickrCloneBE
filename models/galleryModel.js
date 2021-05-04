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
  primaryPhotoId: { type: mongoose.Schema.ObjectId, ref: 'photoModel' },
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
        photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'photoModel' },
        remark: String,
      },
    ],
    validate: function () {
      // if primary photo and photos array are empty ->
      if (this.photos.length === 0 && this.primaryPhotoId === undefined)
        return true;

      // if not empty -> check if photos contains primary photo
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
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'commentModel' }],
});

// CREATE MODEL
const galleryModel = mongoose.model('galleryModel', gallerySchema);

// EXPORT MODEL
module.exports = galleryModel;
