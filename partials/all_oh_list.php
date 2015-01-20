<?php

	if (!isset($mysqli)) {
		session_start();
		include '../require/password.php';
	    $mysqli = new mysqli($host,$login,$password,$databaseName);

	    if ($mysqli->connect_error) {
		    die("Connection failed: " . $mysqli->connect_error);
		}
	}

	$sql = "SELECT * FROM OH LEFT JOIN (SELECT * FROM AttendingOH WHERE s_netid = '".$_SESSION['current_user']->netid."' AND status = 0) t1 ON t1.time = OH.start_time AND OH.netid = t1.i_netid INNER JOIN (SELECT DISTINCT(DATE(start_time)) AS dates FROM OH WHERE start_time > NOW() AND end_time > NOW() ORDER BY start_time LIMIT 3) t2 ON DATE(OH.start_time) = t2.dates INNER JOIN Instructors ON Instructors.netid = OH.netid LEFT JOIN (SELECT COUNT(*) AS num_regs, i_netid,time FROM AttendingOH GROUP BY i_netid,time) AS t3 ON OH.netid = t3.i_netid AND OH.start_time = t3.time WHERE start_time > NOW() AND end_time > NOW() ORDER BY start_time LIMIT 15";
	$result = $mysqli->query($sql);
	$prev_date = 0;

	while ($row = mysqli_fetch_assoc($result)) {
		$curr_date = $row['dates'];

		if ($prev_date != $curr_date && $prev_date != 0) {
			echo "</div></div>";
		}

		if ($prev_date != $curr_date) {
			echo '<div class = "all-oh-list-section">
					<div class = "all-oh-list-title thin font-size-15">
						'.change_to_date($row['start_time']).'
					</div>
					<div class = "box all-oh-list-box">';
		}

		echo '<div class = "all-oh-list-info font-size-14 thin border-box';
		
		if (!is_null($row['s_netid'])) echo ' clickable';
		if ($prev_date != $curr_date && $prev_date != 0) echo ' no-bottom-border';

		$num_regs = (is_null($row['num_regs'])) ? 0 : $row['num_regs'];
		
		echo '"><ul class = "list-style-none">
					<li class = "inline-block">
						'.$row['first_name'].' '.$row['last_name'].'
					</li>
					<li class = "inline-block">
						'.change_to_time($row['start_time']).' - '.change_to_time($row['end_time']).'
					</li>
					<li class = "inline-block small-padding-left border-box">
						'.$row['location'].'
					</li>
					<li class = "inline-block">
						'.$num_regs.' Sign Ups
					</li>
				</ul>';

		echo '<span class = "hidden all-oh-list-attending-id">'.$row['att_id'].'</span>';

		if (is_null($row['s_netid'])) {
			echo '<img src = "img/confirm_icon_empty.png" class = "all-oh-list-icon icon-empty clickable all-oh-list-reserve" />';
		} else {
			echo '<img src = "img/confirm_icon.png" class = "all-oh-list-icon icon-selected clickable all-oh-list-unreserve" />
			<div class = "all-oh-list-expanded hidden">
				<textarea class = "all-oh-list-problem" class = "font-size-14 border-box thin">'.$row['p_desc'].'</textarea>
				<select class = "all-oh-list-category">
					<option value = "HTML"';
			if ($row['p_cat'] == "HTML") echo ' selected';
			echo '>HTML</option>
					<option value = "CSS"';

			if ($row['p_cat'] == "CSS") echo ' selected';
			echo '>CSS</option>
					<option value = "PHP"';

			if ($row['p_cat'] == "PHP") echo ' selected';
			echo '>PHP</option>
					<option value = "JS"';
			
			if ($row['p_cat'] == "JS") echo ' selected';
			echo '>JavaScript</option>
					<option value = "SQL"';

			if ($row['p_cat'] == "SQL") echo ' selected';
			echo '>SQL</option>
					<option value = "General"';
			if ($row['p_cat'] == "GENERAL") echo ' selected';
			echo '>General</option>
				</select>
			</div>';
		}
					
		echo '</div>';

		if ($prev_date != $curr_date)
			$prev_date = $curr_date;
	}
?>


