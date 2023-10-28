import { buildSchema } from 'graphql';
import db from '../utils/db.js';

const getFileByID = async (id) => {
  try {
    const response = await db.query('SELECT * FROM files WHERE id = $1', [id]);
    if (response.rows.length === 0) return Error('File not found');
    return response.rows[0];
  } catch (err) {
    console.log(err.message);
    throw new Error('Failed to fetch file');
  }
};

const getAllFiles = async () => {
  try {
    const response = await db.query(
      'SELECT * FROM files ORDER BY updated_at DESC, created_at DESC'
    );
    return response.rows;
  } catch (err) {
    console.log(err.message);
    throw new Error('Failed to fetch files');
  }
};

export const schema = buildSchema(`
    type Query {
        file(id: ID!): File,
        files: [File]
    }

    type File {
        id: ID
        name: String,
        content: String,
        created_at: String,
        updated_at: String,
    }
`);

export const root = {
  file: async ({ id }) => {
    try {
      return await getFileByID(id);
    } catch (err) {
      throw new Error(err);
    }
  },
  files: async () => {
    try {
      return await getAllFiles();
    } catch (err) {
      throw new Error(err);
    }
  },
};
