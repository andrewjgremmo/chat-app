import {
  GET_ROOMS,
  ADD_ROOM,
  ADD_MESSAGE,
  SELECT_ROOM,
  NEW_USER
} from '../actions/roomActions';

const INITIAL_STATE = { currentRoom: undefined, rooms: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_ROOM:
      return { ...state,
        rooms: state.rooms.concat([action.payload.data]),
        currentRoom: action.payload.data._id
      };
    case ADD_MESSAGE:
      const roomIdx = state.rooms.map((room) => {
        return room._id
      }).indexOf(action.payload.data.room);

      return { ...state, rooms: state.rooms.map((room) => {
          if (room._id != action.payload.data.room) {
            return room;
          } else {
            return { ...room, messages: room.messages.concat([action.payload.data]) };
          }
        })
      };
    case SELECT_ROOM:
      return { ...state,
        currentRoom: action.payload._id
      };
    case GET_ROOMS:
      return { ...state,
        rooms: action.payload.data,
        currentRoom: action.payload.data[0]._id
      };
    case ADD_USER:
      return { ...state, rooms: state.rooms.map((room) => {
          if (action.payload.rooms.indexOf(room._id) > -1) {
            return { ...room, users: room.users.concat([action.payload]) }
          } else {
            return room;
          }
        })
      };
    case REMOVE_USER:
      return { ...state, rooms: state.rooms.map((room) => {
        return { ...room, users: room.users.filter((user) => { user._id != action.payload._id })}
      })}
    default:
      return state;
  }
}
