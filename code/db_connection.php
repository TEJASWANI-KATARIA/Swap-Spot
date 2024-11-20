<?php
$host = "localhost"; // Hostname
$db_user = "root";   // Database username
$db_password = "";   // Database password
$db_name = "swapspot"; // Database name

// Create connection
$conn = new mysqli($host, $db_user, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
