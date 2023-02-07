<?php

$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "https://uwimpact.net") {  
    header("Access-Control-Allow-Origin: $http_origin");
}

?>