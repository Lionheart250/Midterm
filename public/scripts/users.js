// Client facing scripts here
$(() => {
  $('#register-button').on('click', () => {
    const formData = {
      username: $('input[name="username"]').val(),
      email: $('input[name="email"]').val(),
      password: $('input[name="password"]').val(),
    };

    $.ajax({
      method: 'POST',
      url: '/register',
      data: formData,
    })
      .done((response) => {
        // Handle the response if needed
        // For example, you can redirect the user to the login page on successful registration.
        window.location.href = '/login';
      })
      .fail((error) => {
        // Handle the error if needed
        console.error('Error during user registration:', error);
        // You can show an error message to the user, e.g., $("#error-message").text("An error occurred during registration");
      });
  });
});
