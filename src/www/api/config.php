<?php

	// CHANGE THESE SETTINGS TO POINT TO YOUR DATABASE 

	define('DB_USER', "root"); // db user
	define('DB_PASSWORD', "l367hG"); // db password (mention your db password here)
	define('DB_DATABASE', "letterbox"); // database name
	define('DB_SERVER', "127.0.0.1"); // db server
	
	// CHANGE THESE SETTINGS TO PROTECT YOUR DATA
	define('USE_ADMIN_LOGIN',false); // if there are problems with the authentification mechanism turn this to false
	define('ADMIN_USERNAME',"admin"); // username for admin interface
	define('ADMIN_PASSWORD',"1234"); //password for admin interface

	/* 
		NO NEED TO CHANGE ANYTHING BELOW THIS LINE
	 	------------------------------------------
	*/
	
	define('DB_TABLE_SUBMISSIONS',"submissions");

	define('DIR_SUBMISSION_FILES',"../data/submissions/");
	
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL | E_STRICT);

