// Selecting the form and input fields
const form = document.querySelector('form');
const fullName = document.querySelector('input[placeholder="Full Name"]');
const email = document.querySelector('input[placeholder="Email"]');
const password = document.querySelector('input[placeholder="Password"]');
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


// Function to simulate OTP generation and sending to email
function sendOtpToEmail(email) {
    // Simulating OTP generation (In real-world, this would involve server-side logic)
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP sent to ${email}: ${generatedOtp}`); // Simulate sending OTP to email

    return generatedOtp;
}

// Add an OTP field and handle OTP verification
let generatedOtp = ""; // Store generated OTP

// Modify form submission to show OTP input after basic validation
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent normal form submission

    if (!validateInputs()) {
        return; // Stop if validation fails
    }

    // If validation is successful, generate OTP
    generatedOtp = sendOtpToEmail(email.value.trim());

    // Show OTP input and button
    document.querySelector('.otp-box').style.display = 'flex';
    document.getElementById('verifyOtpBtn').style.display = 'block';
    form.querySelector('button[type="submit"]').style.display = 'none'; // Hide the sign-up button
});

// OTP verification button
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const otpField = document.getElementById('otp');

verifyOtpBtn.addEventListener('click', function () {
    const enteredOtp = otpField.value.trim();

    if (enteredOtp === generatedOtp) {
        alert("Sign up successful! OTP verified.");
        form.reset(); // Reset the form after successful sign-up
        // Optionally, redirect to another page here
    } else {
        showError(otpField, "Invalid OTP. Please try again.");
    }
});


// Event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevents form from submitting automatically

    // Validating each field
    if (!validateInputs()) {
        return;  // Stops the process if validation fails
    }

    // All validations passed
    alert("Sign up successful!");
    form.reset();  // Reset the form after successful sign-up
});

// Function to validate all fields
function validateInputs() {
    let isValid = true;
    
    // Check if full name is empty
    if (fullName.value.trim() === "") {
        showError(fullName, "Full Name is required");
        isValid = false;
    } else {
        clearError(fullName);
    }

    // Check if email is empty or not valid
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email");
        isValid = false;
    } else {
        clearError(email);
    }

    // Check if password is empty or too short
    if (password.value.trim() === "") {
        showError(password, "Password is required");
        isValid = false;
    } else if (password.value.trim().length < 6) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    } else {
        clearError(password);
    }

    // Check if confirm password matches the password
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

// Function to clear the error messages
function clearError(input) {
    const parentElement = input.parentElement;
    const existingError = parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
