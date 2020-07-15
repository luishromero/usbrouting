<?php

$from = $_GET["source"];
$to = $_GET["target"];
$url = "http://ec2-18-229-127-50.sa-east-1.compute.amazonaws.com:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=usbrouting2:usbrouting_path2&viewparams=source:" . $from . ";target:" . $to . ";&outputformat=application/json";
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
header("Access-Control-Allow-Origin: https://www.luishromero.com");
curl_close($ch);
print_r($result);

?>  