const express = require('express');
const router = express.Router();

// Route handler for creating a new listing
router.post('/', async (req, res) => {
  try {
    // Access the dbPool from req object
    const dbPool = req.dbPool;

    // Get the user's ID from the session (assuming you have implemented authentication)
    const userId = req.session.user_id;

    // Get listing data from the request body (assuming you receive it in the POST request)
    const { title, description, price, imageUrl } = req.body;

    // Now you can use the dbPool to execute queries, etc.
    // For example, insert the new listing into the database
    await dbPool.query(
      'INSERT INTO listings (user_id, title, description, price, image_url) VALUES ($1, $2, $3, $4, $5)',
      [userId, title, description, price, imageUrl]
    );

    // Send a success response
    res.json({ message: 'New listing created successfully' });

  } catch (error) {
    console.error('Error creating new listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
