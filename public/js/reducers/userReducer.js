import {
  REGISTER
} from '../actions/userActions';

const INITIAL_STATE = { user: undefined };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REGISTER:
      console.log(action.payload.data);
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
}
