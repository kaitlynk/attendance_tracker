<?php 
	if ($_SESSION['ins']) {
		include('next_oh.php');
	} else {
		include('student_register.php');
	}
?>