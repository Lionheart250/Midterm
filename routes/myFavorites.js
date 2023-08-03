const express = require('express');
const router = express.Router();

// Route handler for /myFavorites
router.get('/', async (req, res) => {
  try {
    // Access the dbPool from req object
    const dbPool = req.dbPool;

    // Get the user's ID from the session (assuming you have implemented authentication)
    const userId = req.session.user_id;

    // Now you can use the dbPool to execute queries, etc.
    // For example, fetch the user's favorite items from the database
    const queryResult = await dbPool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);
    const favoriteItems = queryResult.rows;

    // Send the favorite items as a JSON response
    res.json(favoriteItems);

  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
