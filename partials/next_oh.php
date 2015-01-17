</div>
<div class = "horizontal-line"></div>

<?php
	$sql = "SELECT * FROM OH WHERE netid='".$_SESSION['current_user']->netid."' AND start_time > CURDATE() ORDER BY start_time ASC LIMIT 1";
	$result = $mysqli->query($sql);
?>

<div id = "next-oh-header" class = "font-size-18 center">
	Your Next Office Hours
</div>
<div id = "next-oh-info" class = "center">
	<div id = "next-oh-wrapper">
		<div id = "next-oh-icons" class = "float-left">
			<img src = "img/edit_icon.png" class = "next-oh-icon clickable" id = "next-oh-edit" /><br/>
			<img src = "img/delete_icon_line.png" class = "next-oh-icon clickable" id = "next-oh-delete"/>
		</div>
		<div id = "next-oh-time" class = "font-size-15 thin float-left">
			<ul class = "list-style-none left float-left light-blue">
				<li>Date</li>
				<li>Room</li>
				<li>Time</li>
			</ul>
			<ul class = "list-style-none left float-left">
			<?php
				while ($row = mysqli_fetch_assoc($result)) {
					$location = $row['location'];
					print "<li>".change_to_date($row['start_time'])."</li>
					<li>$location</li>
					<li>".change_to_time($row['start_time'], false)." - ".
					change_to_time($row['end_time'], false)."</li>";
				}
			?>
			</ul>
		</div>
	</div>
</div>
