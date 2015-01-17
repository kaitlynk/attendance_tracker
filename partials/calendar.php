<div id="calendar">
    <?php
        $months = array("January","February","March","April","May");
        $curr_year = date("Y");
        $curr_yearN = date("y",strtotime($curr_year));
        
        if(in_array(date("F"),$months)){
            $curr_month = date("F");
        }
        else{
            $curr_month = "January";
        }
        $curr_monthN = date("m",strtotime($curr_month));
        // add arrows; reload section when clicked!!!
        
        echo "<div id='month'>";
        echo "<span id='month-left'>";
        echo "<span id='month-center'>";
        echo "<span class ='arrow' id = 'month-left-arrow'><div class='medium-arrow-left-white'></div></span>";
        echo $curr_month . ' ' . $curr_year;
        //echo "<div id='month'>$curr_month $curr_year</div>";
        echo "<span class ='arrow' id = 'month-right-arrow'><div class='medium-arrow-right-white'></div></span>";
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
        $result = $mysqli->query("SELECT * FROM `OH` WHERE `start_time` >= '$curr_year-$curr_monthN-01 00:00:00' and `start_time` <= '$curr_year-$curr_monthN-$num_days 23:59:59' ORDER BY `start_time`");
        if($result && $result->num_rows > 0){
            while($array = $result->fetch_assoc()){
                $result2 = $mysqli->query("SELECT * FROM `Instructors` WHERE `netid` = '" . $array['netid'] . "'");
                if($result2){
                    $array2 = $result2->fetch_assoc();
                    $datetime = strtotime($array['start_time']);
                    $oh_day = date('d',$datetime);
                    $oh_starttime = date('H:i',$datetime);
                    $oh_endtime = date('H:i',strtotime($array['end_time']));
                    echo "<script>dispOH('" . $array2['first_name'] . "','" . $array2['last_name'] . "','$oh_day','$oh_starttime','$oh_endtime','" . $array['location'] . "')</script>";
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
</div>