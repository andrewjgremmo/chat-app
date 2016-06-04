var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  author: String,
  message: String,
  timestamp: Date,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

mongoose.model('Message', MessageSchema);