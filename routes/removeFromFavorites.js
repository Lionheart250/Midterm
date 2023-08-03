const express = require('express');
const router = express.Router();

// Route handler for removing an item from favorites
router.post('/', async (req, res) => {
  try {
    // Access the dbPool from req object
    const dbPool = req.dbPool;

    // Get the user's ID from the session (assuming you have implemented authentication)
    const userId = req.session.user_id;

    // Get the product ID from the request body (assuming you receive it in the POST request)
    const productId = req.body.productId;

    // Now you can use the dbPool to execute queries, etc.
    // For example, remove the product from the user's favorites in the database
    await dbPool.query('DELETE FROM favorites WHERE user_id = $1 AND product_id = $2', [userId, productId]);

    // Send a success response
    res.json({ message: 'Item removed from favorites' });

  } catch (error) {
    console.error('Error removing item from favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
