<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO UPDATE BASIC INFORMATION INFORMATION OF A GROUP.
//THE SCRIPT ACCEPTS 4 POST VALUES AND RETURNS OK/ERROR
//
/////////////////////////////////////////////////////////////////////////////////

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

		if($field == "logo") //If group logo update request
		{
			$path = "logos/";
			$uploadedFileName = basename($logoFile['name']);

			//Check if the image is real
			if(getimagesize($logoFile["tmp_name"]) === false)
			{
				die("Please choose an actual image file!");
			}

			//check if the file is of supported extension
			$ext = strtolower(pathinfo($uploadedFileName, PATHINFO_EXTENSION));

			if($ext != "jpg" && $ext != "jpeg" && $ext != "png" && $ext != "gif")
			{
				die("Logo must be an image of type jpg, jpeg, png or gif!");
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
			if ($logoFile["size"] > 10000000) 
			{
			    die("The image size is too big. Maximum size allowed is 10 MB.");
			}

			//Upload the image
			if (move_uploaded_file($logoFile["tmp_name"], $targetFile))
			{
				//save the image src in DB
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
		else if($field == "name") //If group name update request
		{
			$query = "UPDATE group_info SET name = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "initial") //If group initial update request
		{
			$query = "UPDATE group_info SET group_initial = '$value' WHERE admin_id = '$userId'";
		}	
		else if($field == "description") //If group description update request
		{
			$query = "UPDATE group_info SET description = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "missionStatement") //If mission statement update request
		{
			$query = "UPDATE group_info SET mission_statement = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "visionStatement") //If vision statement update request
		{
			$query = "UPDATE group_info SET vision_statement = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "whyJoinUs") //If why join us statement update request
		{
			$query = "UPDATE group_info SET why_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "whoCanJoin") //If who can join statement update request
		{
			$query = "UPDATE group_info SET who_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "howToJoin") //If how to join statement statement update request
		{
			$query = "UPDATE group_info SET how_to_join = '$value' WHERE admin_id = '$userId'";
		}
		else if($field == "meetingInfo") //If meeting information update request
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