<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$sql = "UPDATE AttendingOH SET status=2 WHERE att_id = ".$_POST['att_id'].";";
	$result = $mysqli->query($sql); 
	
	$mysqli->close();
?>