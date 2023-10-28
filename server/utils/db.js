import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('merlot.db', (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Connected to the SQLite server');

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100) NOT NULL DEFAULT 'Untitled',
        content TEXT NOT NULL
    )`;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Files table created');
      }
    });
  }
});

export default db;
