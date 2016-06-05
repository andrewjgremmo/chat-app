import { REGISTER } from '../actions/userActions';
import { JOIN_ROOM } from '../actions/roomActions';

export default socket => store => next => action => {
  if (action.type && action.type == REGISTER) {
    socket.emit('register', action);
  } else if (action.type && action.type == JOIN_ROOM) {
    console.log('joining room');
    socket.emit('joinRequest', action.payload.data._id);
  }

  return next(action);
}