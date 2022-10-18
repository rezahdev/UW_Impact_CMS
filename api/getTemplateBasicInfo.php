<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE BASIC INFORMATION ABOUT A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE BASIC INFORMATION OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['site']) && isset($_POST['key']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');
	
	if(isValidTemplateKey(filterStr($_POST['key'])))
	{
		$identifier = filterStr($_POST['site']);

		$query = "SELECT * FROM group_info WHERE identifier = 'uwimpact'"; //Replace uwimpact with $identifier
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
		                     "meetingInfo" => htmlspecialchars($row['meeting_info']),
		                     "facebook" => htmlspecialchars($row['facebook_link']),
	                         "instagram" => htmlspecialchars($row['instagram_link']),
	                         "twitter" => htmlspecialchars($row['twitter_link']),
	                         "linkedin" => htmlspecialchars($row['linkedin_link']),
	                         "email" => htmlspecialchars($row['email']));

		die(json_encode($responseArr));	
	}
}

die("ERROR");

?>