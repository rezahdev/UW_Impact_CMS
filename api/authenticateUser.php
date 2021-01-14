<?php
/////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO VERIFY USER'S LOGIN CREDENTIALS.
//THE SCRIPT ACCEPTS 3 POST VALUES AND RETURN A NEW SESSION KEY OR ERROR
//
/////////////////////////////////////////////////////////////////////
require_once('accessController.php');

if(isset($_POST['clientKey']) 
	&& isset($_POST['serverKey'])
	&& isset($_POST['username']) 
	&& isset($_POST['password']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$clientKey = filterStr($_POST['clientKey']);
	$serverKey = filterStr($_POST['serverKey']);
	$username = filterStr($_POST['username']);
	$password = filterStr($_POST['password']);

	if(isValidAuthRequest($clientKey, $serverKey))
	{
		$query = "SELECT * FROM users WHERE username = '$username'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		
		if(mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_array($result);
			$hash = $row['password'];

			if(password_verify($password, $hash))
			{
				$userId = $row['id'];
				$websiteURL = $row['website_url'];
				$newKey = randomStr(32);

				//Save the new key in the database for this user
				$query = "UPDATE users SET session_key = '$newKey' WHERE id = '$userId'";
				$result = mysqli_query($connect, $query) or die("ERROR");

				$responseArr = array("sessionKey" => $newKey, "userId" => $userId, "websiteURL" => $websiteURL);

				die(json_encode($responseArr));
			}
		}
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR


/**
 *Function to generate a random string of a certain length
 *
 *@param int $length The length of the string
 *@return string $randomStr The random string
 */
function randomStr($length) 
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomStr = '';

    for ($i = 0; $i < $length; $i++) 
    {
        $randomStr .= $characters[rand(0, $charactersLength - 1)];
    }

    return $randomStr;
}



?>