module.exports = function(io) {
  var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    Message = mongoose.model('Message');

  router.param('room', function(req, res, next, id) {
    var query = Room.findById(id);

    query.exec(function (err, room){
      if (err) { return next(err); }
      if (!room) { return next(new Error('can\'t find room')); }

      req.room = room;
      return next();
    });
  });

  router.get('/rooms', function(req, res, next) {
    Room.find({private: false})
      .populate('messages')
      .exec(function(err, rooms) {
      if(err){ return next(err); }

      res.json(rooms);
    });
  });

  router.post('/rooms', function(req, res, next) {
    var room = new Room(req.body);

    room.save(function(err, room){
      if(err){ return next(err); }
      io.emit('action', {
        type: 'ADD_ROOM',
        payload: {
          data: room
        }
      });
      res.json(room);
    });
  });

  router.post('/rooms/:room/messages', function(req, res, next) {
    var message = new Message(req.body);
    message.room = req.room;

    message.save(function(err, message){
      if(err){ return next(err); }

      req.room.messages.push(message);
      req.room.save(function(err, room) {
        if(err){ return next(err); }
        message.room = req.room._id;

        io.emit('action', {
          type: 'ADD_MESSAGE',
          payload: {
            data: message
          }
        });
        res.json(message);
      });
    });
  });

  return router;
};

