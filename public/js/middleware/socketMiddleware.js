import {
  REGISTER
} from '../actions/userActions';

export default socket => store => next => action => {
  if (action.type == REGISTER) {
    socket.emit('register', action);
  }

  return next(action);
}