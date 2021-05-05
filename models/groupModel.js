// INCLUDE DEPENDENCIES
const { json } = require('body-parser');
const mongoose = require('mongoose');

// CREATE SCHEMA
const groupSchema = new mongoose.Schema({
  public: { type: Boolean, default: false },
  name: {
    type: String,
    required: [true, 'A group must have a name'],
    unique: [true, 'A group with this name already exists'],
    maxlength: [20, 'Group name should be less than 20 characters'],
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
  ], // group members
  startDate: {
    type: Date,
    default: Date.now(),
  },
  photos: [mongoose.Schema.ObjectId],
  discussionTopics: {
    type: [mongoose.Schema.ObjectId],
    /* validate: function () {
      //if pinnedThread exists, must be in discussionTopics array
      if (
        this.discussionTopics.length === 0 &&
        this.pinnedThread.ObjectId === undefined
      )
        return true;
    },*/
  },
  pinnedThread: {
    type: mongoose.Schema.ObjectId,
  },
  ageRestriction: { type: Boolean, default: false },
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
