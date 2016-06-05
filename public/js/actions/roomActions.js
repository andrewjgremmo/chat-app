import axios from 'axios';

export const ADD_ROOM = 'ADD_ROOM';
export const GET_CURRENT_ROOMS = 'GET_CURRENT_ROOMS';
export const GET_PUBLIC_ROOMS = 'GET_PUBLIC_ROOMS';
export const SELECT_ROOM = 'SELECT_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const JOIN_ROOM = 'JOIN_ROOM';

export function getCurrentRooms(user) {
  const request = axios.get(`/users/${user}/rooms`);

  return {
    type: GET_CURRENT_ROOMS,
    payload: request
  };
}

export function getPublicRooms() {
  const request = axios.get(`/rooms`);

  return {
    type: GET_PUBLIC_ROOMS,
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

export function joinRoom(user, room) {
  const request = axios.post(`/users/${user._id}/rooms`, room);

  return {
    type: JOIN_ROOM,
    payload: request
  };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    payload: room
  };
}
