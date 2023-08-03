// testDb.js

// Import the getAllListings function from db.js
const { getAllListings } = require('./lib/db');

// Function to test the getAllListings function
async function testGetAllListings() {
  try {
    // Call the getAllListings function to fetch listings from the database
    const listings = await getAllListings();

    // Log the fetched listings to the console
    console.log('Listings:', listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

// Call the testGetAllListings function to run the test
testGetAllListings();
