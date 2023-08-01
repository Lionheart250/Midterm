// public/login.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the dashboard or handle the successful login as needed
        window.location.href = '/dashboard';
      } else {
        // Display error message or perform actions based on the error response
        const errorMessage = data.error || 'Login failed. Please try again.';
        // Example: Display error message on the login form
        const errorElement = document.getElementById('login-error');
        errorElement.textContent = errorMessage;
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle other error scenarios as needed
    }
  });
});
