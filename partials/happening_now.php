<?php 

	include 'require/date_functions.php';
	
	if (is_null($mysqli)) {
		session_start();
		include '../require/password.php';
		include '../require/date_functions.php';
		$mysqli = new mysqli($host,$login,$password,$databaseName);

	    if (mysqli_connect_error() ){
	        die("Can't connect to database: " . $mysqli->error);
	    }
	}

	$curr_instructors_sql = 'SELECT DISTINCT(OH.netid), start_time, end_time, location, Instructors.first_name, Instructors.last_name FROM OH INNER JOIN Instructors ON OH.netid = Instructors.netid INNER JOIN AttendingOH ON AttendingOH.i_netid = OH.netid WHERE NOW() > OH.start_time AND NOW() < OH.end_time';
	$curr_instructors_result = $mysqli->query($curr_instructors_sql);

	if (mysqli_num_rows($curr_instructors_result) == 0) {
		$happening_now = 0;
		$curr_instructors_sql = 'SELECT DISTINCT(OH.netid), start_time, end_time, location, Instructors.first_name, Instructors.last_name FROM OH INNER JOIN Instructors ON OH.netid = Instructors.netid INNER JOIN AttendingOH ON AttendingOH.i_netid = OH.netid WHERE NOW() < OH.start_time ORDER BY OH.start_time ASC LIMIT 1';
		$curr_instructors_result = $mysqli->query($curr_instructors_sql);
	} else {
		$happening_now = 1; 
	}

	$curr_instructors = array();
	while ($row = mysqli_fetch_assoc($curr_instructors_result)) {
		$curr_instructors[] = $row;
		echo "<span class = 'hidden curr-instructors'>".$row['netid']."|".$row['start_time']."|".change_to_time($row['start_time'])."|".change_to_time($row['end_time'])."|".$row['first_name']."|".$row['last_name']."|".$row['location']."</span>";
	}

	echo "<span class = 'hidden' id = 'curr-instructor-num'>0</span>";
	$curr_instructor = $curr_instructors[0];
	$curr_instructor_netid = $curr_instructor['netid'];

	$sql = "SELECT * FROM AttendingOH WHERE i_netid = '".$curr_instructor_netid."' AND time = '".$curr_instructor['start_time']."' AND status = 0 ORDER BY registration_time ASC";
	$result = $mysqli->query($sql);
?>

<div id = "happening-now-header" class = "font-size-18 center">
	<?php 
		if ($happening_now) {
			echo 'Happening Now!';
			if (sizeof($curr_instructors) > 1)
				echo ' (<span id = "happening-now-num">'.count($curr_instructors).'</span>)';
		} else {
			echo 'Next Office Hours';
		}
	?>
</div>
<div id = "happening-now-info" class = "center">
	<div id = "happening-now-details" class = "center">
		<?php if (count($curr_instructors) > 1) { ?>
			<span class = "arrow" id = "happening-now-left-arrow">
				<div class = "medium-arrow-left-gray"></div>
			</span>
		<?php } ?>

		<?php if (count($curr_instructors) > 0) { ?>
			<div id = "happening-now-time" class = "font-size-15 float-left">
				<span id = "curr-instructor-id" class = "hidden"><?php echo $curr_instructor_netid; ?></span>
				<span id = "start-time" class = "hidden"><?php echo $curr_instructor['start_time'];?></span>
				<ul class = "list-style-none left float-left light-blue">
					<li>TA</li>
					<li>Room</li>
					<?php 
						if (!$happening_now) {
							echo "<li>Date</li>"; 
						}
					?>
					<li>Time</li>
				</ul>
				<ul class = "list-style-none left float-left" id = "happening-now-details-ta">
					<?php echo "<li>".$curr_instructor['first_name']." ".$curr_instructor['last_name']."</li>
						<li>".$curr_instructor['location']."</li>";
						if (!$happening_now) {
							echo "<li>".change_to_date($curr_instructor['start_time'])."</li>"; 
						}
						echo "<li>".change_to_time($curr_instructor['start_time'], false)." - ".change_to_time($curr_instructor['end_time'], false)."</li>";
					?>
				</ul>
			</div>
		<?php } ?>

		<?php if (count($curr_instructors) > 1) { ?>
			<span class = "arrow clickable" id = "happening-now-right-arrow">
				<div class = "medium-arrow-right"></div>
			</span>
		<?php } ?>

	</div>
	<div id = "happening-now-list" class = "box center">
		<?php include('happening_now_list.php'); ?>
	</div>
