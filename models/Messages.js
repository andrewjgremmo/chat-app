var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  author: String,
  message: String,
  timestamp: Date
});

mongoose.model('Message', MessageSchema);