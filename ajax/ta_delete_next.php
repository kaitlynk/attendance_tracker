<?php
	include '../require/password.php';
	include '../require/date_functions.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}

	$netid = $_POST['netid'];
	$old_start = $_POST['old_start'];

	$sql = "DELETE FROM OH WHERE netid='$netid' AND start_time='$old_start'";
	$result = $mysqli->query($sql); 

	$sql = "SELECT * FROM OH WHERE netid='$netid' AND start_time > CURDATE() ORDER BY start_time ASC LIMIT 1";
	$result = $mysqli->query($sql);
	
	while ($row = mysqli_fetch_assoc($result)) {
		$location = $row['location'];
		print "<span id = 'next-oh-old-start' class = 'hidden'>".$row['start_time']."</span><li id = 'next-oh-date'>".change_to_date($row['start_time'])."</li>
		<li id = 'next-oh-room'>$location</li>
		<li id = 'next-oh-hours'><span id = 'next-oh-start'>".change_to_time($row['start_time'], false)."</span> - <span id = 'next-oh-end'>".
		change_to_time($row['end_time'], false)."</span></li>";
	}

	$mysqli->close();
?>