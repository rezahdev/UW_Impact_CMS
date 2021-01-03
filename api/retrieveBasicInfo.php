<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE BASIC INFORMATION ABOUT A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE BASIC INFORMATION OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json' );

session_start();

if(isset($_POST['accessKey']) && isset($_POST['userId']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$query = "SELECT * FROM group_info WHERE admin_id = '$userId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);

		$responseArr = array("logoSrc" => $row['logo'],
			                 "name" => htmlspecialchars($row['name']),
	                         "initial" => htmlspecialchars($row['group_initial']),
	                         "description" => htmlspecialchars($row['description']),
	                         "missionStatement" => htmlspecialchars($row['mission_statement']),
	                         "visionStatement" => htmlspecialchars($row['vision_statement']),
	                      	 "whyJoinUs" => htmlspecialchars($row['why_to_join']),
	                      	 "whoCanJoin" => htmlspecialchars($row['who_to_join']),
	                      	 "howToJoin" => htmlspecialchars($row['how_to_join']),
	                      	 "meetingInfo" => htmlspecialchars($row['meeting_info']));

		die(json_encode($responseArr));		
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>