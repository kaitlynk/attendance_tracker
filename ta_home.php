<!DOCTYPE html>

	<?php 
		include 'require/header.php';
		include 'require/ta_header.php'; 
	?>
	
		<div id = "container">
			<div id = "left-column" class = "column">
				<?php include 'partials/happening_now.php'; ?>
			</div>
			<div id = "right-column" class = "column">
				<div id = "all-oh-header" class = "font-size-18 left">
					All Office Hours
				</div>
				<div id = "all-oh-toggle" class = "left">
					<span id = "all-oh-">List | Calendar</span>
				</div>
				<?php include 'partials/calendar.php'; ?>
			</div>
		</div>
	</body>
</html>