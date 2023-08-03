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

// Function to fetch all listings from the database
async function getAllListings() {
  const query = 'SELECT * FROM listings';
  const result = await dbPool.query(query);
  return result.rows;
}

// Route handler for /allListings
router.get('/allListings', async (req, res) => {
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
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
