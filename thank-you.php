<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "root";
$database = "kevin_fang";

// Array containing the data
$data = $_POST;

// Insert data into the SQL table
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// print_r($data);
$sql = "INSERT INTO PropertyListings (selling_buying, house_type, home_worth, time_estimate, street, city, seller_state, phone, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $data['selling_buying'], $data['house_type'], $data['home_worth'], $data['time_estimate'], $data['street'], $data['city'], $data['seller_state'], $data['phone'], $data['comment']);
$stmt->execute();
$stmt->close();
$conn->close();

// Send email
$to = "f4futuretech@gmail.com";
$subject = "New Property Listing";
$message = "
<html>
<head>
  <title>New Property Listing</title>
  <style>
    table {
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
    }
  </style>
</head>
<body>
  <p>A new property listing has been submitted:</p>
  <table>
    <tr>
      <th>Field</th>
      <th>Value</th>
    </tr>";
foreach ($data as $key => $value) {
    $message .= "
    <tr>
      <td>{$key}</td>
      <td>{$value}</td>
    </tr>";
}
$message .= "
  </table>
</body>
</html>
";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From:  <futuretest45@gmail.com>" . "\r\n";

if(mail($to, $subject, $message, $headers)){
    header('location:thank-you.php');
}
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FastExpert</title>
        <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="./assets/css/style.css">
    </head>

    <body>
        <header class="navbar navbar-white bg-white">
            <div class="container-fluid">
                <a href="./index.html" class="navbar-brand">
                    <img src="./assets/img/FE-Logo.svg" alt="Logo" height="30">
                </a>
                <ul class="nav">
                    <li class="nav-item">
                        <a href="tel:+1(800) 319-0511" class="nav-link py-0">Call (800) 319-0511</a>
                    </li>
                </ul>
            </div>
        </header>
        <main>
            <section class="sec-2 py-5">
                <div class="container py-4">
                    <div class="box box-big pb-5">
                        <h2 class="sec-title text-center mb-4 fw-bold">Thank you! <br> Your list of agents is on its way to your
                            inbox.</h2>
                        <p class="mb-5 text-center"> Our client service team will be in touch to get things started.
                        </p>
                        <p class="mb-0 text-center"> If you have any issues or questions, please contact us at (800)
                            319-0511</p>
                        <div class="mx-5">
                            <iframe src="https://www.youtube.com/embed/kjzIP2W_urw" height="392" frameborder="0"
                                class="py-4 w-100 rounded-lg"></iframe>
                        </div>
                        <p class="text-center">
                            <a href="#" class="text-primary text-decoration-underline">Return to our home page</a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
        <script src="./assets/js/jquery-3.6.1.min.js"></script>
        <script src="./assets/js/bootstrap.bundle.min.js"></script>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwa3l7oekDnz3VVsTrsnLR17NslkgHqvA&libraries=places"></script>
        <script src="./assets/js/script.js"></script>
    </body>

</html>