var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
});

mongoose.model('User', UserSchema);