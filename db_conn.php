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
    // Add "+1" at the start
    $formattedNumber = "+1";

    // Extract area code
    $areaCode = substr($number, 0, 3);
    $formattedNumber .= "($areaCode)";

    // Extract first 3 digits
    $firstThree = substr($number, 3, 3);

    // Extract last 4 digits
    $lastFour = substr($number, 6, 4);

    // Concatenate the formatted number
    $formattedNumber .= "$firstThree-$lastFour";

    return $formattedNumber;
}