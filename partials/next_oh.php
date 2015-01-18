</div>
<div class = "horizontal-line"></div>

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
			<ul class = "list-style-none left float-left" id = "next-oh-details">
			<?php
				require 'partials/next_oh_details.php';
			?>
			</ul>
		</div>
	</div>
</div>
