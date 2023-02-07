<?php
////////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE SOCIAL MEDIA INFORMATION INFORMATION INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURNS OK/ERROR
//
////////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['accessKey']) && isset($_POST['userId']) && isset($_POST['field'])) {
	require_once('connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId)) {
		$field = filterStr($_POST['field']);
		$value = filterStr($_POST['value']);
		$query = "";

		if($field == "facebook") {
			$query = "UPDATE group_info SET facebook_link = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "instagram") {
			$query = "UPDATE group_info SET instagram_link = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "twitter") {
			$query = "UPDATE group_info SET twitter_link = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "linkedin") {
			$query = "UPDATE group_info SET linkedin_link = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "email") {
			$query = "UPDATE group_info SET email = '$value' WHERE admin_id = '$userId'";
		}

		if($query != "") {
			mysqli_query($connect, $query) or die("ERROR");
		}
		die("Update successful!");
	}
}
die("ERROR");

?>