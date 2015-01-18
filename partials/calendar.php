<?php
    $months = array("January","February","March","April","May");
    $curr_year = date("Y");
    if(isset($_POST['month'])){
        if($_POST['direction'] === 'left'){
            $curr_month = $months[array_search($_POST['month'],$months)-1];
        }
        elseif($_POST['direction'] === 'right'){
            $curr_month = $months[array_search($_POST['month'],$months)+1];    
        }
        else{
            $curr_month = $_POST['month'];
        }
    }
    else {
        if(in_array(date("F"),$months)){
            $curr_month = date("F");
        }
        else{
            $curr_month = $months[0];
        }
    }
    $left_arrow = 'medium-arrow-left-white';
    $right_arrow = 'medium-arrow-right-white';
    if($curr_month == $months[0]){
        $left_arrow = 'medium-arrow-left-gray';
    }
    if($curr_month == $months[sizeof($months)-1]){
        $right_arrow = 'medium-arrow-right-gray';
    }
    
    $curr_monthN = date("m",strtotime($curr_month));
    $curr_yearN = date("y",strtotime($curr_year));
    // add arrows; reload section when clicked!!!
    
    echo "<div id='month'>";
    echo "<span id='month-left'>";
    echo "<span id='month-center'>";
    echo "<span class='arrow' id='month-left-arrow'><div class='$left_arrow'></div></span>";
    echo "<span id='month-name'>$curr_month $curr_year</span>";
    //echo "<div id='month'>$curr_month $curr_year</div>";
    echo "<span class='arrow' id='month-right-arrow'><div class='$right_arrow'></div></span>";
    echo "</span>";
    echo "</span>";
    echo "<span id='month-right'>&plus;</span>";
    echo "</div>";
    $day = 1;
    $num_days = cal_days_in_month(CAL_GREGORIAN,$curr_monthN,$curr_yearN);
    
    $of_week = 0;
    $first = date("w",strtotime("1 $curr_month $curr_year"));
    while($of_week != $first){
        echo "<div class='day'></div>";
        $of_week++;
    }
    // each div of class day will be 1/7th of calendar width
    // height of calendar will fit number of rows
    while($day <= $num_days){
        if($curr_month == date("F") && $day == date('j')){
            echo "<div id='$day' class='day curr-day'>$day</div>";
        }
        else{
            echo "<div id='$day' class='day thin'>$day</div>";
        }
        $day++;
    }
    $fill_week = 7 - (($num_days + $first) % 7);
    if($fill_week != 7){
        while($fill_week > 0){
            echo "<div class='day'></div>";
            $fill_week--;
        }
    }
    
    if(!isset($mysqli)){
        include '../require/password.php';
        $mysqli = new mysqli($host,$login,$password,$databaseName);

        if (mysqli_connect_error() ){
            die("Can't connect to database: " . $mysqli->error);
        }
    }
    
    $query = "SELECT * FROM `OH` WHERE `start_time` >= '$curr_year-$curr_monthN-01 00:00:00' and `start_time` <= '$curr_year-$curr_monthN-$num_days 23:59:59' ORDER BY `start_time`";
    $result = $mysqli->query($query);
    if($result && $result->num_rows > 0){
        while($array = $result->fetch_assoc()){
            $query2 = "SELECT * FROM `Instructors` WHERE `netid` = '" . $array['netid'] . "'";
            $result2 = $mysqli->query($query2);
            if($result2){
                $array2 = $result2->fetch_assoc();
                $datetime = strtotime($array['start_time']);
                $oh_day = date('d',$datetime);
                $oh_starttime = date('H:i',$datetime);
                $oh_endtime = date('H:i',strtotime($array['end_time']));
                $ins = isset($_POST['ins']) ? $_POST['ins'] : $_SESSION['ins'];
                $current_user = isset($_POST['netid']) ? $_POST['netid'] : $_SESSION['current_user']->netid;
                
                if($ins){
                    if($array['netid'] === $current_user){
                        // Must be [1 day] in advance to cancel OH
                        $curr_time = date('Y-m-d H:i:s',strtotime("+1 day", strtotime(date('Y-m-d H:i:s'))));
                        $oh_time = date('Y-m-d H:i:s',$datetime);
                        $cancel = $curr_time < $oh_time ? "&nbsp;<img src=\'img/cancel_icon.png\' alt=\'cancel\'>"  : "";
                        
                        $feedback = empty($array['feedback']) ? "Feedback" : $array['feedback'];
                        echo "<script>dispOH_self('" . $array2['first_name'] . "','" . $array2['last_name'] . "','$oh_day','$oh_starttime','$oh_endtime','" . $array['location'] . "', '$feedback', '" . $cancel . "');</script>";
                    }
                    else{
                        echo "<script>dispOH('" . $array2['first_name'] . "','" . $array2['last_name'] . "','$oh_day','$oh_starttime','$oh_endtime','" . $array['location'] . "');</script>";    
                    }
                }
                else{
                    $curr_time = date('Y-m-d H:i:s');
                    $oh_time = date('Y-m-d H:i:s',strtotime($array['end_time']));
                    if($curr_time < $oh_time){
                        $query3 = "SELECT * FROM `AttendingOH` WHERE `i_netid` = '" . $array['netid'] . "' and `time` = '" . $array['start_time'] . "' ORDER BY `registration_time` DESC";
                        $result3 = $mysqli->query($query3);
                        $r = $result3->num_rows;
                        $registered = $r . " registered";
                        $p_cat = "-- Select Category --";
                        $p_desc = "Description of Problem";
                        $curr_user_registered = "";
                        if($result3 && $r > 0){
                            $array3 = $result3->fetch_assoc();
                            while($r > 0){
                                if($array3['s_netid'] == $current_user){
                                    $p_cat = $array3['p_cat'];
                                    $p_desc = $array3['p_desc'];
                                    $curr_user_registered = ' dark-red';
                                    break;
                                }
                                $r--;
                            }
                        }
                        echo "<script>dispOH_future('" . $array2['first_name'] . "','" . $array2['last_name'] . "','$oh_day','$oh_starttime','$oh_endtime','" . $array['location'] . "', '$curr_user_registered', '$p_cat', '$p_desc', '$registered');</script>";
                    }
                    else{
                        $query4 = "SELECT * FROM `AttendingOH` WHERE `s_netid` = '" . $current_user . "' and `i_netid` = '" . $array['netid'] . "' and `time` = '" . $array['start_time'] . "' ORDER BY `registration_time` DESC";
                        $result4 = $mysqli->query($query4);
                        $array4 = $result4->fetch_assoc();
                        $feedback = empty($array4['feedback']) ? "Feedback" : $array4['feedback'];
                        echo "<script>dispOH('" . $array2['first_name'] . "','" . $array2['last_name'] . "','$oh_day','$oh_starttime','$oh_endtime','" . $array['location'] . "', '$feedback');</script>";
                    }
                }
            }
            
           // echo $str1 . "<img src='images/genI/" . $array['url'] . "' alt='" . $array['caption'] . "' class='all_imgs' id='" . $counter . "'>" . $str2;
            //$counter++;
        }
    }
    //echo $num_days;
    //$curr_month
    // %b %d %Y %h:%i %p
    /*
     *
     *SELECT * FROM `OH` WHERE `time` >= '2015-01-01 00:00:00' and `time` <= '2015-01-31 23:59:59' ORDER BY `time`
     *
     */
?>