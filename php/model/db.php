<?php
$pdo = new PDO("mysql:host=localhost;dbname=db_k2230216", "k2230216", "ephahpae", 
[PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); 
// The above is connecting to the database, we specfy the database name, and then we have to give it the username and the password to get into that database.
// The PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION are error messages, and are not actually needed to connect to the database.
// Try and connect using the info above.

?>
