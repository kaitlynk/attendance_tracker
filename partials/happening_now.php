<?php
	$url = split('/', $_SERVER['REQUEST_URI']);
	$page_type = split('_',$url[count($url) - 1])[0];
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
			<ul class = "list-style-none left float-left light-blue">
				<li>TA</li>
				<li>Room</li>
				<li>Time</li>
			</ul>
			<ul class = "list-style-none left float-left" id = "happening-now-details">
				<li>Jonathan Hayon</li>
				<li>Gates G11</li>
				<li>5:00 - 11:00 PM</li>
			</ul>
		</div>
		<span class = "arrow" id = "happening-now-right-arrow">
			<div class = "medium-arrow-right"></div>
		</span>
	</div>
	<div id = "happening-now-list" class = "box center">
		<div class = "happening-now-list-section center">
			<div class = "happening-now-list-section-text left font-size-14 border-box">
				<span class = "timestamp orange">[Timestamp]</span> 
				<span class = "category">SQL</span>: 
				<span class = "problem">
					Table not adding
				</span>
			</div>
		</div>
		<div class = "happening-now-list-section center">
			<div class = "happening-now-list-section-text left font-size-14 border-box">
				<span class = "timestamp orange">[Timestamp]</span> 
				<span class = "category">CSS</span>: 
				<span class = "problem">
					Background wrong image
				</span>
			</div>
		</div>
		<div class = "happening-now-list-section center">
			<div class = "happening-now-list-section-text left font-size-14 border-box">
				<span class = "timestamp orange">[Timestamp]</span> 
				<span class = "category">JS</span>: 
				<span class = "problem">
					Form not submitting properly
				</span>
			</div>
			<?php
				if (strcasecmp($page_type, "student") == 0) {
					echo '<img src = "img/delete_icon.png" class = "happening-now-list-delete clickable" />';
				}
			?>
		</div>
		<div class = "happening-now-list-section center">
			<div class = "happening-now-list-section-text left font-size-14 border-box">
				<span class = "timestamp orange">[Timestamp]</span> 
				<span class = "category">JS</span>: 
				<span class = "problem">
					AJAX not signaling ready
				</span>
			</div>
		</div>
		<div class = "happening-now-list-section no-bottom-border center">
			<div class = "happening-now-list-section-text left font-size-14 border-box">
				<span class = "timestamp orange">[Timestamp]</span> 
				<span class = "category">General</span>: 
				<span class = "problem">
					Don't understand how to use JQuery with PHP
				</span>
			</div>
		</div>
	</div>
	<?php 
		if (strcasecmp($page_type, "ta") == 0) {
			include('next_oh.php');
		} else {
			include('student_register.php');
		}
	?>