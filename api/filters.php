<?php

/**
 *Function to filter a string
 *
 *@param string $string The string to be filtered
 *@return string $string The filtered string
 */
function filterStr($string) {
	return mysqli_real_escape_string($GLOBALS["connect"], $string);
}

?>