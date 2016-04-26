<?php

    require 'config.php';
    require 'Slim/Slim.php';
    require 'BasicAuth.php';

    use \Slim\Slim;
    use \Slim\Extras\Middleware\HttpBasicAuth;
    
    // start session
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION["newest_id"]))
        $_SESSION["newest_id"] = PHP_INT_MAX;

    Slim::registerAutoloader();

    $app = new Slim();

    /*if (USE_ADMIN_LOGIN) {
        $app->add(new BasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD,'private',array(
            new Route('DELETE','/submissions'),
            new Route('PUT','/submissions'),
            new Route('POST','/submissions')
        )));
    }*/

    //echo $app->request()->getPath();;
        
    //exploration routes
    $app->get('/submissions/', 'listSubmissions');
    $app->get('/submissions/?:args', 'listSubmissions');
    $app->get('/submissions/:id', 'getSubmission');
    $app->put('/submissions/:id', 'updateSubmission');
    $app->post('/submissions/', 'newSubmission');
    $app->delete('/submissions/:id', 'deleteSubmission');

    $app->post('/submitFile/', 'submitFile');

    $app->run();

    /* submit file */

    function submitFile() {

    	/*$app = Slim::getInstance();
        
        #$body = $app->request->getBody();
        #$data = (array) json_decode($body);

    	if (!isset($_POST['id']))
    		_sendData("no id submitted",500);
    	
    	$id =  $_POST['id'];


        // check if any file got submitted
        if (!isset($_FILES['file']))
            _sendData("No file submitted",404);
        
        $file = $_FILES['file'];

        //move file to records directory
        if (is_uploaded_file($file['tmp_name'])) {
            //_sendData($file['tmp_name']." uploaded successfully.",500);
            move_uploaded_file($file['tmp_name'], DIR_SUBMISSION_FILES.'/'.$file['name']);
            _sendData($file['name']." uploaded successfully.");
        } else
            _sendData("File got not uploaded.",404);

        //_sendData($data,200,true);
        print_r($file);*/

    }
    
    /* Submission Methods */

    function getSubmission($arg) {

        try {
            $db = getConnection();
            $stmt = $db->prepare("SELECT *, id > ".$_SESSION["newest_id"]." as isNew,(SELECT MAX(id) FROM ".DB_TABLE_SUBMISSIONS.") as maxId FROM ".DB_TABLE_SUBMISSIONS." WHERE id = :id");
            $stmt->execute(array('id' => $arg));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $db = null;
             if (sizeof($result) > 0)
                $_SESSION["newest_id"] = $result[0]['maxId'];
            if (sizeof($result)<1)
                _sendData("No data found for this id.",404);
            _sendData($result,200,true);
        } catch(PDOException $e) {
            _sendData($e->getMessage(),500); 
        }
    }

    function listSubmissions() {

        $app = Slim::getInstance();

        $limit = PHP_INT_MAX;
        if ($app->request()->params('limit'))
            $limit = $app->request()->params('limit');

        try {
            $db = getConnection();
            $stmt = $db->prepare("SELECT *, id > ".($_SESSION["newest_id"])." as isNew,(SELECT MAX(id) FROM ".DB_TABLE_SUBMISSIONS.") as maxId FROM ".DB_TABLE_SUBMISSIONS." ORDER BY id DESC LIMIT ".$limit);
            $stmt->execute(array());
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $db = null;
            if (sizeof($result) > 0)
                $_SESSION["newest_id"] = $result[0]['maxId'];
            _sendData($result);
        } catch(PDOException $e) {
            _sendData($e->getMessage(),404); 
        }
    }
    
    function newSubmission() {

        $app = Slim::getInstance();
        
        $body = $app->request->getBody();
        $data = (array) json_decode($body);

        try {
            $db = getConnection();
            $stmt = $db->prepare("INSERT INTO ".DB_TABLE_SUBMISSIONS." (file,message)
                VALUES (:file,:message)");
            $insertData = array(
                'file' => $data['file'],
                'message' => $data['message']
            );
            $stmt->execute($insertData);
            
            $db = null;
            //_saveToLog($json);
            _sendData(array(),200,true);
        } catch(PDOException $e) {
            //_saveToLog($e->getMessage());
            _sendData($e->getMessage(),500); 
        }
    }

    function updateSubmission($arg) {

        //_sendData("data inserted",200,true);

        $app = Slim::getInstance();
        $body = $app->request->getBody();
        
        $data = (array) json_decode($body);

        try {
            $db = getConnection();
            $stmt = $db->prepare("UPDATE ".DB_TABLE_SUBMISSIONS." SET id=:id, visible=:visible, 
                file=:file, time_created=time_created WHERE id=:current_id");
            $insertData = array(
                'id' => $data['id'],
                'visible' => $data['visible'],
                'file' => $data['file'],
                'current_id' => $arg 
            );
            $stmt->execute($insertData);
            $db = null;
            //_saveToLog($json);
            _sendData(array(),200,true);
        } catch(PDOException $e) {
            //_saveToLog($e->getMessage());
            _sendData($e->getMessage(),500); 
        }
    }

    function deleteSubmission($arg) {

         try {
            $db = getConnection();
            // get deleted submission
            $stmt = $db->prepare("SELECT * FROM ".DB_TABLE_SUBMISSIONS." WHERE id = :id");
            $stmt->execute(array('id' => $arg));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            //delete file
            //unlink(DIR_SUBMISSION_FILES.$result[0]["file"]);

            // delete db entry
            $stmt = $db->prepare("DELETE FROM ".DB_TABLE_SUBMISSIONS." WHERE id = :id");
            $stmt->execute(array('id' => $arg));
            $db = null;
            _sendData("submission deleted.");
        } catch(PDOException $e) {
            _sendData($e->getMessage(),404); 
        }
    }

    //sends a message with the data
    function _sendData($data = array(), $status = 200, $onlyFirst = false) {
        // headers for not caching the results
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

        // allow all requests
        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        
        // headers to tell that result is JSON
        header('Content-type: application/json');

        //send status
        header("HTTP/1.1 " . $status . " " . _requestStatus($status));

        // send the result now
        if ($onlyFirst && !empty($data))
            echo json_encode($data[0]);
        else
            echo json_encode($data);

        //end script
        exit(); 
    }

    function _requestStatus($code) {
        $status = array(  
            200 => 'OK',
            404 => 'Not Found',   
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        ); 
        return ($status[$code])?$status[$code]:$status[500]; 
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

    // Log data
    function _saveToLog($data) {
        $file = 'log/log.txt';
        $current = file_get_contents($file);
        $current .= "Time: ".date("r")."\n Data:".$data."\n";
        file_put_contents($file, $current);
    }
