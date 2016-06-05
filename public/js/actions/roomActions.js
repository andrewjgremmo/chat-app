import axios from 'axios';

export const ADD_ROOM = 'ADD_ROOM';
export const GET_ROOMS = 'GET_ROOMS';
export const GET_PUBLIC_ROOM_LIST = 'GET_PUBLIC_ROOM_LIST';
export const SELECT_ROOM = 'SELECT_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export function getRooms(user) {
  const request = axios.get(`/users/${user}/rooms`);

  return {
    type: GET_ROOMS,
    payload: request
  };
}

export function getPublicRoomList() {
  const request = axios.get(`/rooms`);

  return {
    type: GET_PUBLIC_ROOM_LIST,
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
