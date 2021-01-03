<?php

/**
 *Function to verify if a request to authenticate user is valid
 *
 *@param string $accessKey The key used to verify the request
 *@return Boolean True/False
 */
function isValidAuthRequest($clientKey, $serverKey)
{
	//get the matching key from the DB
	$query = "SELECT * FROM tbl_keys WHERE js_key = '$clientKey' AND php_key = '$serverKey'";
	$result = mysqli_query($GLOBALS['connect'], $query) or die("ERROR");

	if(mysqli_num_rows($result) == 1)
	{
		return true;
	}

	return false;
}

/**
 *Function to verify if a API request is made from trusted source
 *
 *@param string $accessKey The key used to verify the request
 *@param int $userId The Id of the user
 *@return boolean True/False
 */ 
function isValidRequest($accessKey, $userId)
{
	$query = "SELECT * FROM users WHERE id = '$userId'";
	$result = mysqli_query($GLOBALS['connect'], $query) or die("ERROR");
	$row = mysqli_fetch_array($result);
	$sessionKey = $row['session_key'];

	if($accessKey == $sessionKey)
	{
		return true;
	}

	return false;
}

/**
 *Function to verify the key for template
 *
 *@param string $key The key used to verify the request
 *@return boolean True/False
 */ 
function isValidTemplateKey($key)
{
	$query = "SELECT * FROM template_key";
	$result = mysqli_query($GLOBALS['connect'], $query) or die("ERROR");
	$row = mysqli_fetch_array($result);

	if($key == $row['tmp_key'])
	{
		return true;
	}

	return false;
}

?>