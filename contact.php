<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic validation
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required.";
        exit;
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Recipient email (your email)
    $to = "info@fekonsult.se";  // Replace with your actual email
    $subject = "New Contact Form Submission";

    // Email body
    $body = "You have received a new message from your website contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: info@fekonsult.se\r\n";  // Replace with your domain email
    $headers .= "Reply-To: $email\r\n";

    // Try sending the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to thank you page
        header("Location: thank-you.html");
        exit;
    } else {
        echo "Failed to send the message. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
