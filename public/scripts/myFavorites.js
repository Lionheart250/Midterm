// Function to fetch user's favorite items from the server
function fetchMyFavorites() {
  return fetch('/api/myFavorites') // Replace with the actual API endpoint for fetching user's favorite items
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching user favorites:', error));
}

// Function to create favorite item HTML elements
function createFavoriteItemElement(item) {
  const favoriteItemElement = document.createElement('div');
  favoriteItemElement.classList.add('favorite-item');

  // Build the HTML for the favorite item
  favoriteItemElement.innerHTML = `
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
      </div>
    </div>
  `;

  return favoriteItemElement;
}

// Function to render user's favorite items on the page
function renderMyFavorites(favorites) {
  const favoritesContainer = document.getElementById('myFavorites');
  favoritesContainer.innerHTML = ''; // Clear previous favorites

  favorites.forEach((item) => {
    const favoriteItemElement = createFavoriteItemElement(item);
    favoritesContainer.appendChild(favoriteItemElement);
  });
}

// Entry point: Fetch user's favorite items and render them on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchMyFavorites().then((favorites) => {
    renderMyFavorites(favorites);
  });
});
