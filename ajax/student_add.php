<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$sql = "INSERT INTO AttendingOH (p_cat,p_desc,s_netid,i_netid) VALUES ('".$_POST['p_cat']."', '".$_POST['p_desc']."', '".$_POST['s_netid']."', '".$_POST['i_netid']."');";
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