// admin-login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    // Default credentials
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin-dashboard.html'; // Redirect to the admin dashboard
    } else {
      errorMsg.style.display = 'block'; // Show error message
    }
  });
});
