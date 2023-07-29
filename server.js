// load .env data into process.env
require('dotenv').config();
const session = require('express-session');


// Web server config
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
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
//DB_HOST=localhost
//DB_USER=labber
//DB_PASS=labber
//DB_NAME=midterm
//# Uncomment and set to true for Heroku
//# DB_SSL=true if heroku
//DB_PORT=5432

// setup database


app.set('view engine', 'ejs');
// Add this line to use the express-session middleware
app.use(session({
  secret: 'your-secret-key', // Replace this with a random secret key for security
  resave: false,
  saveUninitialized: true
}));
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
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

const attachDbPool = (req, res, next) => {
  req.dbPool = dbPool;
  next();
};



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use(attachDbPool);
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// For the following routes, use `attachDbPool` middleware as required
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

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const templateVars = {
    currentUser: undefined,
    userEmail: undefined
  }
  if (req.session && req.session.user_id) {
    templateVars.currentUser = req.session.user_id;
    templateVars.userEmail = req.session.user_email;
  }
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
