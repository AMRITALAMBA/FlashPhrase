// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");
// const sign_in_btn2 = document.querySelector("#sign-in-btn2");
// const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// sign_up_btn.addEventListener("click", () => {
//     container.classList.add("sign-up-mode");
// });
// sign_in_btn.addEventListener("click", () => {
//     container.classList.remove("sign-up-mode");
// });
// sign_up_btn2.addEventListener("click", () => {
//     container.classList.add("sign-up-mode2");
// });
// sign_in_btn2.addEventListener("click", () => {
//     container.classList.remove("sign-up-mode2");
// });

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.sign-in-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password entered by the user
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Assuming authentication is successful
        // You can replace this with your actual authentication logic
        if (username && password) {
            // Redirect to the home page
            window.location.href = 'index.html';

            // Store user data in local storage
            const userData = {
                username: username
                // Add other user data if needed
            };
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            // Display an error message or handle authentication failure
            console.log('Invalid username or password');
        }
    });

    // Event listeners for switching between sign-in and sign-up forms
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    const sign_in_btn2 = document.querySelector("#sign-in-btn2");
    const sign_up_btn2 = document.querySelector("#sign-up-btn2");

    // Event listener for sign up button in the first panel
    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    // Event listener for sign in button in the first panel
    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    // Event listener for sign up button in the second panel
    sign_up_btn2.addEventListener("click", () => {
        container.classList.add("sign-up-mode2");
    });

    // Event listener for sign in button in the second panel
    sign_in_btn2.addEventListener("click", () => {
        container.classList.remove("sign-up-mode2");
    });
});


