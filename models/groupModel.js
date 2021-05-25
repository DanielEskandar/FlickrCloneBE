// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const groupSchema = new mongoose.Schema({
  public: { type: Boolean, default: false },
  name: {
    type: String,
    required: [true, 'A group must have a name'],
  },
  invitation: { type: Boolean, default: false },
  description: { type: String, trim: true },
  users: [
    {
      userId: mongoose.Schema.ObjectId,
      joinDate: {
        type: Date,
        default: Date.now(),
      },
      admin: Boolean,
    },
  ],
  startDate: {
    type: Date,
    default: Date.now(),
  },
  photos: [mongoose.Schema.ObjectId],
  discussionTopics: [mongoose.Schema.ObjectId],
  pinnedThread: mongoose.Schema.ObjectId,
  ageRestriction: { type: Boolean, default: false },
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
