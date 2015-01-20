<?php
	include '../require/db_login.php';
	include '../require/date_functions.php';

	$sql = "SELECT * FROM AttendingOH WHERE i_netid = '".$_POST['netid']."' AND time = '".$_POST['start_time']."' AND status = 0";
	$result = $mysqli->query($sql);

	echo mysqli_num_rows($result)."|";

	$sql = "SELECT DISTINCT(OH.netid), start_time, end_time, location, Instructors.first_name, Instructors.last_name FROM OH INNER JOIN Instructors ON OH.netid = Instructors.netid INNER JOIN AttendingOH ON AttendingOH.i_netid = OH.netid WHERE NOW() > OH.start_time AND NOW() < OH.end_time";
	$result = $mysqli->query($sql);

	if (mysqli_num_rows($result) == 0) {
		$sql = 'SELECT DISTINCT(OH.netid), start_time, end_time, location, Instructors.first_name, Instructors.last_name FROM OH INNER JOIN Instructors ON OH.netid = Instructors.netid INNER JOIN AttendingOH ON AttendingOH.i_netid = OH.netid WHERE NOW() < OH.start_time ORDER BY OH.start_time ASC LIMIT 1';
		$result = $mysqli->query($sql);
	}

	echo mysqli_num_rows($result)."|";

	$row = mysqli_fetch_assoc($result);
	echo $row['netid'];

?>