<!DOCTYPE html>

<?php 
	require 'require/header.php';

	$HEADERS = apache_request_headers();
	$netid = $HEADERS["NETID"];

	$sql = "SELECT * FROM Instructors WHERE netid = '$netid'";
	$result = $mysqli->query($sql);
	if (mysqli_num_rows($result) > 0) $viewInstructor = 1;

	if ($viewInstructor) {
		$row = mysqli_fetch_assoc($result);
		set_user($row);
		require 'ta_home.php';
	} else {
		$sql = "SELECT * FROM Students WHERE netid = '$netid'";
		$result = $mysqli->query($sql);
		$row = mysqli_fetch_assoc($result);
		set_user($row);
		require 'student_home.php';
	}

	require 'require/footer.php';
?>