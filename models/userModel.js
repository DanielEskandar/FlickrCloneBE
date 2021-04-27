// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const validator = require('validator');

// CREATE SCHEMA
const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    trim: true,
    unique: [true, 'Display name must be unique'],
    required: [true, 'A user must have a display name'],
    validate: [validator.isAlphanumeric, 'Invalid username'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'Email must be unique'],
    validate: [validator.isEmail, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    validate: [validator.isStrongPassword, 'Weak password'],
  },
  userType: {
    type: String,
    required: [true, 'A user must have a user type'],
    enum: {
      values: ['normal', 'pro'],
      message: 'User type is either normal or pro',
    },
  },
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
    validate: [validator.isAlphanumeric, 'Invalid first name'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    validate: [validator.isAlpha, 'Invalid last name'],
  },
  age: {
    type: Number,
    min: 13,
  },
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
      relation: {
        type: String,
        enum: {
          values: ['friend', 'family', 'undtermined'],
          message: 'Relation must be either: friend, family or undetermined',
        },
      },
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
