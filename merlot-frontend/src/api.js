const BASE_URL = 'http://localhost:4000/';

export const createFile = (file) => {
  return fetch(BASE_URL + 'files', {
    method: 'POST',
    body: JSON.stringify(file),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`username:password`),
    },
  });
};
