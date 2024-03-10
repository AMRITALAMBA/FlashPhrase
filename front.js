// document.addEventListener('DOMContentLoaded', function () {
//     // Check if username exists in local storage
//     const storedUsername = localStorage.getItem('userData').replace(/[{}" "]/g, ' ').split(':');
// console.log(storedUsername[1])
//     // If username exists, update the navigation bar with the username
//     if (storedUsername[1]) {
//         updateNavbarWithUsername(storedUsername[1]);
//     }
// });

// function updateNavbarWithUsername(username) {
//     // Find the signup link element by its id
//     const signupLink = document.getElementById("signup-link");
// console.log(username)
//     // Replace the text of the signup link with the username
//     signupLink.innerHTML =`${username}`;
// }

document.addEventListener('DOMContentLoaded', function () {
    // Check if userData exists in local storage
    if(localStorage.getItem('userData')) {
        const storedUserData = localStorage.getItem('userData').replace(/[{}" "]/g, ' ').split(':');
        // If username exists, update the navigation bar with the username
        if (storedUserData[1]) {
            updateNavbarWithUsername(storedUserData[1]);
        }
    }
});

function updateNavbarWithUsername(username) {
    // Find the signup link element by its id
    const signupLink = document.getElementById("signup-link");
    
    if (username) {
        
        signupLink.innerHTML = `👑${username}`;
        
        signupLink.addEventListener('click', function() {
            
            localStorage.removeItem('userData');
           
            window.location.reload();
        });
    } else {
        
        signupLink.innerHTML = 'Signup';
        
        signupLink.addEventListener('click', function() {
            
            alert('Signup functionality to be implemented!');
        });
    }
}
