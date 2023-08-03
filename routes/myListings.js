const express = require('express');
const router = express.Router();
const { getUserListings } = require('../lib/db');

// Route handler for /myListings
router.get('/', async (req, res) => {
  try {
    const userId = req.session.user_id; // Assuming you are using express-session and the user ID is stored in the session
    const dbPool = req.dbPool;

    // Fetch the current user's listings from the database
    const myListings = await getUserListings(userId, dbPool);

    // Render the myListings view, passing the user's listings data as template variables
    res.render('myListings', { myListings });

  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
