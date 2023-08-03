const express = require('express');
const router = express.Router();

// Middleware function to check if the user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'You must be logged in to perform this action.' });
  }
  // User is authenticated, proceed to the next middleware or route handler
  next();
};

// The route handler for /users
router.get('/', (req, res) => {
  // Access the dbPool from req object
  const dbPool = req.dbPool;

  // Now you can use the dbPool to execute queries, etc.
  // ...

  res.send('User route');
});

// The route handler for creating new listings
router.post('/newListings', requireAuth, async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    // Validate the data if needed

    // Call the createListing function to insert the new listing into the database
    const newListing = await createListing(title, description, price, imageUrl);

    // Return the newly created listing as the response
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating new listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
