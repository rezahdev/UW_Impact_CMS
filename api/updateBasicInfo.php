<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE BASIC INFORMATION INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURNS OK/ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['accessKey']) &&isset( $_POST['userId']) && isset($_POST['field']))
{
	require_once('../../cnct/connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$accessKey = filterStr($_POST['accessKey']);
	$userId = filterStr($_POST['userId']);

	if(isValidRequest($accessKey, $userId))
	{
		$field = filterStr($_POST['field']);
		$value = "";
		$logoFile = "";
		$query = "";

		if(isset($_POST['value']))
		{
			$value = filterStr($_POST['value']);
		}
		else if(isset($_FILES['logo']))
		{
			$logoFile = $_FILES['logo'];
		}
		else
		{
			die("ERROR");
		}

		if($field == "logo")
		{
			$path = "logos/";
			$uploadedFileName = basename($logoFile['name']);

			if(getimagesize($logoFile["tmp_name"]) === false)
			{
				die("Please choose an actual image file!");
			}

			$ext = strtolower(pathinfo($uploadedFileName, PATHINFO_EXTENSION));
			if($ext != "jpg" && $ext != "jpeg" && $ext != "png" && $ext != "gif")
			{
				die("Logo must be an image of type jpg, jpeg, png or gif!");
			}

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

			if ($logoFile["size"] > 10000000) 
			{
			    die("The image size is too big. Maximum size allowed is 10 MB.");
			}

			if (move_uploaded_file($logoFile["tmp_name"], $targetFile))
			{
				$logoSrc = "https://cms.uwimpact.net/api/" . $targetFile;
				$query = "UPDATE group_info SET logo = '$logoSrc' WHERE admin_id = '$userId'";
				mysqli_query($connect, $query) or die("ERROR");

				$response = array("logoSrc" => $logoSrc);
				die(stripcslashes(json_encode($response)));
			} 
			else 
			{
			    die("Something went wrong! Please try again!");
			}
			
		}
		else if($field == "name")
		{
			$query = "UPDATE group_info SET name = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "initial")
		{
			$query = "UPDATE group_info SET group_initial = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "description") 
		{
			$query = "UPDATE group_info SET description = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "missionStatement") 
		{
			$query = "UPDATE group_info SET mission_statement = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "visionStatement")
		{
			$query = "UPDATE group_info SET vision_statement = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "whyJoinUs") 
		{
			$query = "UPDATE group_info SET why_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "whoCanJoin") 
		{
			$query = "UPDATE group_info SET who_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "howToJoin") 
		{
			$query = "UPDATE group_info SET how_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "meetingInfo") 
		{
			$query = "UPDATE group_info SET meeting_info = '$value' WHERE admin_id = '$userId'";
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