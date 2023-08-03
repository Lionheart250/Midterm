// load .env data into process.env
require('dotenv').config();
const session = require('express-session');

// Web server config
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const app = express();
const { Pool } = require('pg');
const dbParams = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port: 5432,
  database: 'midterm',
  ssl: process.env.DB_SSL === 'true',
};
const dbPool = new Pool(dbParams);
dbPool.connect();

app.set('view engine', 'ejs');
app.use(session({
  secret: 'your-secret-key', // Replace this with a random secret key for security
  resave: false,
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const addToFavorites = require('./routes/addToFavorites');
const clothingRoutes = require('./routes/clothing');
const contactSeller = require('./routes/contact');
const deleteItem = require('./routes/delete');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const sold = require('./routes/markSold');
const myFavorites = require('./routes/myFavorites');
const myListings = require('./routes/myListings');
const newListings = require('./routes/newListings');
const registerRoute = require('./routes/register');
const removeFavorite = require('./routes/removeFromFavorites');
const searchRoute = require('./routes/search');
const dashboardRoutes = require('./routes/dashboard'); // Import the dashboard.js route

const attachDbPool = (req, res, next) => {
  req.dbPool = dbPool;
  next();
};

app.use(attachDbPool);
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/addToFavorites', attachDbPool, addToFavorites);
app.use('/clothing', attachDbPool, clothingRoutes);
app.use('/contactSeller', attachDbPool, contactSeller);
app.use('/delete', attachDbPool, deleteItem);
app.use('/login', attachDbPool, loginRoute);
app.use('/logout', attachDbPool, logoutRoute);
app.use('/sold', attachDbPool, sold);
app.use('/myFavorites', attachDbPool, myFavorites);
app.use('/myListings', attachDbPool, myListings);
app.use('/newListings', attachDbPool, newListings);
app.use('/register', attachDbPool, registerRoute);
app.use('/removeFromFavorites', attachDbPool, removeFavorite);
app.use('/search', attachDbPool, searchRoute);
app.use('/dashboard', dashboardRoutes);

// Import the deleteListing function from newListings.js
const { deleteListing } = require('./routes/delete');

app.get("/", (req, res) => {
  const templateVars = {
    currentUser: req.session.user, // Update this line
    userEmail: undefined,
    error: undefined // Add the 'error' key with value 'undefined'
  }
  if (req.session && req.session.user) {
    templateVars.userEmail = req.session.user.email; // Update this line
  }
  res.render("index", templateVars);
});

// Add this new route to handle the GET request to /login
app.get("/login", (req, res) => {
  const templateVars = {
    error: undefined // Pass the error as undefined to the login page
  }
  res.render("login", templateVars);
});

// Add this new route to handle the POST request to /logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/'); // Redirect to the home page after logout
  });
});

// In your server.js or an appropriate route file
app.get("/dashboard", (req, res) => {
  // Check if the user is logged in. Redirect to login if not authenticated.
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  // If the user is logged in, render the dashboard page and pass the currentUser data.
  const templateVars = {
    currentUser: req.session.user,
  };
  res.render("dashboard", templateVars);
});

//delete listings
// DELETE route to handle item deletion
app.delete('/api/delete/:listingId', async (req, res) => {
  try {
    const listingId = req.params.listingId;
    // Call the deleteListing function to delete the listing with the specified ID from the database
    await deleteListing(listingId);
    // Respond with a success message
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Error deleting listing' });
  }
});

// UPDATE route to handle marking items as sold
app.patch('/dashboard/sold/:listingId', async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const isSold = req.body.isSold;

    // Assuming you have a "listings" table in your database, update the "is_sold" field for the specified listing
    await dbPool.query('UPDATE listings SET is_sold = $1 WHERE id = $2', [isSold, listingId]);

    // Respond with a success message
    res.json({ message: 'Item marked as sold successfully' });
  } catch (error) {
    console.error('Error marking item as sold:', error);
    res.status(500).json({ error: 'Error marking item as sold' });
  }
});

//Update the "is_sold" status of an item
app.post('/dashboard/sold/:listingId', async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const isSold = req.body.isSold === 'true';

    // Update the "is_sold" status of the item in the database
    const result = await dbPool.query('UPDATE items SET is_sold = $1 WHERE id = $2', [isSold, listingId]);

    if (result.rowCount === 0) {
      // No rows were updated, indicating the listing with the specified ID was not found
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Respond with a success message
    res.json({ message: 'Listing status updated successfully' });
  } catch (error) {
    console.error('Error updating listing status:', error);
    res.status(500).json({ error: 'Error updating listing status' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
