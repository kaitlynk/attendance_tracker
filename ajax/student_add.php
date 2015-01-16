<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$sql = "INSERT INTO AttendingOH (p_cat,p_desc,s_netid,i_netid,time) VALUES ('".mysql_real_escape_string($_POST['p_cat'])."', '".mysql_real_escape_string($_POST['p_desc']).
		"', '".mysql_real_escape_string($_POST['s_netid'])."', '".mysql_real_escape_string($_POST['i_netid'])."', '".
		mysql_real_escape_string($_POST['start_time'])."');";
	echo $sql;
	$result = $mysqli->query($sql); 

	$sql = "SELECT att_id, registration_time from AttendingOH ORDER BY att_id DESC LIMIT 1";
	$result = $mysqli->query($sql);

	while($row = mysqli_fetch_assoc($result)) {
		$time = strtotime($row['registration_time']);
		$timestamp = date("h:i:s A", $time); 

		echo $row['att_id']."|".$timestamp;
	}

	$mysqli->close();
?>