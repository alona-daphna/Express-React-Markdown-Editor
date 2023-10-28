import db from '../utils/db.js';

const createFile = async (req, res) => {
  const { name, content } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO files (name, content) VALUES ($1, $2) RETURNING id, name, content',
      [name ? name : 'Untitled', content ? content : '']
    );

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(500).json({ error: 'Failed to create file' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to create file' });
  }
};

const updateFile = async (req, res) => {
  const fileId = req.params.id;
  const { name, content } = req.body;

  let updateQuery = 'UPDATE files SET';
  const queryParams = [];

  if (name) {
    updateQuery += ` name = $${queryParams.length + 1},`;
    queryParams.push(name);
  }

  if (content) {
    updateQuery += ` content = $${queryParams.length + 1},`;
    queryParams.push(content);
  }

  updateQuery += ` updated_at = current_timestamp`;

  updateQuery += ` WHERE id = $${
    queryParams.length + 1
  } RETURNING id, name, content`;
  queryParams.push(fileId);

  try {
    const result = await db.query(updateQuery, queryParams);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to update file' });
  }
};

const deleteFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const result = await db.query(
      'DELETE FROM files WHERE id = $1 RETURNING id',
      [fileId]
    );
    if (result.rowCount > 0) {
      res.status(200).send('deleted');
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

export { updateFile, createFile, deleteFile };
