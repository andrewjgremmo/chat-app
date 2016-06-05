import {
  REGISTER,
  ADD_USER,
  REMOVE_USER,
  UPDATE_USER
} from '../actions/userActions';
import merge from 'lodash/merge';

const INITIAL_STATE = { user: undefined, users: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REGISTER:
      return { ...state, user: action.payload.data };
    case ADD_USER:
      return { ...state, users: merge([action.payload.data], state.users) };
    case REMOVE_USER:
      return { ...state, users: state.users.filter((user) => { user._id != action.payload.data._id })};
    case UPDATE_USER:
      return { ...state, users: state.users.map((user) => {
          if (user._id == action.payload.data._id) {
            return action.payload.data;
          } else {
            return user;
          }
        })
      }
    default:
      return state;
  }
}
