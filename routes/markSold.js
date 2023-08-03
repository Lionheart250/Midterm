const express = require('express');
const router = express.Router();
const { markListingAsSold } = require('../lib/db');

// Route handler for /markSold
router.post('/', async (req, res) => {
  try {
    const listingId = req.body.listingId; // Assuming you receive the listing ID in the request body
    const dbPool = req.dbPool;

    // Mark the listing as sold in the database
    await markListingAsSold(listingId, dbPool);

    res.json({ message: 'Listing marked as sold' });

  } catch (error) {
    console.error('Error marking listing as sold:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
