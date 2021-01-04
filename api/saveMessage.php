<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO SAVE MESSAGE OF A GROUP.
//THE SCRIPT ACCEPTS 5 POST VALUES AND RETURN THE OK OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['key']) && isset($_POST['site']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$identifier = filterStr($_POST['site']);
	$name = filterStr($_POST['name']);
	$email = filterStr($_POST['email']);
	$message = filterStr($_POST['message']);
	$dateTime = date("F j, Y, g:i a");
	$key = filterStr($_POST['key']);

	if(isValidTemplateKey($key))
	{
		//Query ot get the group id for this user
		$query = "SELECT id FROM group_info WHERE identifier = '$identifier'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		//Query to get the team info for this group
		$query = "SELECT * FROM event_info WHERE group_id = '$groupId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$responseArr = array();

		//Save the message into DB
		$query = "INSERT INTO messages (group_id, sender_name, sender_email, message, date_time) VALUES ('$groupId', '$name', '$email', '$message', '$dateTime')";
		mysqli_query($connect, $query) or die("ERROR");

		die(json_encode("OK"));		
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>