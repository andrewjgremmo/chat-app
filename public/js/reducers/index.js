import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  rooms: roomReducer,
  user: userReducer
});

export default rootReducer;