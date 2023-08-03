// Function to mark an item as sold
async function markItemAsSold(itemId, isSold) {
  try {
    const response = await fetch(`/dashboard/sold/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isSold }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    // Reload the page to reflect the updated status
    location.reload();
  } catch (error) {
    console.error('Error marking item as sold:', error);
    alert('Error marking item as sold. Please try again later.');
  }
}

// Event listener for "Mark Sold" button clicks
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('mark-sold-btn')) {
    const itemId = event.target.dataset.itemId;
    const isSold = event.target.checked;
    markItemAsSold(itemId, isSold);
  }
});
