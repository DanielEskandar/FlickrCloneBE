// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: String,
  country: String,
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

// CREATE MODEL
const locationModel = mongoose.model('albumModel', locationSchema);

// EXPORT MODEL
module.exports = locationModel;
