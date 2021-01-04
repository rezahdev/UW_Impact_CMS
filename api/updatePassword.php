<?php
/////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE USER'S PASSWORD.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURN OK OR ERROR
//
/////////////////////////////////////////////////////////////////////

if(isset($_POST['accessKey']) 
	&& isset($_POST['userId']) 
	&& isset($_POST['currentPassword']) 
	&& isset($_POST['newPassword']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);
	$currentPassword = filterStr($_POST['currentPassword']);
	$newPassword = filterStr($_POST['newPassword']);

	if(isValidRequest($accessKey, $userId))
	{
		$query = "SELECT * FROM users WHERE id = '$userId'";
		$result = mysqli_query($connect, $query) or die("ERROR");

		if(mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_array($result);
			$hash = $row['password'];

			if(password_verify($currentPassword, $hash))
			{
				$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

				//Update the password
				$query = "UPDATE users SET password = '$newPassword' WHERE id = '$userId'";
				$result = mysqli_query($connect, $query) or die("ERROR");

				$responseArr = array("isUpdateSuccessful" => "1",
				  "message" => "Your password has been changed. Please login again with the new password.");

				die(json_encode($responseArr));
			}
			else
			{
				$responseArr = array("isUpdateSuccessful" => "0",
				  "message" => "Current password is not correct.");

				die(json_encode($responseArr));
			}
		}
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>