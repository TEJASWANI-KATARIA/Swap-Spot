// Selecting the form and input fields
const form = document.getElementById('signupForm');
const fullName = document.querySelector('input[placeholder="Full Name"]');
const email = document.querySelector('input[placeholder="Email"]');
const password = document.getElementById('password');
const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the eye / eye-slash icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});



// Event listener for form submission
form.addEventListener('submit', function (e) {
    alert("submitted");
    e.preventDefault(); // Prevents form from submitting automatically

    // Validating inputs
    if (!validateInputs()) {
        return; // Stop if validation fails
    }


    // Hide the sign-up button
    form.querySelector('button.signup-btn').style.display = 'none';
});


// Validation function
function validateInputs() {
    let isValid = true;

    // Full Name validation
    if (fullName.value.trim() === "") {
        showError(fullName, "Full Name is required");
        isValid = false;
    } else {
        clearError(fullName);
    }

    // Email validation
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email");
        isValid = false;
    } else {
        clearError(email);
    }

    // Password validation
    if (password.value.trim() === "") {
        showError(password, "Password is required");
        isValid = false;
    } else if (password.value.trim().length < 6) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    } else {
        clearError(password);
    }

    // Confirm password validation
    if (confirmPassword.value.trim() === "") {
        showError(confirmPassword, "Please confirm your password");
        isValid = false;
    } else if (confirmPassword.value.trim() !== password.value.trim()) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    return isValid;
}

// Function to display error messages
function showError(input, message) {
    const parentElement = input.parentElement;
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.textContent = message;

    // Remove previous error message if it exists
    const existingError = parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Append the new error message
    parentElement.appendChild(errorMessage);
}

// Function to clear error messages
function clearError(input) {
    const parentElement = input.parentElement;
    const existingError = parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    // for the specific Banasthali email format
    const emailPattern = /^[a-zA-Z]{5}\d{5}_[a-zA-Z]+@banasthali\.in$/;
    return emailPattern.test(email);
}

/* 
Regex Explanation:

^[a-zA-Z]{5}: Ensures the email starts with exactly 5 letters.
\d{5}: Followed by exactly 5 digits.
_: Requires an underscore.
[a-zA-Z]+: Matches a name with at least one letter after the underscore.
@banasthali\.in$: Ends with @banasthali.in.
 */
