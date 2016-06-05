import {
  REGISTER,
  ADD_USER,
  REMOVE_USER
} from '../actions/userActions';

const INITIAL_STATE = { user: undefined, users: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REGISTER:
      return { ...state, user: action.payload.data };
    case ADD_USER:
      return { ...state, users: state.users.concat([action.payload.data]) };
    case REMOVE_USER:
      return { ...state, users: state.users.filter((user) => { user._id != action.payload.data._id })};
    default:
      return state;
  }
}
