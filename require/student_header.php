<script src = "js/student_main.js"></script>

<div id = "header" class = "left border-box">
	<div id = "menu-title" class = "white">Office Hours Tracker</div>
	<ul id = "menu" class = "white list-style-none right">
		<?php
			$_SESSION['ins'] = 0;
		?>
		<li>Welcome, <?php echo $_SESSION['current_user']->firstName; ?> (<span id = "student_id"><?php echo $_SESSION['current_user']->netid ?></span>)!</li>
		<a href = "index.html" class = "white"><li class = "menu-left">Log Out</li></a>
	</ul>
</div>
