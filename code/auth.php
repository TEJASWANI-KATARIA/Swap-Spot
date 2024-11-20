<?php
session_start();

function checkLogin() {
    if (!isset($_SESSION['user_loggedin']) || $_SESSION['user_loggedin'] !== true) {
        header("Location: sign_up.php");
        exit;
    }
}
