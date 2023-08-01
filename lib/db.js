// db.js
const { Pool } = require('pg');
const dbParams = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port: 5432,
  database: 'midterm',
  ssl: process.env.DB_SSL === 'true',
};

const dbPool = new Pool(dbParams);

const getUserWithEmail = (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  return dbPool.query(query, [email])
    .then((result) => result.rows[0])
    .catch((err) => console.error('Error executing query', err));
};

const addUser = (user) => {
  const { username, email, password } = user;
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  return dbPool.query(query, [username, email, password])
    .then((result) => result.rows[0])
    .catch((err) => console.error('Error executing query', err));
};

module.exports = {
  dbPool,
  getUserWithEmail,
  addUser,
};
