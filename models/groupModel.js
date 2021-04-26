// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

//create schema
const groupSchema = new mongoose.Schema({
name: {type:String, required: true, unique: true},
groupType: String, //public or private
invitation: Boolean,
description: String,
users: [{ userId: mongoose.Schema.ObjectId }], //members
admin: Schema.Types.ObjectId,
startDate: { type: Date, default: Date.now },
photos: [{ photoId: mongoose.Schema.ObjectId }],
discussionTopics: [{discussionID: mongoose.Schema.ObjectId}],
pinned: Schema.Types.ObjectId
});

// CREATE MODEL
const groupModel = mongoose.model('groupModel', groupSchema);


// EXPORT MODEL
module.exports = groupModel;