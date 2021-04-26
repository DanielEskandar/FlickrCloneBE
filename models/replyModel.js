// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

//create schema
const replySchema = new mongoose.Schema({
user: Schema.Types.ObjectId, //author
Date: { type: Date, default: Date.now }
});


// CREATE MODEL
const replyModel = mongoose.model('replyModel', replySchema);


// EXPORT MODEL
module.exports = replyModel;