<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}
        $sql = "UPDATE AttendingOH SET p_cat = '" . mysql_real_escape_string($_POST['p_cat']) . "', p_desc = '" .
            mysql_real_escape_string($_POST['p_desc']) . "' WHERE (s_netid,i_netid,time) = ('" .
	    $_POST['s_netid'] . "', '" . $_POST['i_netid'] . "', '" . $_POST['start_time'] . "');";
	echo "<script>console.log(" + $sql + ")</script>";
	$result = $mysqli->query($sql); 

	$sql = "SELECT att_id, registration_time from AttendingOH ORDER BY att_id DESC LIMIT 1";
	$result = $mysqli->query($sql);

	$mysqli->close();
?>