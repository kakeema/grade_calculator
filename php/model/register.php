<?php
include 'db.php'; // Include database connection file

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $familyName = $_POST['familyName'];
    $givenName = $_POST['givenName'];
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    try {
        // SQL query to insert into database
        $query = "INSERT INTO Accounts (username, givenName, familyName, email, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($query);
        
        // Hash the password before storing
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Execute the query
        $stmt->execute([$userName, $givenName, $familyName, $email, $hashed_password]);

        echo "New record created successfully";
        header('Location: success_page.php'); // Redirect to a success page
        exit();

    } catch(Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

