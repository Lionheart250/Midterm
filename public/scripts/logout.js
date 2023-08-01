// logout.js

// Function to handle logout when the user clicks the logout button
const handleLogout = () => {
  // Send a POST request to the logout route on the server
  fetch('/logout', {
    method: 'POST',
  })
    .then((response) => {
      if (response.ok) {
        // If the logout was successful, reload the page to update the UI
        window.location.reload();
      } else {
        console.error('Logout failed:', response.status, response.statusText);
        // Optionally, you can display an error message to the user here
      }
    })
    .catch((error) => {
      console.error('Logout error:', error);
      // Optionally, you can display an error message to the user here
    });
};

// Add an event listener to the logout button to trigger the logout process
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', handleLogout);
}
