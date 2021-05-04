// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, required: true },
  receiver: { type: mongoose.Schema.ObjectId, required: true },
  subject: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  reply: mongoose.Schema.ObjectId,
});

// CREATE MODEL
const messageModel = mongoose.model('messageModel', messageSchema);

// EXPORT MODEL
module.exports = messageModel;
