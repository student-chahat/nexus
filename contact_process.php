<?php
// Database connection
$host = 'localhost';
$db   = 'nexus_digital';
$user = 'root';
$pass = ''; // WAMP default

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize POST data
$name    = htmlspecialchars(trim($_POST['name'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
$service = htmlspecialchars(trim($_POST['service'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    echo "Please fill in all required fields.";
    exit;
}

// Prepare and execute insert query
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $phone, $service, $message);

if ($stmt->execute()) {
    echo "Your message has been sent successfully!";
} else {
    echo "Something went wrong. Please try again later.";
}

$stmt->close();
$conn->close();
?>
