<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$new_location = $_POST['room'];
	$netid = $_POST['netid'];
	$old_start = $_POST['old_start'];
	$month = $_POST['month'];
	while (strlen($month) < 2) {
		$month = '0'.$month;
	}

	$date = $_POST['date'];
	while (strlen($date) < 2) {
		$date = '0'.$date;
	}

	$new_date = $_POST['year'].'-'.$month.'-'.$date;
	$new_start = $new_date.' '.$_POST['start_time'];
	$new_end = $new_date.' '.$_POST['end_time'];

	$sql = "UPDATE OH SET location='".mysql_escape_string($new_location)."',start_time='".mysql_escape_string($new_start)."',end_time='".mysql_escape_string($new_end)."' WHERE netid='$netid' AND start_time='$old_start'";
	echo $sql;
	$result = $mysqli->query($sql); 

	$mysqli->close();
?>