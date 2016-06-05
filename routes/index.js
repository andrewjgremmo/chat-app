module.exports = function(io) {
  var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    Message = mongoose.model('Message'),
    User = mongoose.model('User');

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
    Room.find({private: false}, function(err, rooms) {
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

        io.in(message.room).emit('action', {
          type: 'ADD_MESSAGE',
          payload: {
            data: message
          }
        });
        res.json(message);
      });
    });
  });

  router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function (err, user) {
      if (err) { return next(err); }
      if (!user) { return next(new Error('can\'t find user')); }

      req.user = user;
      return next();
    });
  });

  router.post('/users', function(req, res, next) {
    var user = User.findOne({'username': req.body.username}, function(err, user) {
      if (!user) {
        user = new User(req.body);
        var generalRoom = Room.findOne({'name': 'General'}, function(err, room) {
          if (generalRoom) {
            user.rooms.push(generalRoom._id);
          }

          user.save(function(err, user) {
            if (err) { return next(err); }
            res.json(user);
          });
        });
      } else {
        res.json(user);
      }
    });
  });

  router.get('/users/:user/rooms', function(req, res, next) {
    req.user.populate({path: 'rooms', populate: { path: 'messages' } }, function(err, user) {
      res.json(user.rooms);
    });
  });

  router.post('/users/:user/rooms', function(req, res, next) {
    req.user.rooms.push(req.body.room);
    req.user.save(function(err, user) {
      if(err){ return next(err); }

      io.in(req.body.room).emit('action', {
        type: 'ADD_USER_ROOM',
        payload: {
          data: user
        }
      });

      res.json(user);
    });
  });

  router.delete('/users/:user/rooms/:room', function(req, res, next) {
    req.user.rooms = req.user.rooms.filter(function(room) {
      return room.toString() != req.room._id.toString();
    });

    req.user.save(function(err, user) {
      if(err){ return next(err); }

      io.in(req.room._id).emit('action', {
        type: 'REMOVE_USER_ROOM',
        payload: {
          data: user
        }
      });
      res.json(user);
    });
  });

  return router;
};

