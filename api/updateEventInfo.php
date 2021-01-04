<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE EVENT  INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 8 POST VALUES AND RETURNS { Event info object } OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

if(isset($_POST['accessKey']) && isset($_POST['userId']) && isset($_POST['mode']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$title = filterStr($_POST['title']);
		$description = filterStr($_POST['description']);
		$date = filterStr($_POST['date']);
		$time = filterStr($_POST['time']);
		$regLink = filterStr($_POST['regLink']);
		$eventId = filterStr($_POST['eventId']);
		$mode = filterStr($_POST['mode']);

		//Get the group_id from group_info
		$query = "SELECT * FROM group_info WHERE admin_id = '$userId'";
		$result = mysqli_query($connect, $query) or die(mysqli_error($connect));
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		if($mode == "add") //If the request is to create new member
		{
			$query = "INSERT INTO event_info (group_id, title, description, event_date, event_time, registration_link) VALUES ('$groupId', '$title', '$description', '$date', '$time', '$regLink')";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$eventId = mysqli_insert_id($connect);
			$responseArr = array("id" => $eventId, "title" => $title, "description" => $description, "date" => $date, "time" => $time, "regLink" => $regLink);

			die(json_encode($responseArr));
		}	
		else if($mode == "edit") //If the request is to edit existing member
		{
			$query = "UPDATE event_info SET title = '$title', description = '$description', event_date = '$date', event_time = '$time', registration_link = '$regLink' WHERE id = '$eventId'";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$responseArr = array("id" => $eventId, "title" => $title, "description" => $description, "date" => $date, "time" => $time, "regLink" => $regLink);
			die(json_encode($responseArr));
		}	
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>