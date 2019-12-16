<?php
$data = array(
  'first_name'  => $_GET['first_name'],
  'last_name'   => $_GET['last_name'],
  'email'       => $_GET['email'],
  'courses'     => 'Boa saudaÁ„o.'
);

$url = "http://evera.challenge.trinom.io/api/peoples";

$options = array(
  'http' => array(
    'method'  => 'POST',
    'content' => json_encode( $data ),
    'header'=>  "Content-Type: application/json\r\n" .
                "Accept: application/json\r\n"
    )
);

$context  = stream_context_create( $options );
$result = file_get_contents( $url, false, $context );
$response = json_decode( $result );
?>