$(document).ready(function() {

	$(document).on("click", "#dev-toggle-ta", function() {
		$("body").load("ta_home.php");		
	});

	$(document).on("click", "#dev-toggle-student", function() {
		$("body").load("student_home.php");
	});

});