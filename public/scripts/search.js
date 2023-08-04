// Function to filter items by price
function filterItemsByPrice(minPrice, maxPrice) {
  // Get all product listings
  const productItems = document.querySelectorAll('.product-item');

  productItems.forEach(item => {
    const priceElement = item.querySelector('.price');
    const price = parseFloat(priceElement.innerText.replace('$', ''));

    // Check if the item's price is within the specified range
    if (price >= minPrice && price <= maxPrice) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Listen for form submission and apply the price filter
document.getElementById('priceFilterForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const minPrice = parseFloat(document.getElementById('minPrice').value);
  const maxPrice = parseFloat(document.getElementById('maxPrice').value);

  filterItemsByPrice(minPrice, maxPrice);
});

// Function to send a message to the user listing the item
function sendMessage(productId, message) {
  // Implement your logic to send the message to the user listing the item.
  // You can use AJAX to send the productId and message to the server and handle the server-side logic there.

  // For now, we'll just log a message to the console to simulate sending.
  console.log(`Message sent to user with productId ${productId}: ${message}`);
}

// Listen for message form submissions and call the sendMessage function
document.querySelectorAll('.message-form').forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const productId = this.closest('.product-item').querySelector('.favorite-button').getAttribute('data-product-id');
    const message = this.querySelector('#message').value;

    sendMessage(productId, message);
    this.reset(); // Reset the form after sending the message
  });
});

// Function to fetch featured items
function fetchFeaturedItems() {
  // Implement your logic to fetch featured items from the server.
  // You can use AJAX to make a request to the server and handle the server-side logic there.

  // For now, we'll simulate fetching the featured items.
  const featuredItems = [
    {
      id: 1,
      title: 'Featured Product 1',
      description: 'This is a featured product with great features.',
      price: 49.99,
      imageUrl: 'images/shirt.jpg',
    },
    {
      id: 2,
      title: 'Featured Product 2',
      description: 'Another featured product for you to explore.',
      price: 79.99,
      imageUrl: 'images/jeans.jpg',
    },
    {
      id: 2,
      title: 'Featured Product 3',
      description: 'Another featured product for you to explore.',
      price: 299.99,
      imageUrl: 'images/jacket.jpg',
    },
    // Add more featured items as needed
  ];

  displayFeaturedItems(featuredItems); // Call the function to display the fetched featured items
}

// Function to display featured items in the main feed
function displayFeaturedItems(featuredItems) {
  const featuredItemsContainer = document.getElementById('featuredItems');

  featuredItems.forEach(item => {
    const productItem = document.createElement('div');
    productItem.classList.add('col-md-4', 'product-item');

    productItem.innerHTML = `
      <div class="card">
        <img class="card-img-top" src="${item.imageUrl}" alt="Product">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
          <button class="favorite-button" data-product-id="${item.id}" onclick="toggleHeartIcon()">
          <i id="heartIcon" class="fa-regular fa-heart" style="color: #ff0000;"></i>
          Favorite
          </button>
          <form class="message-form">
            <div class="form-group">
              <label for="message">Send Message:</label>
              <textarea class="form-control" id="message" name="message" rows="3" placeholder="Type your message here..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Send</button>
          </form>
          <!-- Add buttons for more details, buy, etc. -->
        </div>
      </div>
    `;

    featuredItemsContainer.appendChild(productItem);
  });
}

// Call the function to fetch and display featured items
fetchFeaturedItems();

// Admin Functionality

// Function to post new items (Admin feature)
function postItem(title, description, price, imageUrl) {
  // Implement your logic to post new items to the server.
  // You can use AJAX to send the item details to the server and handle the server-side logic there.

  // For now, we'll just log a message to the console to simulate posting.
  console.log('New item posted:', { title, description, price, imageUrl });
}

// Example usage: postItem('New Product', 'This is a new product.', 39.99, 'path/to/image.jpg');

// Function to remove an item from the site (Admin feature)
function removeItem(productId) {
  // Implement your logic to remove the item from the server.
  // You can use AJAX to send the productId to the server and handle the server-side logic there.

  // For now, we'll just log a message to the console to simulate removal.
  console.log('Item removed:', productId);
}

// Example usage: removeItem(123);

// Function to mark an item as SOLD (Admin feature)
function markAsSold(productId) {
  // Implement your logic to mark the item as SOLD on the server.
  // You can use AJAX to send the productId to the server and handle the server-side logic there.

  // For now, we'll just log a message to the console to simulate marking as SOLD.
  console.log('Item marked as SOLD:', productId);
}

// Example usage: markAsSold(456);

// Function to send a negotiation message to the user (Admin feature)
function sendNegotiationMessage(userId, message) {
  // Implement your logic to send the negotiation message to the user.
  // You can use AJAX to send the userId and message to the server and handle the server-side logic there.

  // For now, we'll just log a message to the console to simulate sending the message.
  console.log(`Negotiation message sent to user with userId ${userId}: ${message}`);
}

// Example usage: sendNegotiationMessage('user123', 'Your offer is accepted.');

// You can call these admin functions based on admin actions or events.
// For production use, you'll need to integrate these functions with your server-side code.
