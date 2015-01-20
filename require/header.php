<?php require 'require/db_login.php'; ?>

<html>
	<head>
		<title>Office Hours INFO/CS 2300</title>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/matt.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src = "js/dev_main.js"></script>
		<script src = "js/main.js"></script>
		<script>
			$(document).ready(function() {
				setInterval(function(){
					var netid = $("#curr-instructor-id").text();
					var start_time = $("#start-time").text();

					$.ajax({
						url: 'ajax/polling_happening_now.php',
						data: {netid: netid, start_time: start_time},
						type: "POST",
						success: function(response) {
							var resp_array = response.split("|");

							var num_happening_now = $(".happening-now-list-section").length;
							var num_new_int = parseInt(resp_array[0]);

							var num_instr = $("#happening-now-num").text();
							if (num_instr == "") num_instr = 1;
							var num_new_instr = parseInt(resp_array[1]);

							var new_instr = resp_array[2];

							console.log(num_new_instr, num_instr, num_happening_now, num_new_int);

							if (num_new_instr != parseInt(num_instr) || num_happening_now != num_new_int) {
								var curr_instr_num = parseInt($("#curr-instructor-num").text());
								var curr_instr_info = $($(".curr-instructors")[curr_instr_num]).text().split('|');
								var curr_instr_netid = curr_instr_info[0];
								var curr_instr_time = curr_instr_info[1];

								var scroll_top = $("#happening-now-list").scrollTop();

								if (new_instr != netid) {
									$.ajax({
										url: 'ajax/happening_now_next.php',
										data: {netid: curr_instr_netid, start_time: curr_instr_time},
										type: 'POST',
										success: function(result) {
											$("#happening-now-list").html(result);
											$('#happening-now-list').scrollTop(scroll_top);
											$("#curr-instructor-num").text(next_instructor_num);
											$("#curr-instructor-id").text(next_instructor_netid);
											$("#start-time").html(next_instructor_time);
											$("#happening-now-details-ta").html("<li>" + next_instructor_info[4] + " " + next_instructor_info[5] + "</li>\
												<li>" + next_instructor_info[2] + " - " + next_instructor_info[3] + "</li>\
												<li>" + next_instructor_info[6] + "</li>");

											if (next_instructor_num == $(".curr-instructors").length - 1) {
												$("#happening-now-right-arrow").children().removeClass("medium-arrow-right")
													.addClass("medium-arrow-right-gray");
												$("#happening-now-right-arrow").removeClass("clickable");
												$("#happening-now-left-arrow").addClass("clickable");
												$("#happening-now-left-arrow").children().removeClass("medium-arrow-left-gray")
													.addClass("medium-arrow-left");
											} else if (next_instructor_num == 0){
												$("#happening-now-left-arrow").children().removeClass("medium-arrow-left")
													.addClass("medium-arrow-left-gray");
												$("#happening-now-left-arrow").removeClass("clickable");
												$("#happening-now-right-arrow").addClass("clickable");
												$("#happening-now-right-arrow").children().removeClass("medium-arrow-right-gray")
													.addClass("medium-arrow-right");
											}
										}
									});
								} else {
									$("#happening-now").load('partials/happening_now.php', function(response) {
										$('#happening-now-list').scrollTop(scroll_top);
									});
								}
							}
						}
					})
				}, 3000);

				/*setInterval(function(){
				    $("#calendar").load("partials/calendar.php");
				}, 5000);*/
			});
		</script>
	</head>

	<body>