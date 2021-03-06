// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const discussionSchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
  replies: { type: [mongoose.Schema.ObjectId], ref: 'replyModel' },
});

// CREATE MODEL
const discussionModel = mongoose.model('discussionModel', discussionSchema);

// EXPORT MODEL
module.exports = discussionModel;
