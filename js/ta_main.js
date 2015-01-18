$(document).ready(function() {
	$(".happening-now-list-section").hover(function() {
		$(this).append('<img src = "img/confirm_icon.png" class = "happening-now-list-finish clickable" />');
		$(".happening-now-list-finish").css('top', ($(this).height() - $('.happening-now-list-finish').height()) / 2);
	}, function() {
		$(".happening-now-list-finish").remove();
	});

	$(document).on("click", ".happening-now-list-finish", function() {
		var att_id = $(this).siblings('.happening-now-number').text();
		$.ajax({
			url: 'ajax/ta_finish.php',
			data: {att_id: att_id},
			type: 'POST'
		});

		$(this).siblings().hide();
		$(this).parent().slideToggle();
		$(this).remove();

		if (!$(".happening-now-list-section").last().hasClass("no-bottom-border")) {
			$(".happening-now-list-section").last().addClass("no-bottom-border");
		}
	});
	
	$(document).on("click", ".oh", function() {
		var arr = $(this).children("#info").first().text().split('/');
		var month_arr = $("#month-name").text().split(' ');
		var day = month_arr[0] + ' ' + arr[1] + ', ' + month_arr[1]
		var d = new Date();
		var d_oh = new Date(day + ' ' + arr[3]);
		
		/* Name: arr[0]
		 * Room: arr[4]
		 * Month: month_arr[0]
		 * Day: arr[1]
		 * Year: month_arr[1]
		 * Start Time: arr[2]
		 * End Time: arr[3]
		 * Feedback: arr[5]
		 */
		
		// TA is viewing his/her own OH
		if (arr.length == 6) {
			if (d < d_oh) {
				var form =
					"<form id='edit_OH' class='calendar-popup-form' method='post'>" +
					"<span>Room </span><input type='text' name='room' value='" + arr[4] + "'><br>" +
					"<span>Date </span><input type='date' name='date' value='" + month_arr[1] + '-' + monthToInt(month_arr[0]) + '-' + arr[1] + "'><br>" +
					"<span>Start </span><input type='time' name='start' value='" + arr[2] + "'><br>" +
					"<span>End </span><input type='time' name='end' value='" + arr[3] + "'><br>" +
					"<input type='submit' value='Submit'>" + 
					"</form>";
				$("#calendar-popup").empty();
				$("#calendar-popup").html(form);
				var offset = $(this).offset();
				var x_pos = offset.left - $("#calendar-popup").width() + 40;
				var y_pos = offset.top - $("#calendar-popup").height() - 28;
				$("#calendar-popup input[type='submit']").css({
					"width" : "75%"
				});
				$("#calendar-popup").css({
					"top" : y_pos,
					"left" : x_pos,
					"display" : "block"
				});
			}
			else {
				var form =
					"<form id='feedback' class='calendar-popup-form' method='post'>" +
					"<textarea name='feedback' rows='3'>" + arr[5] + "</textarea><br>" +
					"<input type='submit' value='Submit'>" +
					"</form>";
				$("#calendar-popup").empty();
				$("#calendar-popup").html(form);
				var offset = $(this).offset();
				var x_pos = offset.left - $("#calendar-popup").width() + 40;
				var y_pos = offset.top - $("#calendar-popup").height() - 28;
				/*var style = $("<style>", {
					id : 'styletag',
					type : 'text/css',
					html : '#calendar-popup:after { right : 25px; bottom : -12px; }'
				}).appendTo('head');*/
				$("#calendar-popup input[type='submit']").css({
					"width" : "100%"
				});
				$("#calendar-popup").css({
					"top" : y_pos,
					"left" : x_pos,
					"display" : "block"
				});
			}
		}
		// TA is viewing different TA's OH
		else {
			var start = arr[2].split(':');
			var end = arr[3].split(':');
			var s_ampm = (start[0] > 11) ? " PM" : " AM";
			var e_ampm = (end[0] > 11) ? " PM" : " AM";
			var s_hr = (start[0] % 12) == 0 ? 12 : start[0] % 12;
			var e_hr = (end[0] % 12) == 0 ? 12 : end[0] % 12;
			if (d < d_oh) {
				var form =
					"<span>" + arr[0] + "</span><br>" +
					"<span>" + arr[4] + "</span><br>" +
					"<span>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>";
				$("#calendar-popup").empty();
				$("#calendar-popup").html(form);
				var offset = $(this).offset();
				var x_pos = offset.left - $("#calendar-popup").width() + 40;
				var y_pos = offset.top - $("#calendar-popup").height() - 28;
				$("#calendar-popup").css({
					"top" : y_pos,
					"left" : x_pos,
					"display" : "block"
				});
			}
			else {
				var form =
					"<span>" + arr[0] + "</span><br>" +
					"<span>" + arr[4] + "</span><br>" +
					"<span>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>";
				$("#calendar-popup").empty();
				$("#calendar-popup").html(form);
				var offset = $(this).offset();
				var x_pos = offset.left - $("#calendar-popup").width() + 40;
				var y_pos = offset.top - $("#calendar-popup").height() - 28;
				var style = $("<style>", {
					id : 'styletag',
					type : 'text/css',
					html : '#calendar-popup:after { right : 25px; bottom : -12px; }'
				}).appendTo('head');
				$("#calendar-popup").css({
					"top" : y_pos,
					"left" : x_pos,
					"display" : "block"
				});
			}
		}
	});
	
	$(document).on("click", ".oh img", function(e) {
		e.stopPropagation();
		// TODO: remove OH
	});
	//TODO
	$(document).on('submit', 'form#edit_OH', function(e) {
		e.preventDefault();
		$.ajax({
		    url:'partials/OH_edit_instructor.php',
		    type:'post',
		    data:$('#calendar-popup-form').serialize(),
		    success:function(){
			$("#calendar-popup").hide();
			var m = $("#month-name").text();
			m = m.substring(0,m.indexOf(' '));
			var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
			$("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
		    }
		});
	});
	$(document).on('submit', 'form#feedback', function(e) {
		e.preventDefault();
		$.ajax({
		    url:'partials/OH_feedback_instructor.php',
		    type:'post',
		    data:$('#calendar-popup-form').serialize(),
		    success:function(){
			$("#calendar-popup").hide();
			var m = $("#month-name").text();
			m = m.substring(0,m.indexOf(' '));
			var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
			$("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
		    }
		});
	});
});

function dispOH(first_name,last_name,day,s_time,e_time,location) {
	$("#" + (+day)).append("<div class='oh clickable'>" + first_name + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "</div></div>")
}

function dispOH_self(first_name,last_name,day,s_time,e_time,location, feedback, cancel) {
	if(cancel !== ""){
		$("#" + (+day)).addClass('dark-red');
	}
	$("#" + (+day)).append("<div class='oh clickable'>" + first_name + cancel + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + feedback + "</div></div>")
}
