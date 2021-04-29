// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const discussionSchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  date: {
    type: Date,
    default: Date.now,
  },
  content: String, //added new
  replies: [{ replyId: mongoose.Schema.ObjectId }],
});

// CREATE MODEL
const discussionModel = mongoose.model('discussionModel', discussionSchema);

// EXPORT MODEL
module.exports = discussionModel;
