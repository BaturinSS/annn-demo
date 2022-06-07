<?php

include 'globals.php';

include 'fields.php';
include 'emails.php';

$fields = extractFields($_POST);

sendEmail($fields);

$response = (object)[
    'message' => "Server is working !!!"
];

echo json_encode($response);
?>