import { REGISTER } from '../actions/userActions';
import { JOIN_ROOM, INVITE_USER } from '../actions/roomActions';

export default socket => store => next => action => {
  if (action.type && action.type == REGISTER) {
    socket.emit('register', action);
  } else if (action.type && action.type == JOIN_ROOM) {
    socket.emit('joinRequest', action.payload.data._id);
  } else if (action.type && action.type == INVITE_USER) {
    socket.emit('inviteRequest', action.payload.data);
  }

  return next(action);
}