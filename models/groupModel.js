// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const groupSchema = new mongoose.Schema({
  public: Boolean,
  name: {
    type: String,
    required: [true, 'A group must have a name'],
    unique: [true, 'A group with this name already exists'],
    maxlength: [20, 'Group name should be less than 20 characters'],
  },
  invitation: Boolean,
  description: { type: String, trim: true },
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
  discussionTopics: {
    type: [mongoose.Schema.ObjectId],
    validate: function () {
      return this.discussionTopics.includes(this.pinnedThread);
    },
  },
  pinnedThread: {
    type: mongoose.Schema.ObjectId,
  },
  ageRestriction: Boolean,
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
