// Function to delete a listing
function deleteListing(listingId) {
  return fetch(`/api/delete/${listingId}`, {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .catch((error) => console.error('Error deleting listing:', error));
}

// Function to handle the "Delete" button click for an item
function handleDeleteItemClick(event) {
  const itemId = event.target.dataset.itemId; // Assuming the item ID is stored as a data attribute on the button

  // Call the deleteListing function to send the DELETE request to the server
  deleteListing(itemId)
    .then((data) => {
      // Handle the response from the server (e.g., show success message, update the UI, etc.)
      console.log('Item deleted:', data.message);
      // Remove the deleted item from the UI (optional, if you want to update the dashboard immediately)
      // For example, you can remove the item from the dashboard's product listing container by selecting its ID
      // document.getElementById(itemId).remove();
    })
    .catch((error) => {
      // Handle error (e.g., show error message)
      console.error('Error deleting item:', error);
    });
}

// Event listener for delete button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    handleDeleteItemClick(event);
  }
});
