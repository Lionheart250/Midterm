const express = require('express');
const router = express.Router();
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
dbPool.connect();

// Middleware function to check if the user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'You must be logged in to perform this action.' });
  }
  // User is authenticated, proceed to the next middleware or route handler
  next();
};

// Function to fetch user-specific listings from the database
async function getUserListings(userId) {
  const query = 'SELECT * FROM listings WHERE user_id = $1';
  const result = await dbPool.query(query, [userId]);
  return result.rows;
}

// The route handler for fetching user-specific listings
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Call the getUserListings function to fetch the user's listings from the database
    const listings = await getUserListings(userId);

    // Return the user's listings as the response
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
