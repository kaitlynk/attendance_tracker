<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$sql = "UPDATE AttendingOH SET status=1 WHERE att_id = ".$_POST['att_id'].";";
	$result = $mysqli->query($sql); 

	/*while($row = mysqli_fetch_assoc($result)) {
		$newsql = "INSERT INTO PastAttendingOH (s_netid, i_netid, time, p_cat, p_desc, feedback, registration_time) 
		VALUES ('".mysql_real_escape_string($row['s_netid'])."', '".mysql_real_escape_string($row['i_netid'])."', '"
			.mysql_real_escape_string($row['time'])."', '".mysql_real_escape_string($row['p_cat'])."', '"
			.mysql_real_escape_string($row['p_desc'])."', '".mysql_real_escape_string($row['feedback'])."', '"
			.mysql_real_escape_string($row['registration_time'])."')";

		echo $newsql;
		$newresult = $mysqli->query($newsql);
	}

	if ($newresult) {
		$sql = "DELETE FROM AttendingOH WHERE att_id = ".$_POST['att_id'].";";
		$result = $mysqli->query($sql);
	}*/

	$mysqli->close();
?>