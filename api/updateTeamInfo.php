<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE TEAM INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 6 POST VALUES AND RETURNS { ID, NAME, DESIGNATION } OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json' );

session_start();

if(isset($_POST['accessKey']) && isset($_POST['userId']) && isset($_POST['mode']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$name = filterStr($_POST['name']);
		$designation = filterStr($_POST['designation']);
		$memberId = filterStr($_POST['memberId']);
		$mode = filterStr($_POST['mode']);
		$picture = "https://cms.uwimpact.net/api/team_pics/nopic.png";

		//Check if the request also contains the member picture
		if(isset($_FILES['picture']))
		{
			$path = "team_pics/";
			$uploadedFileName = basename($_FILES['picture']['name']);

			//Check if the image is real
			if(getimagesize($_FILES['picture']["tmp_name"]) === false)
			{
				die("Please choose an actual image file!");
			}

			//check if the file is of supported extension
			$ext = strtolower(pathinfo($uploadedFileName, PATHINFO_EXTENSION));

			if($ext != "jpg" && $ext != "jpeg" && $ext != "png" && $ext != "gif")
			{
				die("Picture must be an image of type jpg, jpeg, png or gif!");
			}

			//Rename the file with an unique name
			$fileName = "";

			while(1)
			{
				$fileName = round(microtime(true)).mt_rand() . '.' . $ext;

				if(!file_exists($path . $fileName))
				{
					break;
				}
			}
			$targetFile = $path . $fileName;

			//check ofr sizes
			if ($_FILES['picture']["size"] > 10000000) 
			{
			    die("The image size is too big. Maximum size allowed is 10 MB.");
			}

			//Upload the image
			if (move_uploaded_file($_FILES['picture']["tmp_name"], $targetFile))
			{
				//save the image src in DB
				$picture = "https://cms.uwimpact.net/api/" . $targetFile;
			} 
			else 
			{
			    die("Something went wrong! Please try again!");
			}
		}

		if($mode == "add") //If the request is to create new member
		{
			//Get the group_id from group_info
			$query = "SELECT * FROM group_info WHERE admin_id = '$userId'";
			$result = mysqli_query($connect, $query) or die(mysqli_error($connect));
			$row = mysqli_fetch_array($result);
			$groupId = $row['id'];

			//Insert the new member info
			$query = "INSERT INTO team_info (group_id, name, designation, picture) VALUES ('$groupId', '$name', '$designation', '$picture')";
			mysqli_query($connect, $query) or die(mysqli_error($connect));

			$memberId = mysqli_insert_id($connect);
			$responseArr = array("id" => $memberId, "name" => $name, "designation" => $designation, "picture" => $picture);

			die(json_encode($responseArr));
		}	
		else if($mode == "edit") //If the request is to edit existing member
		{
			if(isset($_FILES['picture']))
			{
				$query = "UPDATE team_info SET name = '$name', designation = '$designation', picture = '$picture' WHERE id = '$memberId'";
				mysqli_query($connect, $query) or die(mysqli_error($connect));
			}
			else
			{
				$query = "UPDATE team_info SET name = '$name', designation = '$designation' WHERE id = '$memberId'";
				mysqli_query($connect, $query) or die(mysqli_error($connect));

				//Get the member picture from the DB
				$query = "SELECT * FROM team_info WHERE id = '$memberId'";
				$result = mysqli_query($connect, $query) or die("ERROR");
				$row = mysqli_fetch_array($result);
				$picture = $row['picture'];
			}

			$responseArr = array("id" => $memberId, "name" => $name, "designation" => $designation, "picture" => $picture);
			die(json_encode($responseArr));
		}	
	}
}

die("ERROR");	//If the request fails any condition, returns ERROR

?>