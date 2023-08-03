const express = require('express');
const router = express.Router();
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

// Function to delete a listing
function deleteListing(itemId) {
  return dbPool.query('DELETE FROM items WHERE id = $1', [itemId]);
}

// Route to handle item deletion
router.post('/api/deleteListing', (req, res) => {
  const itemId = req.body.itemId; // Assuming the item ID is sent in the request body
  // Process the request and delete the item from the database
  deleteListing(itemId)
    .then(() => {
      // Respond with a success message
      res.json({ message: 'Item deleted successfully' });
    })
    .catch((error) => {
      // Handle any errors and respond with an error message
      res.status(500).json({ error: 'Error deleting item' });
    });
});

module.exports = router;
