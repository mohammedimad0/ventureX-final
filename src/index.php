<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $branch = $_POST['branch'];
    $message = $_POST['message'];

    // Database configuration
    $servername = "localhost";
    $username   = "root";    // change if different
    $password   = "";        // change if you set one
    $database   = "venturex";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO members (name, email, phone, branch, message) VALUES (?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("sssss", $name, $email, $phone, $branch, $message);

        // Execute the statement
        if ($stmt->execute()) {
            header("Location: index2.html?status=success#contact");
            exit();
        } else {
            header("Location: index2.html?status=error&message=" . urlencode($stmt->error) . "#contact");
            exit();
        }

        // Close statement
        $stmt->close();
    } else {
        header("Location: index2.html?status=error&message=" . urlencode($conn->error) . "#contact");
        exit();
    }

    // Close connection
    $conn->close();
} else {
    header("Location: index2.html?status=error&message=Invalid request method#contact");
    exit();
}
?>
