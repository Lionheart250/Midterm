// Function to send a new listing to the server
function createNewListing(listingData) {
  return fetch('/api/newListings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listingData),
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error creating new listing:', error));
}

// Function to handle form submission for creating a new listing
function handleCreateListingFormSubmit(event) {
  event.preventDefault();

  // Get form input values
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const imageUrl = document.getElementById('imageUrl').value;

  // Validate input values (optional)

  // Create listing data object
  const listingData = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    // Add any other properties as needed
  };

  // Send new listing data to the server
  createNewListing(listingData)
    .then((response) => {
      // Handle response (e.g., show success message, redirect, etc.)
      console.log('New listing created:', response);
      // Clear form fields (optional)
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('price').value = '';
      document.getElementById('imageUrl').value = '';

      // Add the newly created listing to the "Available Listings" section
      const listingHtml = `
        <div class="col-md-4 product-item">
          <div class="card">
            <img class="card-img-top" src="${imageUrl}" alt="Product">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="price">$${price.toFixed(2)}</p>
              <button class="btn btn-primary btn-sm favorite-btn" data-product-id="${response.id}">Favorite</button>
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
        </div>
      `;
      document.getElementById('productListings').insertAdjacentHTML('beforeend', listingHtml);
    })
    .catch((error) => {
      // Handle error (e.g., show error message)
      console.error('Error creating new listing:', error);
    });
}

// Event listener for "Create Listing" form submission
document.getElementById('createListingForm').addEventListener('submit', handleCreateListingFormSubmit);
