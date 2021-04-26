// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const groupSchema = new mongoose.Schema({
  public: Boolean,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  invitation: Boolean,
  description: String,
  users: [{ userId: mongoose.Schema.ObjectId }], // group members
  admin: mongoose.Schema.ObjectId,
  startDate: {
    type: Date,
    default: Date.now,
  },
  photos: [{ photoId: mongoose.Schema.ObjectId }],
  discussionTopics: [{ discussionID: mongoose.Schema.ObjectId }],
  pinnedThread: mongoose.Schema.ObjectId,
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
