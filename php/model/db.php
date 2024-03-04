<?php
$serverName = "localhost";
$database = "db_k2230216";
$username = "k2230216";
$password = "ephahpae";

$pdo = new PDO("mysql:host=$serverName;dbname=$database", $username, $password, 
[PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
// The above is connecting to the database, we specfy the database name, and then we have to give it the username and the password to get into that database.
// The PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION are error messages, and are not actually needed to connect to the database.
// Try and connect using the info above.

function getAllUsers()
{
    global $pdo; // In PHP if you want to use a variable that was declared in the “main” body of code within a function, you must explicitly state so using the global keyword.
    $statement = $pdo->prepare("SELECT * FROM Accounts");
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_CLASS, "User");
    // In the above line the "Student" here is referring to the class Student in the student.php file, we are able to do this because of the studentlist_controller.php file
    // So the above line is basically saying store each student from the database within the students table as a Student object (where all the functions and variables will be filled automatically with the 
    // magic methods) in the variable results, then we return that back to the studentlist_controller.php as this is where the function getAllStudents() is being called at.
    return $results;
}

function getUsersByID($id)
{
    global $pdo;
    $statement = $pdo->prepare("SELECT * FROM Accounts WHERE id = ?");
    $statement->execute([$id]);
    $statement->setFetchMode(PDO::FETCH_CLASS, "User");
    $result = $statement->fetch();
    return $result;
}

function addNewUser($un, $gn, $fn, $email)
{
    global $pdo;
    $statement = $pdo->prepare("INSERT INTO Accounts (username, givenName, familyName, email) VALUES (?, ?, ?, ?)");
    $statement->execute([$un, $gn, $fn, $email]);
}
?>
