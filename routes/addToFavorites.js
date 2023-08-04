const express = require('express');
const router = express.Router();
const dbPool = require('../db/connection');

// Route handler for adding an item to favorites
router.post('/', async (req, res) => {
  try {
    // Access the dbPool from req object

    // Get the user's ID from the session (assuming you have implemented authentication)
    const userId = req.session.user_id;

    // Get the product ID from the request body (assuming you receive it in the POST request)
    const productId = req.body.productId;

    // Now you can use the dbPool to execute queries, etc.
    // For example, add the product to the user's favorites in the database
    await dbPool.query('INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)', [userId, productId]);

    // Send a success response
    res.json({ message: 'Item added to favorites' });

  } catch (error) {
    console.error('Error adding item to favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
