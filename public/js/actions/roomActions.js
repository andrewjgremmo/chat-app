import axios from 'axios';

export const ADD_ROOM = 'ADD_ROOM';
export const GET_ROOMS = 'GET_ROOMS';
export const SELECT_ROOM = 'SELECT_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NEW_USER = 'NEW_USER';

export function getRooms() {
  const request = axios.get(`/rooms`);

  return {
    type: GET_ROOMS,
    payload: request
  };
}

export function sendMessage(message) {
  const request = axios.post(`/rooms/${message.room}/messages`, message);

  return {
    type: SEND_MESSAGE,
    payload: request
  };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    payload: room
  };
}
