const express = require('express');
const router = express.Router();
const dbPool = require('../db/connection');

// Middleware function to check if the user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'You must be logged in to perform this action.' });
  }
  // User is authenticated, proceed to the next middleware or route handler
  next();
};

// Function to fetch all listings from the database
async function getAllListings() {
  const query = 'SELECT * FROM listings';
  const result = await dbPool.query(query);
  return result.rows;
}

// Route handler for /allListings
router.get('/', requireAuth, async (req, res) => {
  try {
    // Fetch all listings from the database
    const allListings = await getAllListings();

    const templateVars = {
      currentUser: req.session.user, // Assuming you are using the "user" session variable for authentication
      listings: allListings, // Pass the fetched listings data to the template
    };
    res.render('allListings', templateVars); // Render the "allListings.ejs" template with the data
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
});

module.exports = router;

async function getAllListings() {
  const query = 'SELECT *, coalesce(price, 0) AS price FROM listings'; // Use coalesce to set default value 0 if price is null
  const result = await dbPool.query(query);
  return result.rows;
}
