<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE EVENTS INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE EVENTS INFORMATION OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['key']) && isset($_POST['site'])) {
	require_once('connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$identifier = filterStr($_POST['site']);
	$key = filterStr($_POST['key']);

	if(isValidTemplateKey($key)) {
		//Query to get the group id for this user
		$query = "SELECT id FROM group_info WHERE identifier = 'uwimpact"; //Replace uwimpact with $identifier
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		//Query to get the team info for this group
		$query = "SELECT * FROM event_info WHERE group_id = '$groupId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$responseArr = array();

		while($row = mysqli_fetch_array($result)) {
			$eventId = $row['id'];
			$title = htmlspecialchars($row['title']);
			$description = htmlspecialchars($row['description']);
			$date = htmlspecialchars($row['event_date']);
			$time = htmlspecialchars($row['event_time']);
			$registrationLink = htmlspecialchars($row['registration_link']);

			$eventInfo = array("title" => $title, 
							   "description" => $description,
							   "date" => $date,
							   "time" => $time,
						       "registrationLink" => $registrationLink);

			array_push($responseArr, $eventInfo);
		}
		die(json_encode($responseArr));		
	}
}
die("ERROR");

?>