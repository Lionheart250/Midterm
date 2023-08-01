// Function to add a product to favorites
function addToFavorites(productId) {
  fetch(`/api/addToFavorites/${productId}`, { method: 'POST' }) // Replace with the actual API endpoint for adding to favorites
    .then((response) => {
      if (response.ok) {
        // Item added to favorites successfully
        // You can add additional logic here, such as updating UI elements
        console.log(`Product with ID ${productId} added to favorites.`);
      } else {
        console.error('Error adding product to favorites:', response.statusText);
      }
    })
    .catch((error) => console.error('Error adding product to favorites:', error));
}

// Function to remove a product from favorites
function removeFromFavorites(productId) {
  fetch(`/api/removeFromFavorites/${productId}`, { method: 'DELETE' }) // Replace with the actual API endpoint for removing from favorites
    .then((response) => {
      if (response.ok) {
        // Item removed from favorites successfully
        // You can add additional logic here, such as updating UI elements
        console.log(`Product with ID ${productId} removed from favorites.`);
      } else {
        console.error('Error removing product from favorites:', response.statusText);
      }
    })
    .catch((error) => console.error('Error removing product from favorites:', error));
}

// Event listener for "Favorite" button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('favorite-btn')) {
    const productId = event.target.dataset.productId;
    const isFavorite = event.target.classList.contains('favorited');

    if (isFavorite) {
      removeFromFavorites(productId);
      event.target.classList.remove('favorited');
    } else {
      addToFavorites(productId);
      event.target.classList.add('favorited');
    }
  }
});
