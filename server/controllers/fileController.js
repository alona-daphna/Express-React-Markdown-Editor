import db from '../utils/db.js';

const createFile = async (req, res) => {
  const { name, content } = req.body;

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO files (name, content) VALUES (?, ?)',
      [name, content],
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID, name, content });
        }
      }
    );
  });
};

const updateFile = async (req, res) => {
  const fileId = req.params.id;
  const { name, content } = req.body;

  let updateQuery = 'UPDATE files SET';
  const queryParams = [];

  if (name) {
    updateFile += ' name = ?';
    queryParams.push(name);
  }

  if (content) {
    updateFile += ' content = ?';
    queryParams.push(content);
  }

  updateQuery += ' WHERE id = ?';
  queryParams.push(fileId);

  db.run(updateQuery, queryParams, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while updating the file.' });
    } else {
      res.status(200);
    }
  });
};

const deleteFile = async (req, res) => {
  const fileId = req.params.id;

  db.run('DELETE FROM files WHERE id = ?', [fileId], (err) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'An error occured while deleting the file' });
    } else {
      res.json(200);
    }
  });
};

export { updateFile, createFile, deleteFile };
