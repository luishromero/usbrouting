<?php

$x = $_GET["lon"];
$y = $_GET["lat"];
$url = "geoserverusb:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=usbrouting:sqlviewcampus&viewparams=x:" . $x . ";y:" . $y . ";&outputformat=application/json";
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
header("Access-Control-Allow-Origin: *");
curl_close($ch);
print_r($result);

?>