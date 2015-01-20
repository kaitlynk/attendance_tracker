<?php include 'require/student_header.php'; ?>
	<div id = "container">
		<div id = "left-column" class = "column">
			<div id = "happening-now">
				<?php include 'partials/happening_now.php'; ?>
			</div>
			<div id = "happening-now-hidden" class = "hidden">
			</div>
		</div>
		<?php include 'partials/happening_now_bottom.php'; ?>
		<div id = "right-column" class = "column">
			<div id = "all-oh-header" class = "font-size-18 left">
				All Office Hours
			</div>
			<div id = "all-oh-toggle" class = "left thin">
				<span id = "all-oh-toggle-cal" class = "black">Calendar</span>
				| 
				<span id = "all-oh-toggle-list" class = "light-gray clickable">List</span>
			</div>
			<div id = "calendar">
				<?php include 'partials/calendar.php'; ?>
			</div>
			<div id = "all-oh-list" class = "hidden">
				<?php include 'partials/all_oh_list.php'; ?>
			</div>
		</div>
	</div>
	<div id = "calendar-popup"></div>