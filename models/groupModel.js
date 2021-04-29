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
  users: [
    {
      userId: mongoose.Schema.ObjectId,
      joinDate: {
        type: Date,
        default: Date.now,
      },
      admin: Boolean,
    },
  ], // group members
  startDate: {
    type: Date,
    default: Date.now,
  },
  photos: [mongoose.Schema.ObjectId],
  discussionTopics: [mongoose.Schema.ObjectId],
  pinnedThread: mongoose.Schema.ObjectId,
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
