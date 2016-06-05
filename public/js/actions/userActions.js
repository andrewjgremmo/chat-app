import axios from 'axios';

export const REGISTER = 'REGISTER';

export function register(username) {
  const request = axios.post(`/users`, {
    username: username
  });

  return {
    type: REGISTER,
    payload: request
  };
}
