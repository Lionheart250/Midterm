// routes/dashboard.js

const express = require('express');
const router = express.Router();
const { getUsers } = require('../db/queries/users');

// Middleware function to check if the user is logged in
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'You must be logged in to perform this action.' });
  }
  // User is authenticated, proceed to the next middleware or route handler
  next();
};

// The route handler for /dashboard
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Call the getUsers function to fetch the user's listings
    const userListings = await getUsers(userId);

    // Render the dashboard view and pass the user's listings as a variable
    res.render('dashboard', { currentUser: req.session.user, listings: userListings });
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
