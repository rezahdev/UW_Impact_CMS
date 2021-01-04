<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO RETRIEVE TEAM INFORMATION ABOUT A GROUP.
//THE SCRIPT ACCEPTS 2 POST VALUES AND RETURN THE TEAM INFORMATION OR ERROR
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

		$query = "SELECT * FROM group_info WHERE identifier = '$identifier'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$row = mysqli_fetch_array($result);
		$groupId = $row['id'];

		//Query to get the team info for this group
		$query = "SELECT * FROM team_info WHERE group_id = '$groupId'";
		$result = mysqli_query($connect, $query) or die("ERROR");
		$responseArr = array();
		
		while($row = mysqli_fetch_array($result))
		{
			$memberId = $row['id'];
			$name = htmlspecialchars($row['name']);
			$designation = htmlspecialchars($row['designation']);
			$picture = $row['picture'];

			$memberInfo = array("name" => $name, "designation" => $designation, "picture" => $picture);
			array_push($responseArr, $memberInfo);
		}

		die(json_encode($responseArr));	
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>