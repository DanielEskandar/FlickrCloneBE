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
    trim: true,
    required: [true, 'A user must have a user type'],
    enum: {
      values: ['free', 'pro'],
      message: 'User type is either free or pro',
    },
    default: 'free',
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'A user must have a first name'],
    validate: [validator.isAlphanumeric, 'Invalid first name'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'A user must have a last name'],
    validate: [validator.isAlpha, 'Invalid last name'],
  },
  age: {
    type: Number,
    required: [true, 'A user must have an age'],
    min: 13,
  },
  aboutMe: { type: String, trim: true },
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
    global: {
      downloadPerm: { type: Number, default: 1 }, //0 : No default set, 1 : Public, 2 : Contacts only, 3 : Friends and Family only, 4 : Friends only, 5 : Family only, 6 : Private
      largestImgSize: { type: Number, default: 0 }, //0: Best display size, Any Other number: Actual Siza Val (1024, 1600, 2048 for free | 3K 4K 5K 6K for pro)
      allowShare: { type: Number, default: 1 },
      allowTag: { type: Number, default: 1 },
      allowGalleryAdd: { type: Boolean, default: 1 },
      hideEXIF: { type: Boolean, default: 0 },
      hidePhotoSearch: { type: Boolean, default: 0 },
      hideProfileSearch: { type: Boolean, default: 0 },
      infoVisiblity: {
        email: { type: Number, default: 2 },
        name: { type: Number, default: 1 },
        currentCity: { type: Number, default: 1 },
      },
    },
    defaults: {
      perms: {
        see: { type: Number, default: 1 },
        comment: { type: Number, default: 1 },
        addNotes: { type: Number, default: 2 },
      },
      license: { type: Number, default: 0 }, //0: None (All rights reserved)
      mapVisible: { type: Number, default: 1 },
      importEXIF: { type: Boolean, default: 1 },
      safetyLevel: { type: Number, default: 1 }, //( 1 for Safe, 2 for Moderate, and 3 for Restricted.)
      contentType: { type: Number, default: 1 }, //(1 for Photo, 2 for Screenshot, and 3 for Other)
    },
    filters: {
      search: {
        safeSearch: { type: Boolean, default: 1 },
        content: { type: Number, default: 1 }, //(1 for Photo, 2 for Screenshot, and 3 for Other),
      },
    },
  },
  notificationSettings: {
    notifMail: {
      invites: { type: Boolean, default: 1 },
      contact: { type: Boolean, default: 1 },
      messages: { type: Boolean, default: 1 },
      reminders: { type: Boolean, default: 1 },
    },
    activityMail: {
      you: { type: Boolean, default: 1 },
      contacts: { type: Boolean, default: 1 },
    },
  },
});

// CREATE MODEL
const userModel = mongoose.model('userModel', userSchema);

// EXPORT MODEL
module.exports = userModel;
