const express = require('express');
const router = express.Router();

// The route handler for /users
router.get('/', (req, res) => {
  // Access the dbPool from req object
  const dbPool = req.dbPool;

  // Now you can use the dbPool to execute queries, etc.
  // ...

  res.send('User route');
});

module.exports = router;
