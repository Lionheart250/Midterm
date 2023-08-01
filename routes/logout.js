const express = require('express');
const router = express.Router();

// Log a user out
router.post('/', (req, res) => {
  // Assuming you are using express-session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/'); // Redirect to the home page after logout
  });
});

module.exports = router;
