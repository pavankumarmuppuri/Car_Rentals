document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form input values
        const email = document.querySelector('input[placeholder="Enter your email"]').value;
        const password = document.querySelector('input[placeholder="Enter your password"]').value;
        const termsAccepted = document.querySelector('input[type="checkbox"]').checked;

        // Check if terms are accepted
        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }

        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("No registered users found. Please register first.");
            return;
        }

        const user = JSON.parse(storedUser);

        // Validate user credentials
        if (user.email === email && user.password === password) {
            alert("Login successful!");

            // Store the user's first name in sessionStorage for the navbar
            sessionStorage.setItem("firstName", user.firstName);

            // Redirect to the homepage or another page
            window.location.href = "./index.html"; // Replace with the actual URL of the homepage
        } else {
            alert("Invalid email or password.");
        }
    });
});
