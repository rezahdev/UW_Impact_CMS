<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE SOCIAL MEDIA INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE SOCIAL MEDIA INFO OR ERROR
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
		$query = "SELECT * FROM group_info WHERE admin_id = '$userId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);

		$responseArr = array("facebook" => htmlspecialchars($row['facebook_link']),
	                         "instagram" => htmlspecialchars($row['instagram_link']),
	                         "twitter" => htmlspecialchars($row['twitter_link']),
	                         "linkedin" => htmlspecialchars($row['linkedin_link']),
	                         "email" => htmlspecialchars($row['email']));

		die(json_encode($responseArr));		
	}
	die("INVALID_REQUEST");
}
die("ERROR");	

?>