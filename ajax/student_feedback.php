<?php
	include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
	    die("Connection failed: " . $mysqli->connect_error);
	}
        
        $s_netid = $_POST['s_netid'];
        $i_netid = $_POST['i_netid'];
        $start_time = $_POST['start_time'];
        $feedback = $_POST['feedback'];
        
        /*$s_netid = 'mat297';
        $i_netid = 'mat297';
        $start_time = '2015-01-13 04:00:00';
        $feedback = 'aaa';*/
        
        $sql = "SELECT * FROM AttendingOH WHERE `s_netid`='$s_netid' AND `i_netid`='$i_netid' AND `time`='$start_time'";
        $result = $mysqli->query($sql);
        if($result->num_rows == 0){
            echo $sql . "<br>";
            $sql_insert = "INSERT INTO AttendingOH(`s_netid`,`i_netid`,`time`) VALUES ('$s_netid','$i_netid','$start_time')";
            echo $sql_insert . "<br>";
            $result_insert = $mysqli->query($sql_insert);
        }
        
        $sql2 = "UPDATE AttendingOH SET `feedback`='".mysql_escape_string($feedback)."' WHERE `s_netid`='$s_netid' AND `i_netid`='$i_netid' AND `time`='$start_time'";
	echo $sql2;
	$result2 = $mysqli->query($sql2); 

	$mysqli->close();
?>
