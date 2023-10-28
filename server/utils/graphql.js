import { buildSchema } from 'graphql';
import db from '../utils/db.js';

const getFileByID = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM files WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject(err);
      }
      resolve(row);
    });
  });
};

const getAllFiles = async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM files', (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const schema = buildSchema(`
    type Query {
        file(id: ID!): File,
        files: [File]
    }

    type File {
        name: String,
        content: String
    }
`);

export const root = {
  file: async ({ id }) => {
    try {
      return await getFileByID(id);
    } catch (err) {
      throw new Error('Failed to fetch file');
    }
  },
  files: async () => {
    try {
      return await getAllFiles();
    } catch (err) {
      throw new Error('Failed to fetch files');
    }
  },
};
