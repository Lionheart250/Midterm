const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail } = require('../lib/db');

router.get('/', (req, res) => {
  // Render the login form
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the user from the database based on the provided email
    const user = await getUserWithEmail(email);

    if (!user) {
      // User not found
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Invalid password
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Store the user information in the session
    req.session.user = { id: user.id, email: user.email };

    // Redirect the user to the home page after successful login
    res.redirect('/'); // Change '/' to the appropriate home page route
  } catch (error) {
    console.error('Error during user login:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
});

module.exports = router;
