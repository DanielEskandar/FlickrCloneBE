// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
// CREATE SCHEMA
const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: [true, 'An album must have a name'],
    trim: true,
  },
  primaryPhotoId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'An album must have a primary photo'],
  },
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      required: true,
      validate: function () {
        return (
          this.photos.length >= 1 && this.photos.includes(this.primaryPhotoId)
        );
      },
    },
  ], // check min 1 , primary photo
  description: {
    type: String,
    trim: true,
  },
  comments: [mongoose.Schema.ObjectId],
});

// CREATE MODEL
const albumModel = mongoose.model('albumModel', albumSchema);

// EXPORT MODEL
module.exports = albumModel;
