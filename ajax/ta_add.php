<?php
    include '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
    $netid = mysql_real_escape_string($_POST['netid']);
    $location = mysql_real_escape_string($_POST['location']);
    $weekly = $_POST['weekly'];
    
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $end_date = date('Y-m-d H:i:s',strtotime('2015-02-25 23:59:59'));
    
    if($weekly === 'true'){
        while($start_time < $end_date){
            $sql = "INSERT INTO OH (netid,location,start_time,end_time) VALUES ('$netid','$location','$start_time','$end_time');";
            $result = $mysqli->query($sql);
            $start_time = date('Y-m-d H:i:s',strtotime("+1 week", strtotime($start_time)));
            $end_time = date('Y-m-d H:i:s',strtotime("+1 week", strtotime($end_time)));
        }
    }
    else {
        $sql = "INSERT INTO OH (netid,location,start_time,end_time) VALUES ('$netid','$location','$start_time','$end_time');";
        $result = $mysqli->query($sql);
    }

    $mysqli->close();
                        
?>