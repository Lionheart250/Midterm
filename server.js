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

app.get("/", (req, res) => {
  const templateVars = {
    currentUser: undefined,
    userEmail: undefined,
    error: undefined // Add the 'error' key with value 'undefined'
  }
  if (req.session && req.session.user_id) {
    templateVars.currentUser = req.session.user_id;
    templateVars.userEmail = req.session.user_email;
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
