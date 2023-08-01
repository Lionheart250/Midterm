// Function to fetch user's listings from the server
function fetchMyListings() {
  return fetch('/api/myListings') // Replace with the actual API endpoint for fetching user's listings
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching user listings:', error));
}

// Function to create user's listing HTML elements
function createUserListingElement(listing) {
  const listingElement = document.createElement('div');
  listingElement.classList.add('col-md-4', 'user-listing-item');

  // Build the HTML for the user's listing card
  listingElement.innerHTML = `
    <div class="card">
      <img class="card-img-top" src="${listing.image}" alt="Listing">
      <div class="card-body">
        <h5 class="card-title">${listing.title}</h5>
        <p class="card-text">${listing.description}</p>
        <p class="price">$${listing.price.toFixed(2)}</p>
        <!-- Add more buttons or elements as needed -->
      </div>
    </div>
  `;

  return listingElement;
}

// Function to render user's listings on the page
function renderMyListings(myListings) {
  const myListingContainer = document.getElementById('myListings');
  myListingContainer.innerHTML = ''; // Clear previous listings

  myListings.forEach((listing) => {
    const userListingElement = createUserListingElement(listing);
    myListingContainer.appendChild(userListingElement);
  });
}

// Entry point: Fetch user's listings and render them on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchMyListings().then((myListings) => {
    renderMyListings(myListings);
  });
});
