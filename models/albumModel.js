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
    ref: 'photoModel',
    required: [true, 'An album must have a primary photo'],
  },
  photos: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'photoModel' }],
    required: [true, 'An album must have at least 1 photo'],
    validate: function () {
      const id = this.photos.find(
        (element) => element.toString() === this.primaryPhotoId.toString()
      );
      return this.photos.length >= 1 && id !== undefined;
    },
  },
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
