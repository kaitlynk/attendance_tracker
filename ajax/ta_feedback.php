<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}
        
        $netid = $_POST['netid'];
        $start_time = $_POST['start_time'];
        $feedback = $_POST['feedback'];

	$sql = "UPDATE OH SET `feedback`='".mysql_escape_string($feedback)."' WHERE `netid`='$netid' AND `start_time`='$start_time'";
	echo $sql;
	$result = $mysqli->query($sql); 

	$mysqli->close();
?>