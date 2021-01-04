<?php
////////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE SOCIAL MEDIA INFORMATION INFORMATION INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURNS OK/ERROR
//
////////////////////////////////////////////////////////////////////////////////////

if(isset($_POST['accessKey']) && isset($_POST['userId']) && isset($_POST['field']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$field = filterStr($_POST['field']);
		$value = filterStr($_POST['value']);
		$query = "";

		if($field == "facebook") //If group facbook link update request
		{
			$query = "UPDATE group_info SET facebook_link = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "instagram") //If group instagram link update request
		{
			$query = "UPDATE group_info SET instagram_link = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "twitter") //If group twiiter link update request
		{
			$query = "UPDATE group_info SET twitter_link = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "linkedin") //If group linkedin link update request
		{
			$query = "UPDATE group_info SET linkedin_link = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "email") //If group email address update request
		{
			$query = "UPDATE group_info SET email = '$value' WHERE admin_id = '$userId'";
		}

		if($query != "")
		{
			mysqli_query($connect, $query) or die("ERROR");
		}

		die("Update successful!");
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>