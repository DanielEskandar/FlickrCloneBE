// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  photos: [{ photoId: mongoose.Schema.ObjectId }],
  description: String,
  comments: [{ commentId: mongoose.Schema.ObjectId }],
});

// CREATE MODEL
const albumModel = mongoose.model('albumModel', albumSchema);

// EXPORT MODEL
module.exports = albumModel;
