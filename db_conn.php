<?php
// Database connection parameters
// https://auth-db749.hstgr.io/index.php?route=/database/structure&server=1&db=u956940883_kevin_fang
$servername = "localhost";
$username = "u956940883_kevin_fang";
$password = "6CoCOqM[4!";
$database = "u956940883_kevin_fang";


// $servername = "localhost";
// $username = "root";
// $password = "root";
// $database = "kevin_fang";


// Insert data into the SQL table
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}