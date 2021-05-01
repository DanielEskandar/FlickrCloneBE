// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const groupSchema = new mongoose.Schema({
  public: Boolean,
  name: {
    type: String,
<<<<<<< Updated upstream
    required: [true,'A group must have a name'],
    unique: [true,'A group with this name already exists'],
=======
    required: true,
    unique: true,
    maxlength: [20,'Group name should be less than 20 characters']
>>>>>>> Stashed changes
  },
  invitation: Boolean,
  description: {type: String,
  trim: true,
  },
  users: [
    {
      userId: mongoose.Schema.ObjectId,
      joinData: {
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
<<<<<<< Updated upstream
  photos: [{ photoId: mongoose.Schema.ObjectId }],
  discussionTopics: [{ discussionID: mongoose.Schema.ObjectId }],
  pinnedThread: mongoose.Schema.ObjectId,
  ageRestriction: Boolean,
=======
  photos: [mongoose.Schema.ObjectId],
  discussionTopics: {
    type: [mongoose.Schema.ObjectId],
  validate: function(){
    return (this.discussionTopics.includes(this.pinnedThread));  //check
    //'this' works on creation only 
  }
  },
  pinnedThread: {mongoose.Schema.ObjectId,
    required: false,
  },
>>>>>>> Stashed changes
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);

// EXPORT MODEL
module.exports = groupModel;
