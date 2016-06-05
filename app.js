var express = require('express');
var socketIo = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/Messages');
require('./models/Rooms');
require('./models/Users');

var app = express();
var io = socketIo();
app.io = io;

var routes = require('./routes/index')(io);

mongoose.connect('mongodb://127.0.0.1/chat');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.json(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});

var users = {

};

io.on("connection", function( socket ) {
  for (var id in users) {
    if (users.hasOwnProperty(id)) {
      socket.emit('action', {
        type: 'ADD_USER',
        payload: {
          data: users[id]
        }
      });
    }
  }

  socket.on("register", function (data) {
    if (data.payload.statusText == 'OK') {
      users[socket.id] = data.payload.data;
      users[socket.id].rooms.forEach(function(room) {
        socket.join(room);
        console.log(socket);
      });

      socket.broadcast.emit('action', {
        type: 'ADD_USER',
        payload: {
          data: users[socket.id]
        }
      });
    }
  });

  socket.on("disconnect", function () {
    socket.broadcast.emit('action', {
      type: 'REMOVE_USER',
      payload: {
        data: users[socket.id]
      }
    });
    delete users[socket.id];
  });
});

module.exports = app;
