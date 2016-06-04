import axios from 'axios';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_ROOM = 'ADD_ROOM';
export const GET_ROOMS = 'GET_ROOMS';
export const SELECT_ROOM = 'SELECT_ROOM';


export function getRooms() {
  const request = axios.get(`/rooms`);

  return {
    type: GET_ROOMS,
    payload: request
  };
}

export function addMessage(message) {
  const request = axios.post(`/rooms/${message.room}/messages`);

  return {
    type: ADD_MESSAGE,
    payload: request
  };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    payload: room
  };
}
