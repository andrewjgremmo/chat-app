import {
  GET_CURRENT_ROOMS,
  GET_PUBLIC_ROOMS,
  ADD_ROOM,
  ADD_MESSAGE,
  SELECT_ROOM,
  JOIN_ROOM,
} from '../actions/roomActions';

const INITIAL_STATE = { currentRoom: undefined, currentRoomList: [], publicRoomList: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_ROOM:
      return { ...state,
        publicRoomList: state.currentRoomList.concat([action.payload.data])
      }
    case ADD_MESSAGE:
      const roomIdx = state.currentRoomList.map((room) => {
        return room._id
      }).indexOf(action.payload.data.room);

      return { ...state, currentRoomList: state.currentRoomList.map((room) => {
          if (room._id != action.payload.data.room) {
            return room;
          } else {
            return { ...room, messages: room.messages.concat([action.payload.data]) };
          }
        })
      };
    case JOIN_ROOM:
      return { ...state,
        currentRoomList: state.currentRoomList.concat([action.payload.data]),
        currentRoom: action.payload.data._id
      }
    case SELECT_ROOM:
      return { ...state,
        currentRoom: action.payload._id
      };
    case GET_CURRENT_ROOMS:
      return { ...state,
        currentRoomList: action.payload.data,
        currentRoom: action.payload.data[0]._id
      };
    case GET_PUBLIC_ROOMS:
      return { ...state,
        publicRoomList: action.payload.data
      };
    default:
      return state;
  }
}
