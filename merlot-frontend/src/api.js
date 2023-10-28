const BASE_URL = 'http://localhost:4000/';

const token = localStorage.getItem('token');

export const createFile = (file) => {
  return fetch(BASE_URL + 'files', {
    method: 'POST',
    body: JSON.stringify(file),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const generateAccessToken = (password) => {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    body: JSON.stringify(password),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
