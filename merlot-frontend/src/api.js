import { gql } from '@apollo/client';

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

export const deleteFile = (id) => {
  return fetch(BASE_URL + 'files/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const updateFile = (id, file) => {
  return fetch(BASE_URL + 'files/' + id, {
    method: 'PATCH',
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

export const GET_FILE_NAMES = gql`
  query {
    files {
      id
      name
    }
  }
`;

export const GET_FILE_CONTENT = gql`
  query ($id: ID!) {
    file(id: $id) {
      content
    }
  }
`;
