const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail } = require('../lib/db');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Use the getUserWithEmail function to retrieve the user with the given email
  getUserWithEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Password is correct, store the user information in the session
        req.session.user = { id: user.id, email: user.email };

        // Redirect to the home page or send a success response
        res.redirect('/');
      });
    })
    .catch((err) => {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
