module.exports = function(io) {
  var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    Message = mongoose.model('Message');

  router.post('/rooms', function(req, res, next) {
    var room = new Room(req.body);

    room.save(function(err, room){
      if(err){ return next(err); }

      res.json(room);
    });
  });

  router.post('/messages', function(req, res, next) {
    var message = new Message(req.body);

    message.save(function(err, room){
      if(err){ return next(err); }

      res.json(message);
    });
  });

  return router;
};

