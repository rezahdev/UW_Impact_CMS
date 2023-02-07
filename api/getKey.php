<?php
/////////////////////////////////////////////////////////////////////////////////
//
//PHP SCRIPT TO SEND ACCESS KEY TO THE APP..
//THE SCRIPT ACCEPTS 1 POST VALUE AND RETURNS THE KEY OR ERROR
//
/////////////////////////////////////////////////////////////////////////////////

require_once('accessController.php');

if(isset($_POST['JSKey'])) {
	require_once('connect_CMS_DB.php');
	require_once('verifications.php');
	require_once('filters.php');

	$JSKey = filterStr($_POST['JSKey']);
	$time = time();
	$PHPKey = randomStr(32);

	$query = "INSERT INTO tbl_keys (js_key, php_key, entry_time) VALUES ('$JSKey', '$PHPKey', '$time')";
	mysqli_query($connect, $query) or die("ERROR");

	die(json_encode(array("key" => $PHPKey)));
}
die("ERROR");

/**
 *Function to generate a random string of a certain length
 *
 *@param int $length The length of the string
 *@return string $randomStr The random string
 */
function randomStr($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomStr = '';

    for ($i = 0; $i < $length; $i++) {
        $randomStr .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomStr;
}

?>