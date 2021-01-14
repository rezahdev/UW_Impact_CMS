<?php

$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "https://uwimpact.net"
	|| $http_origin == "https://msa.uwimpact.net" 
	|| $http_origin == "https://isu.uwimpact.net"
	|| $http_origin == "https://icsa.uwimpact.net"
	|| $http_origin == "https://improv.uwimpact.net"
	|| $http_origin == "https://cx3.uwimpact.net" 
	|| $http_origin == "https://pms.uwimpact.net"
	|| $http_origin == "https://psss.uwimpact.net"
	|| $http_origin == "https://psa.uwimpact.net"
	|| $http_origin == "https://cms.uwimpact.net"
	|| $http_origin == "http://uwimpact.net"
	|| $http_origin == "http://msa.uwimpact.net" 
	|| $http_origin == "http://isu.uwimpact.net"
	|| $http_origin == "http://icsa.uwimpact.net"
	|| $http_origin == "http://improv.uwimpact.net"
	|| $http_origin == "http://cx3.uwimpact.net" 
	|| $http_origin == "http://pms.uwimpact.net"
	|| $http_origin == "http://psss.uwimpact.net"
	|| $http_origin == "http://psa.uwimpact.net"
	|| $http_origin == "http://cms.uwimpact.net")
{  
    header("Access-Control-Allow-Origin: $http_origin");
}

?>