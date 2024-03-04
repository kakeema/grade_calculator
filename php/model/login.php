<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST['userName'];
    $password = $_POST['password'];

    try {
        $query = "SELECT * FROM Accounts WHERE username = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$userName]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            // if Password is correct then store user data in the sessions variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Redirect to a page
            header('Location: ../../index.html'); // changes to specified page.
            exit();
        } else {
            // When invalid credentials
            echo "Invalid username or password.";
        }
    } catch(Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
