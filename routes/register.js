// users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser } = require('../lib/db');

router.get('/', (req, res) => {
  const templateVars = {
    error: undefined // Add the 'error' key with value 'undefined'
  };
  res.render('register', templateVars); // Render the registration form
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists in the database and handle error if needed
    // For example, you can use the getUserWithEmail function to check if the email is already registered.

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database with the hashed password
    await addUser({ username, email, password: hashedPassword });

    // Redirect the user to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during user registration:', error);
    res.render('register', { error: 'An error occurred during registration' });
  }
});

module.exports = router;
