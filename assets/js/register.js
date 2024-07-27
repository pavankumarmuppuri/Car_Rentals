document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form input values
        const firstName = document.querySelector('input[placeholder="Enter your first name"]').value;
        const lastName = document.querySelector('input[placeholder="Enter your last name"]').value;
        const email = document.querySelector('input[placeholder="Enter your email"]').value;
        const password = document.querySelector('input[placeholder="Create password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm password"]').value;
        const termsAccepted = document.querySelector('input[type="checkbox"]').checked;

        // Check if terms are accepted
        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Save user data to localStorage
        const user = { firstName, lastName, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");
        window.location.href = "./login.html"; // Redirect to login page
    });
});
