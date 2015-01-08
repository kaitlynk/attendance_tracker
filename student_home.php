<!DOCTYPE html>

<html>
	<head>
		<title>Office Hours Tracker</title>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/main.css">
	</head>

	<body>
		<?php include 'require/student_header.php'; ?>
		<div id = "container">
			<div id = "left-column" class = "column">
				<div id = "happening-now-header" class = "font-size-18 center">
					Happening Now (<span id = "happening-now-num">2</span>)
				</div>
				<div id = "happening-now-info" class = "center">
					<div id = "happening-now-details" class = "center">
						<span class = "happening-now-arrow" id = "happening-now-left-arrow">
							<div class = "medium-arrow-left"></div>
						</span>
						<div id = "happening-now-time" class = "font-size-15">
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
						<span class = "happening-now-arrow" id = "happening-now-right-arrow">
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
							<img src = "img/delete_icon.png" class = "happening-now-list-delete red clickable" />
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
					<form id = "happening-now-form" class = "center" onsubmit = "addNewSection();return false;" >
						<textarea id = "happening-now-problem" class = "font-size-14 border-box">Description of Problem</textarea>
						<div id = "happening-now-bottom-wrapper">
							<select id = "happening-now-category">
								<option value = "">-- Select Category --</option>
								<option value = "HTML">HTML</option>
								<option value = "CSS">CSS</option>
								<option value = "PHP">PHP</option>
								<option value = "JS">JavaScript</option>
								<option value = "SQL">SQL</option>
								<option value = "General">General</option>
							</select>
							<input type = "submit" value = "Register!" id = "happening-now-submit" class = "font-size-14"/>
						</div>
					</form>
				</div>
			</div>
			<div id = "right-column" class = "column">
				<div id = "all-oh-header" class = "font-size-18 left">
					All Office Hours
				</div>
				<div id = "all-oh-toggle" class = "left">
					<span id = "all-oh-"
				</div>
				<?php include 'require/calendar.php'; ?>
			</div>
		</div>
	</body>
</html>