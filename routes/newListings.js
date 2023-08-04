const express = require('express');
const router = express.Router();
const dbPool = require('../db/connection');

// Middleware function to check if the user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ error: 'You must be logged in to perform this action.' });
  }
  // User is authenticated, proceed to the next middleware or route handler
  next();
};

// Function to create a new listing in the database
async function createListing(title, description, price, imageUrl, userId) {
  const query = 'INSERT INTO listings (title, description, price, imageUrl, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [title, description, price, imageUrl, userId];
  const result = await dbPool.query(query, values);
  return result.rows[0];
}

// The route handler for creating new listings
router.post('/', requireAuth, async (req, res) => {
  try {

    // Get the user's ID from the session (assuming you have implemented authentication)
    const userId = req.session.user_id;

    // Get listing data from the request body (assuming you receive it in the POST request)
    const { title, description, price, imageUrl } = req.body;
  

    // Call the createListing function to insert the new listing into the database
    const newListing = await createListing(title, description, price, imageUrl, userId);

  } catch (error) {
    console.error('Error creating new listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
