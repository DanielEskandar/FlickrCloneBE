// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// CREATE SCHEMA
const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    trim: true,
    unique: [true, 'Display name must be unique'],
    required: [true, 'A user must have a display name'],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'A user must have an email'],
    unique: [true, 'Email must be unique'],
    validate: [validator.isEmail, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    validate: [validator.isStrongPassword, 'Weak password'],
  },
  pro: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'A user must have a first name'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'A user must have a last name'],
  },
  occupation: { type: String, trim: true },
  hometown: { type: String, trim: true },
  currentCity: { type: String, trim: true },
  country: { type: String, trim: true },
  age: {
    type: Number,
    required: [true, 'A user must have an age'],
    min: [13, 'Minimum age is 13'],
  },
  aboutMe: { type: String, trim: true },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  limits: {
    photos: {
      maxdisplaypx: { type: Number, default: 1024 },
      maxupload: { type: Number, default: 15728640 },
    },
    videos: {
      maxduration: { type: Number, default: 90 },
      maxupload: { type: Number, default: 15728640 },
    },
  },
  showcase: [mongoose.Schema.ObjectId],
  favourites: [mongoose.Schema.ObjectId],
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'photoModel' }],
  testimonials: [mongoose.Schema.ObjectId],
  albums: [mongoose.Schema.ObjectId],
  gallery: [mongoose.Schema.ObjectId],
  following: [
    {
      user: mongoose.Schema.ObjectId,
      relation: {
        type: String,
        enum: {
          values: ['friend', 'family', 'undetermined'],
          message: 'Relation must be either: friend, family or undetermined',
        },
      },
      followDate: { type: Date, default: Date.now },
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
      infoVisibility: {
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// encrypt password
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// update changedPasswordAt property
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// check if the password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compareSync(candidatePassword, userPassword);
};

// check if password was changed afer a token timestamp
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means the password was not changed
  return false;
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 1 * 60 * 1000;

  return resetToken;
};

// CREATE MODEL
const userModel = mongoose.model('userModel', userSchema);

// EXPORT MODEL
module.exports = userModel;
