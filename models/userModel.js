// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const userSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
  pro: Boolean,
  firstName: String,
  lastName: String,
  age: Number,
  aboutMe: String,
  joinDate: {
    type: Date,
    default: Date.now,
  },
  showcase: [mongoose.Schema.ObjectId],
  favourites: [mongoose.Schema.ObjectId],
  photos: [mongoose.Schema.ObjectId],
  testimonials: [mongoose.Schema.ObjectId],
  albums: [mongoose.Schema.ObjectId],
  gallery: [mongoose.Schema.ObjectId],
  following: [
    {
      userId: mongoose.Schema.ObjectId,
      relation: String,
    },
  ],
  blocked: [mongoose.Schema.ObjectId],
  privacySettings: {
    public: Boolean,
    emailVisiblity: Boolean,
  },
  notificationSettings: {
    push: Boolean,
  },
});

// CREATE MODEL
const userModel = mongoose.model('userModel', userSchema);

// EXPORT MODEL
module.exports = userModel;
