<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE MESSAGES OF A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE MESSAGES OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['accessKey']) && isset($_POST['userId'])) {
	require_once('connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId)) {
		//Get the group id
		$query = "SELECT * FROM group_info WHERE admin_id = '$userId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		//Get the messages
		$query = "SELECT * FROM messages WHERE group_id = '$groupId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$responseArr = array();

		while($row = mysqli_fetch_array($result)) {
			$response = array("id" => $row['id'],
							  "name" => $row['sender_name'],
							  "email" => $row['sender_email'],
							  "message" => $row['message'],
							  "dateTime" => $row['date_time']);

			array_push($responseArr, $response);
		}
		die(json_encode($responseArr));		
	}
	die("INVALID_REQUEST");
}
die("ERROR");

?>