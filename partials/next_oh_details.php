<?php
	$sql = "SELECT * FROM OH WHERE netid='".$_SESSION['current_user']->netid."' AND end_time > NOW() AND start_time > NOW() ORDER BY start_time ASC LIMIT 1";
	$result = $mysqli->query($sql);
	
	while ($row = mysqli_fetch_assoc($result)) {
		$location = $row['location'];
		print "<span id = 'next-oh-old-start' class = 'hidden'>".$row['start_time']."</span><li id = 'next-oh-date'>".change_to_date($row['start_time'])."</li>
		<li id = 'next-oh-room'>$location</li>
		<li id = 'next-oh-hours'><span id = 'next-oh-start'>".change_to_time($row['start_time'], false)."</span> - <span id = 'next-oh-end'>".
		change_to_time($row['end_time'], false)."</span></li>";
	}
?>