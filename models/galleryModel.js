// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const gallerySchema = new mongoose.Schema({
  galleryName: {
    type: String,
    required: [true, 'A must have a name'],
    minlength: 1,
    trim: true,
  }, // trim
  primaryPhotoId: mongoose.Schema.ObjectId,
  viewCount: {
    type: Number,
    default: 0,
  },
  photos: [
    {
      type: {
        photoId: mongoose.Schema.ObjectId,
        remark: String,
      },
      validate: function () {
        return (
          this.photos.length <= 500 && this.photos.includes(this.primaryPhotoId)
        );
      },
      // validate array length : 500 , primary photo
    },
  ],
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
