import axios from 'axios';

export const REGISTER = 'REGISTER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function register(username) {
  const request = axios.post(`/users`, {
    username: username
  });

  return {
    type: REGISTER,
    payload: request
  };
}

