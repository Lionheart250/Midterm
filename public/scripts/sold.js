// Function to mark an item as sold
function markItemAsSold(productId) {
  fetch(`/api/markSold/${productId}`, { method: 'PUT' }) // Replace with the actual API endpoint for marking items as sold
    .then((response) => {
      if (response.ok) {
        // Item marked as sold successfully
        // You can add additional logic here, such as updating UI elements
        console.log(`Product with ID ${productId} marked as sold.`);
      } else {
        console.error('Error marking item as sold:', response.statusText);
      }
    })
    .catch((error) => console.error('Error marking item as sold:', error));
}

// Event listener for "Mark as Sold" button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('mark-sold-btn')) {
    const productId = event.target.dataset.productId;
    markItemAsSold(productId);
  }
});
