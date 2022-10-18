<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO DELETE A MEMBER OR AN EVENT FROM THE DATABASE.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURNS THE ACCEPTED POST VALUES OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['accessKey']) 
	&& isset($_POST['userId']) 
	&& isset($_POST['type']) 
	&& isset($_POST['id']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$type = filterStr($_POST['type']);
		$id = filterStr($_POST['id']);

		if($type == "member")
		{
			$query = "DELETE FROM team_info WHERE id = '$id'";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$responseArr = array("type" => $type, "id" => $id);
			die(json_encode($responseArr));
		}	
		else if($type == "event") 
		{
			$query = "DELETE FROM event_info WHERE id = '$id'";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$responseArr = array("type" => $type, "id" => $id);
			die(json_encode($responseArr));
		}	
		else if($type == "message")
		{
			$query = "DELETE FROM messages WHERE id = '$id'";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$responseArr = array("type" => $type, "id" => $id);
			die(json_encode($responseArr));
		}
	}
}

die("ERROR");	

?>