<?php
require_once './db_conn.php';
// Array containing the data
if (isset($_POST['selling_or_buying'])) {
    // print_r($_POST);

    if (isset($_POST['phone'])) {
        $_POST['phone'] = formatPhoneNumber($_POST['phone']);
    }
    if ($_POST['country'] == 'Canada' && isset($_POST['ca_state'])) {
        $_POST['state'] = $_POST['ca_state'];
    }
    $data = $_POST;
    // print_r($data);
    if ($_POST['selling_or_buying'] == 'Selling') {
        $subject = "Selling: New Property Listing";
        $subtitle = '<p>A new property listing has been submitted:</p>';
        $sql = "INSERT INTO selling_property (country, landing_entry_zip, house_type, home_worth, time_estimate, street, city, seller_state, zip, phone, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssss", $data['country'], $data['landing_entry_zip'], $data['house_type'], $data['home_worth'], $data['time_estimate'], $data['street'], $data['city'], $data['seller_state'], $data['zip'], $data['phone'], $data['comment']);
    } else {
        $subject = "Buying: New Property Request";
        $subtitle = '<p>A new property request has been submitted:</p>';
        $sql = "INSERT INTO buying_property (country, landing_entry_zip, house_type, home_worth, time_estimate, place, phone, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssss", $data['country'], $data['landing_entry_zip'], $data['house_type'], $data['home_worth'], $data['time_estimate'], $data['place'], $data['phone'], $data['comment']);
    }
    $stmt->execute();
    $stmt->close();
    $conn->close();

    // Send email
    $to = "waldo@dhz.me,futuretest45@gmail.com";

    $message = "
<html>
<head>
  <title>New Request</title>
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
  " . $subtitle . "
  <table>";
    foreach ($data as $key => $value) {
        if ($_POST['country'] == 'Canada' && $key == 'seller_state') {
            continue;
        }else if($_POST['country'] == 'United States' && $key == 'ca_seller_state'){
            continue;
        }else if($_POST['country'] == 'Canada' && $key == 'ca_seller_state'){
            $key = 'seller_province';
        }
        if ($_POST['selling_or_buying'] == 'Buying') {
            $key = ($key == 'home_worth') ? 'budget' : $key;
            if ($key == 'street' || $key == 'city' || $key == 'seller_state' || $key == 'zip') {
                continue;
            }
        } else {
            if ($key == 'place') {
                continue;
            }
        }
        $message .= "
    <tr>
      <td>" . ucfirst(implode(' ', explode('_', $key))) . "</td>
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
    $headers .= "From: FastExpert <info@fastexpert.com>" . "\r\n";
    // echo $message;
    if (mail($to, $subject, $message, $headers)) {
        header('location:thank-you.php');
    }
}
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
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
                        <h2 class="sec-title text-center mb-4 fw-bold">Thank you! <br> Your list of agents is on its way
                            to your inbox.</h2>
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
    </body>

</html>