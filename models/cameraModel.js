// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const cameraSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  Model: String,
});

// CREATE MODEL
const cameraModel = mongoose.model('albumModel', cameraSchema);

// EXPORT MODEL
module.exports = cameraModel;
