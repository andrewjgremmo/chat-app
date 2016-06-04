var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  name: String,
  private: Boolean,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

mongoose.model('Room', RoomSchema);