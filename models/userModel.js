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
  showcase: [{ photoId: mongoose.Schema.ObjectId }],
  favourites: [{ photoId: mongoose.Schema.ObjectId }],
  photos: [{ photoId: mongoose.Schema.ObjectId }],
  testimonials: [{ testimonialId: mongoose.Schema.ObjectId }],
  albums: [{ albumId: mongoose.Schema.ObjectId }],
  gallery: [{ galleryId: mongoose.Schema.ObjectId }],
  following: [
    {
      userId: mongoose.Schema.ObjectId,
      relation: String,
    },
  ],
  blocked: [{ userId: mongoose.Schema.ObjectId }],
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
