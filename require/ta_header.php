<script src = 'js/ta_main.js'></script>

<div id = "header" class = "left border-box">
	<div id = "menu-title" class = "white">Office Hours Tracker</div>
	<ul id = "menu" class = "white list-style-none right">
		<li>Welcome, <?php echo $_SESSION['current_user']->firstName; ?> (<span id = "instructor_id"><?php echo $_SESSION['current_user']->netid ?></span>)!</li>
		<a href = "section.html" class = "white"><li class = "menu-left">Enter Section Info</li></a>
		<a href = "search.html" class = "white"><li class = "menu-left">Search</li></a>
		<a href = "index.html" class = "white"><li class = "menu-left">Log Out</li></a>
	</ul>
</div>
