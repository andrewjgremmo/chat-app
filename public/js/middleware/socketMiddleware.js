import { REGISTER, UPDATE_USER } from '../actions/userActions';
import { JOIN_ROOM } from '../actions/roomActions';
import differenceBy from 'lodash/differenceBy';

export default socket => store => next => action => {
  if (action.type && action.type == REGISTER) {
    socket.emit('register', action);
  } else if (action.type && action.type == JOIN_ROOM) {
    socket.emit('joinRequest', action.payload.data._id);
  } else if (action.type && action.type == UPDATE_USER) {
    const state = store.getState();

    if (state.user.user && state.user.user._id == action.payload.data._id) {
      const roomsToJoin = differenceBy(action.payload.data.rooms, state.rooms.currentRoomList, '_id');
      roomsToJoin.forEach(function(room) {
        socket.emit('inviteRequest', room);
      });
    }
  }

  return next(action);
}