// Function to fetch product listings from the server
function fetchProductListings() {
  return fetch('/api/productListings') // Replace with the actual API endpoint for product listings
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching product listings:', error));
}

// Function to create product listing HTML elements
function createProductListingElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('col-md-4', 'product-item');

  // Build the HTML for the product listing card
  productElement.innerHTML = `
    <div class="card">
      <img class="card-img-top" src="${product.image}" alt="Product">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-primary btn-sm favorite-btn" data-product-id="${product.id}">Favorite</button>
        <!-- Add more buttons or elements as needed -->
      </div>
    </div>
  `;

  return productElement;
}

// Function to render product listings on the page
function renderProductListings(productListings) {
  const productListingContainer = document.getElementById('productListings');
  productListingContainer.innerHTML = ''; // Clear previous listings

  productListings.forEach((product) => {
    const productElement = createProductListingElement(product);
    productListingContainer.appendChild(productElement);
  });
}

// Function to handle "Favorite" button clicks
function handleFavoriteButtonClick(event) {
  const productId = event.target.dataset.productId;
  // Send a request to the server to add/remove the item from favorites
  // You can implement this functionality in a separate script (e.g., favoritesEvents.js)
}

// Event listener for "Favorite" button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('favorite-btn')) {
    handleFavoriteButtonClick(event);
  }
});

// Entry point: Fetch product listings and render them on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchProductListings().then((productListings) => {
    renderProductListings(productListings);
  });
});
