<?php
	$url = split('/', $_SERVER['REQUEST_URI']);
	$page = split('_',$url[count($url) - 1]);
	$page_type = $page[0];

	function change_to_time($prevtime, $hasSecs) {
		$time = strtotime($prevtime);
		if ($hasSecs)
			$timestamp = date("g:i:s A", $time);
		else
			$timestamp = date("g:i A", $time);
		return $timestamp;
	}

	function change_back_time($prevtime) {
		$timestamp = date("Y-m-d H:i:s", $prevtime);
		return $timestamp;
	}

	$curr_instructors_sql = 'SELECT * FROM AttendingOH INNER JOIN Instructors INNER JOIN OH WHERE AttendingOH.i_netid = Instructors.netid AND AttendingOH.time = OH.start_time GROUP BY Instructors.netid';
	$curr_instructors_result = $mysqli->query($curr_instructors_sql);
	$first_instructor = mysqli_fetch_assoc($curr_instructors_result);
	$curr_instructor_netid = $first_instructor['i_netid'];

	$sql = "SELECT * FROM AttendingOH INNER JOIN Instructors INNER JOIN OH WHERE AttendingOH.i_netid = '".$curr_instructor_netid."' AND AttendingOH.i_netid = Instructors.netid AND AttendingOH.time = OH.start_time ORDER BY registration_time ASC";
	$result = $mysqli->query($sql);
?>

<div id = "happening-now-header" class = "font-size-18 center">
	Happening Now (<span id = "happening-now-num">2</span>)
</div>
<div id = "happening-now-info" class = "center">
	<div id = "happening-now-details" class = "center">
		<span class = "arrow" id = "happening-now-left-arrow">
			<div class = "medium-arrow-left"></div>
		</span>
		<div id = "happening-now-time" class = "font-size-15 float-left">
			<span id = "instructor_id" class = "hidden"><?php echo $curr_instructor_netid; ?></span>
			<span id = "start_time" class = "hidden"><?php echo $first_instructor['time'];?></span>
			<ul class = "list-style-none left float-left light-blue">
				<li>TA</li>
				<li>Room</li>
				<li>Time</li>
			</ul>
			<ul class = "list-style-none left float-left" id = "happening-now-details">
				<li><?php echo  $first_instructor['first_name']." ".$first_instructor['last_name']; ?></li>
				<li><?php echo  $first_instructor['location']; ?></li>
				<li><?php echo change_to_time($first_instructor['start_time'], false)." - ".change_to_time($first_instructor['end_time'], false) ?></li>
			</ul>
		</div>
		<span class = "arrow" id = "happening-now-right-arrow">
			<div class = "medium-arrow-right"></div>
		</span>
	</div>
	<div id = "happening-now-list" class = "box center">
		<?php 
			if (mysqli_num_rows($result) > 0) {
			    while($row = mysqli_fetch_assoc($result)) {
			        echo "<div class = 'happening-now-list-section center'>
			       		<span class = 'happening-now-number hidden'>".$row['att_id']."</span>
						<div class = 'happening-now-list-section-text left font-size-14 border-box'>
							<span class = 'timestamp orange'>[";
					
					if (strcasecmp($page_type, "ta") == 0) echo strtoupper($row['s_netid']);
					else echo change_to_time($row['registration_time'], true);

					echo "]</span> 
							<span class = 'category'>".strtoupper($row['p_cat'])."</span>: 
							<span class = 'problem'>
								".$row['p_desc']."
							</span>
						</div>";
					if (strcasecmp($page_type, "student") == 0 && strcasecmp($_SESSION['current_user']->netid, $row['s_netid']) == 0) {
						echo '<img src = "img/delete_icon.png" class = "happening-now-list-delete clickable" />';
					}
					echo "</div>";
			    }

			} else {
			    echo "There are currently no registrations!";
			}
		?>
	</div>
	<?php 
		if (strcasecmp($page_type, "ta") == 0) {
			include('next_oh.php');
		} else {
			include('student_register.php');
		}
	?>