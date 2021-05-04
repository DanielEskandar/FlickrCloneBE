// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const testimonialSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.ObjectId, required: true },
  about: { type: mongoose.Schema.ObjectId, required: true },
  content: { type: String, trim: true, required: true },
});

// CREATE MODEL
const testimonialModel = mongoose.model('testimonialModel', testimonialSchema);

// EXPORT MODEL
module.exports = testimonialModel;
