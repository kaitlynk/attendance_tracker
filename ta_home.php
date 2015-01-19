<?php include 'require/ta_header.php'; ?>
	<div id = "container">
		<div id = "left-column" class = "column">
			<?php include 'partials/happening_now.php'; ?>
		</div>
		<div id = "right-column" class = "column">
			<div id = "all-oh-header" class = "font-size-18 left">
				All Office Hours
			</div>
			<div id = "all-oh-toggle" class = "left thin">
				<span id = "all-oh-toggle-list" class = "black">List</span>
				| 
				<span id = "all-oh-toggle-cal" class = "light-gray clickable">Calendar</span>
			</div>
			<div id = "all-oh-list">
				<?php include 'partials/all_oh_list.php'; ?>
			</div>
			<div id = "calendar" class = "hidden">
				<?php include 'partials/calendar.php'; ?>
			</div>
		</div>
	</div>
	<div id = "calendar-popup"></div>
	<div id = "calendar-window" class = "border-box">
		<?php include 'partials/calendar_window.php'; ?>
	</div>
