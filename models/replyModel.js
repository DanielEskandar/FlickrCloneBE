// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const replySchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId, // author
  Date: {
    type: Date,
    default: Date.now,
  },
  body: String,
});

// CREATE MODEL
const replyModel = mongoose.model('replyModel', replySchema);

// EXPORT MODEL
module.exports = replyModel;
