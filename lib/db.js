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
    .catch((err) => {
      console.error('Error executing query', err);
      throw new Error('An error occurred while retrieving the user.');
    });
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

// Test the database connection
dbPool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection established successfully.');
  }
});


module.exports = {
  dbPool,
  getUserWithEmail,
  addUser,
};
