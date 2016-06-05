import {
  REGISTER
} from '../actions/userActions';

const INITIAL_STATE = { user: undefined };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REGISTER:
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
}
