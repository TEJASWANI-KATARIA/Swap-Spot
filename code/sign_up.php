<?php
// Include the database connection file
include 'db_connection.php';
session_start();

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullName = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirm_password']);
    $errors = [];

    // Full Name Validation
    if (empty($fullName)) {
        $errors[] = "Full Name is required.";
    } elseif (!preg_match("/^[a-zA-Z ]+$/", $fullName)) {
        $errors[] = "Full Name can only contain letters and spaces.";
    }

    // Email Validation
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    } elseif (!preg_match("/^[a-zA-Z]{5}\d{5}_[a-zA-Z]+@banasthali\.in$/", $email)) {
        $errors[] = "Please use a valid Banasthali email.";
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $errors[] = "Email is already registered.";
        }
        $stmt->close();
    }

    // Password Validation
    if (empty($password)) {
        $errors[] = "Password is required.";
    } elseif (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }

    // Confirm Password Validation
    if (empty($confirmPassword)) {
        $errors[] = "Confirm Password is required.";
    } elseif ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    // If no errors, insert data
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $fullName, $email, $hashedPassword);
        if ($stmt->execute()) {
            $_SESSION['user_loggedin'] = true;
            $_SESSION['user_email'] = $email;
            echo "<p style='color:green;'>Registration successful! You can now <a href='sell.php'>proceed to sell items</a>.</p>";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
    $conn->close();
}
?>
