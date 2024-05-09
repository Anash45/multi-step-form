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

function formatPhoneNumber($number)
{
    // Remove any non-numeric characters from the input
    $number = preg_replace("/[^0-9]/", "", $number);

    // If the length of the number is 10, format it as (123)123-1234
    if (strlen($number) === 10) {
        $formattedNumber = "(" . substr($number, 0, 3) . ")" . substr($number, 3, 3) . "-" . substr($number, 6, 4);
    }
    // If the length of the number is 11 and it starts with 1, format it as (123)123-1234
    elseif (strlen($number) === 11 && substr($number, 0, 1) === "1") {
        $formattedNumber = "(" . substr($number, 1, 3) . ")" . substr($number, 4, 3) . "-" . substr($number, 7, 4);
    }
    // Otherwise, return the original number
    else {
        $formattedNumber = $number;
    }

    return $formattedNumber;
}