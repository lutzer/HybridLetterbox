
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>HybridLetterbox Setup</title>
  </head>
  <body>
  <div class="admin-container">
<?php

    require 'api/config.php';

    echo "<h1>De-Routing Setup</h1>";
    echo "<ul>";

    printTestResult("Database Connection Test",testDatabaseConnection());
    printTestResult("Create Database Tables",createDatabaseTables());
    printTestResult("Check Data Directory",testDataDirWritable());
    //printTestResult("Test Web Api",testWebApi());

    echo "</ul>";

    

    function testDatabaseConnection() {
        try {
            $db = getConnection();
        } catch(PDOException $e) {
            return array("passed" => false, "message" => $e->GetMessage());
        }
        return array("passed" => true, "message" => "Database connection successfullly established.");
    }

    function createDatabaseTables() {
        try {
            $db = getConnection();
            $stmt = $db->prepare("
                CREATE TABLE `".DB_TABLE_SUBMISSIONS."` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `file` varchar(250) DEFAULT NULL,
                    `message` varchar(250) DEFAULT NULL,
                    `visible` tinyint(1) NOT NULL DEFAULT '1',
                    `time_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (`id`)
                ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
            ");
            $stmt->execute();
            $db = null;
        }catch(PDOException $e) {
            return array("passed" => false, "message" => $e->GetMessage());
        }
        return array("passed" => true, "message" => "Database tables created.");
    }

    function testDataDirWritable() {
        try {
            if(is_writable(DB_TABLE_SUBMISSIONS))
                return array("passed" => true, "message" => "Data Directory is writable.");
            else
                return array("passed" => false, "message" => "Data Directory is not writable. Change permissions.");
        } catch(Exception $e) {
            return array("passed" => false, "message" => $e->GetMessage());
        }
    }

    function testWebApi() {
        $response = file_get_contents("api/submissions");
        if (empty($response))
        	return array("passed" => false, "message" => "No response from server");
        return array("passed" => true, "message" => $response);
    }


    function printTestResult($testTitle, $result) {
        if ($result['passed'])
            echo "<li>".$testTitle.": ".$result["message"]."</li>";
        else
            echo "<li style=\"color:#f00\"> ERROR! ".$testTitle.": ".$result["message"]."</li>";
    }

    function getConnection() {
        $dbhost=DB_SERVER;
        $dbuser=DB_USER;
        $dbpass=DB_PASSWORD;
        $dbname=DB_DATABASE;
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

?>
    </div>

  </body>
</html>
