// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const commentSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.ObjectId , required:true },
    body:{ type:String, required: true},
    date: { type: Date, default: Date.now }
});

// CREATE MODEL
const commentModel = mongoose.model('commentModel', commentSchema);

// EXPORT MODEL
module.exports = commentModel;
