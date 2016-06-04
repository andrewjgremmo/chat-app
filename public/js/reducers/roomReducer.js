import {
  GET_ROOMS,
  ADD_ROOM,
  SELECT_ROOM
} from '../actions/roomActions';

const INITIAL_STATE = { currentRoom: undefined, rooms: [], messages: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_ROOM:
      return { ...state,
        rooms: state.rooms.concat([action.payload.data]),
        currentRoom: action.payload.data
      };
    case SELECT_ROOM:
      return { ...state, currentRoom: action.payload };
    case GET_ROOMS:
      return { ...state,
        rooms: action.payload.data,
        currentRoom: action.payload.data[0]
      };
    default:
      return state;
  }
}
