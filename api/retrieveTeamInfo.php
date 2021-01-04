<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE TEAM INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE TEAM INFORMATION OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////


if(isset($_POST['accessKey']) && isset($_POST['userId']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		//Query ot get the group id for this user
		$query = "SELECT id FROM group_info WHERE admin_id = '$userId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		//Query to get the team info for this group
		$query = "SELECT * FROM team_info WHERE group_id = '$groupId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$responseArr = array();

		//Process the result
		while($row = mysqli_fetch_array($result))
		{
			$memberId = $row['id'];
			$name = htmlspecialchars($row['name']);
			$designation = htmlspecialchars($row['designation']);
			$picture = $row['picture'];

			$memberInfo = array("id" => $memberId, "name" => $name, "designation" => $designation, "picture" => $picture);
			array_push($responseArr, $memberInfo);
		}

		die(json_encode($responseArr));		
	}
	else
	{
		die("INVALID_REQUEST");
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>