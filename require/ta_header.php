<?php 
	if (sizeof($mysqli) == 0)
		require 'require/db_login.php';
?>

<script src = 'js/ta_main.js'></script>

<div id = "header" class = "left border-box">
	<div id = "menu-title" class = "white">Office Hours INFO/CS 2300</div>
	<ul id = "menu" class = "white list-style-none right">
		<?php $_SESSION['ins'] = 1; ?>
		<li>Welcome, <?php echo $_SESSION['current_user']->firstName; ?> (<span id = "instructor_id"><?php echo $_SESSION['current_user']->netid ?></span>)!</li>
		<?php if ($_SESSION['current_user']->netid == 'kyk25' || $_SESSION['current_user']->netid == 'mat297' || $_SESSION['current_user']->netid == 'sm68') { ?>
			<a><li id = 'dev-toggle-ta' class = "white menu-left">View as TA</li></a>
			<a><li id = 'dev-toggle-student' class = "white menu-left">View as Student</li></a>
		<?php } ?>
		<!-- <a href = "section.html" class = "white"><li class = "menu-left">Enter Section Info</li></a>
		<a href = "search.html" class = "white"><li class = "menu-left">Search</li></a> -->
	</ul>
</div>
