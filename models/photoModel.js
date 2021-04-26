// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const photoSchema = new mongoose.Schema({
  photoId:{type: String, required: true},
  userId: [{ userId: mongoose.Schema.ObjectId }],  //Check?
  cameraId: String,
  dataTaken: {Date, default: Date.now},
  dataUploaded: {Date, default: Date.now},
  location: String,
  comments: [{ userId: mongoose.Schema.ObjectId }],
  favourites: [{ userId: mongoose.Schema.ObjectId }],
  like:[{ userId: mongoose.Schema.ObjectId }],
  views:[{ userId: mongoose.Schema.ObjectId }],
  photoUrls: String,
  //Permissions are separated in API of Flickr
  isPublic: Boolean,
  isFriend: Boolean,
  isFamily: Boolean,
  tags: [{ userId: mongoose.Schema.ObjectId }],
  sizes: String

 /*
  height: {Number, required: true},
  width: {Number, required: true},
  views: Number,
  comments: Number,
  title: String,
  description: String,
  safetyLevel: Number,
  contentType: Number,
  hidden: Number,
  likes: [{ userId: mongoose.Schema.ObjectId, relation: String }],
  albums: [{ albumId: mongoose.Schema.ObjectId }]
*/
  },
);

// CREATE MODEL
const userModel = mongoose.model('photoModel', userSchema);

// EXPORT MODEL
module.exports = photoModel;

//--------------DO API DOCUMENTATION 
/** 
* @api
**/