<?php
session_start();

// Handle login logic
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Include database connection
    include 'db_connection.php';

    // Query to check user credentials
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashedPassword);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashedPassword)) {
            // Set session variables
            $_SESSION['user_loggedin'] = true;
            $_SESSION['user_id'] = $id;
            // Redirect to the home page (or any page after login)
            header("Location: home.html");  // Replace with your actual homepage URL or path
            exit;
            $success = "You have successfully logged in!";
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "No account found with this email.";
    }
    $stmt->close();
    $conn->close();
}
?>