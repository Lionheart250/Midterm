// Function to delete a listing
function deleteListing(listingId) {
  return fetch(`/api/delete/${listingId}`, {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .catch((error) => console.error('Error deleting listing:', error));
}

// Function to handle delete button click
function handleDeleteButtonClick(event) {
  const listingId = event.target.dataset.listingId;

  // Send request to delete the listing
  deleteListing(listingId)
    .then((response) => {
      // Handle response (e.g., show success message, remove listing from the page, etc.)
      console.log('Listing deleted:', response);
      // Optionally remove the deleted listing from the UI
      const listingElement = event.target.closest('.product-item');
      if (listingElement) {
        listingElement.remove();
      }
    })
    .catch((error) => {
      // Handle error (e.g., show error message)
      console.error('Error deleting listing:', error);
    });
}

// Event listener for delete button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    handleDeleteButtonClick(event);
  }
});
