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

	$(document).on("click", "#next-oh-delete", function() {
		var old_start = $("#next-oh-old-start").text();
		var netid = $("#instructor_id").text();

		$.ajax({
			url: 'ajax/ta_delete_next.php',
			data: {old_start: old_start, netid: netid},
			type: 'POST',
			success: function(response) {
				$("#next-oh-details").html(response); 
			}
		});
	});

	$(document).on("click", "#next-oh-edit", function() {
		$(this).attr('src', 'img/confirm_icon.png')
			.attr('id', 'next-oh-confirm');

		next_oh_array = getDateArray($("#next-oh-date").text());

		$("#next-oh-date").html("<span id = 'next-oh-day'>"+next_oh_array[0]+"</span>, <select id = 'next-oh-month-select' class = 'next-oh-input thin'>\
			<option value = '0 Jan'>Jan</option>\
			<option value = '1 Feb'>Feb</option>\
			<option value = '2 Mar'>Mar</option>\
			<option value = '3 Apr'>Apr</option>\
			<option value = '4 May'>May</option>\
			<option value = '5 Jun'>Jun</option>\
			<option value = '6 Jul'>Jul</option>\
			<option value = '7 Aug'>Aug</option>\
			<option value = '8 Sep'>Sep</option>\
			<option value = '9 Oct'>Oct</option>\
			<option value = '10 Nov'>Nov</option>\
			<option value = '11 Dec'>Dec</option>\
			</select>");

		$("#next-oh-month-select option:contains('"+next_oh_array[1]+"')").attr("selected", true);

		$("#next-oh-date").append("<select id = 'next-oh-date-select' class = 'next-oh-input thin'></select>");
		setNextOHDate(next_oh_array[2]);

		$("#next-oh-room").html("<input type = 'date' value = '" + $("#next-oh-room").text() + "' class = 'next-oh-input thin' size = '14'>");


		var start_time = $("#next-oh-hours").text().split(" - ")[0].split(" ")[0];
		var end_time = $("#next-oh-hours").text().split(" - ")[1].split(" ")[0];

		var start_am = $("#next-oh-hours").text().split(" - ")[0].split(" ")[1];
		var end_am = $("#next-oh-hours").text().split(" - ")[1].split(" ")[1];

		$("#next-oh-start").html("<input id = 'next-oh-start-input' type = 'date' value = '" + start_time + "' class = 'next-oh-input thin' size = '3'>\
			<select class = 'next-oh-input thin'><option value = 'AM'>AM</option><option value = 'PM'>PM</option></select>");
		$("#next-oh-start option[value='"+start_am+"']").attr('selected', true);

		$("#next-oh-end").html("<input id = 'next-oh-end-input' type = 'date' value = '" + end_time + "' class = 'next-oh-input thin' size = '3'>\
			<select class = 'next-oh-input thin'><option value = 'AM'>AM</option><option value = 'PM'>PM</option></select>");
		$("#next-oh-end option[value='"+end_am+"']").attr('selected', true);
	});

	$(document).on("change", "#next-oh-month-select", function() {
		setNextOHDate();
	});

	$(document).on("change", "#next-oh-date-select", function() {
		var month = $(this).prev().val().split(" ")[0];
		var date = $(this).val();
		var day = getDayFromDate(month, date);
		$("#next-oh-day").text(day);
	});

	$(document).on("click", "#next-oh-confirm", function() {
		var day = $("#next-oh-date").text().split(",")[0];
		var month = $("#next-oh-date select:first").val().split(" ")[1];
		var month_num = parseInt($("#next-oh-date select:first").val().split(" ")[0]) + 1;
		var date = $("#next-oh-date select:last").val();
		var temp_d = new Date();
		var year = temp_d.getFullYear();
		var full_date = "<span id = 'next-oh-day'>"+day+"</span>" + ", " + month + " " + date;

		var room = $("#next-oh-room input").val();

		var start_time = $("#next-oh-start-input").val();
		if ($("#next-oh-start select").val() == "PM") {
			var sql_start_time = ( parseInt(start_time.split(":")[0]) + 12 ) + ":" + start_time.split(":")[1] + ":00";
		} else {
			var sql_start_time = start_time + ":00";
			while (sql_start_time.length < 8) {
				sql_start_time = "0" + sql_start_time;
			}
		}

		var end_time = $("#next-oh-end-input").val();
		if ($("#next-oh-end select").val() == "PM") {
			var sql_end_time = ( parseInt(end_time.split(":")[0]) + 12 ) + ":" + end_time.split(":")[1] + ":00";
		} else {
			var sql_end_time = end_time + ":00";
			while (sql_end_time.length < 8) {
				sql_end_time = "0" + sql_end_time;
			}
		}

		var full_hours = start_time + " - " + end_time;

		var old_start = $("#next-oh-old-start").text();
		var netid = $("#instructor_id").text();

		$.ajax({
			url: 'ajax/ta_edit_next.php',
			data: {year: year, month: month_num, date: date, start_time: sql_start_time, end_time: sql_end_time, room: room, old_start: old_start, netid: netid},
			type: 'POST'
		});

		$(this).attr('src', 'img/edit_icon.png')
			.attr('id', 'next-oh-edit');
		$("#next-oh-date").html("<li id = 'next-oh-date'>"+ full_date +"</li>");
		$("#next-oh-room").html("<li id = 'next-oh-room'>"+room+"</li>");
		$("#next-oh-start").html(start_time + " " + $("#next-oh-start select").val());
		$("#next-oh-end").html(end_time + " " + $("#next-oh-end select").val());
	});

	$(document).on("click", ".oh", function() {
		var arr = $(this).children("#info").first().text().split('/');
		var month_arr = $("#month-name").text().split(' ');
		var month = monthToInt(month_arr[0]);
		var day = parseInt($(this).parent().attr('id'));
		if (day < 10) day = "0" + (day);
		
		var d = new Date();
		var d_oh = new Date(month_arr[0] + ' ' + arr[1] + ', ' + month_arr[1] + ' ' + arr[3]);
		

		/* Name: arr[0]
		 * Room: arr[4]
		 * Month: month_arr[0]
		 * Day: arr[1]
		 * Year: month_arr[1]
		 * Start Time: arr[2]
		 * End Time: arr[3]
		 * Feedback: arr[5]
		 * netid: arr[6]
		 */
		
		// TA is viewing his/her own OH
		if (arr.length == 8) {
			if (d < d_oh) {
				var form =
					"<form id='edit_OH' class='calendar-popup-form' method='post'>" +
					"<span>Room </span><input type='text' name='room' value='" + arr[4] + "'><br>" +
					"<span>Date </span><input type='date' name='date' value='" + month_arr[1] + '-' + month + '-' + arr[1] + "'><br>" +
					"<span>Start </span><input type='time' name='start' value='" + arr[2] + "'><br>" +
					"<span>End </span><input type='time' name='end' value='" + arr[3] + "'><br>" +
					"<span id='num-registered'>" + arr[7] + "</span>" +
					"<input type='hidden' id='cal-ins-netid' value='" + arr[6] + "'>" +
					"<input type='hidden' id='start-time-cal' value='" + month_arr[1] + "-" + month + "-" + day + " " + arr[2] + ":00'>" + 
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
					"<span id='num-registered'>" + arr[7] + "</span>" +
					"<input type='hidden' id='cal-ins-netid' value='" + arr[6] + "'>" + 
					"<input type='hidden' id='start-time-cal' value='" + month_arr[1] + "-" + month + "-" + day + " " + arr[2] + ":00'>" + 
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
			//if (d < d_oh) {
				var form =
					"<span>" + arr[0] + "</span><br>" +
					"<span>" + arr[4] + "</span><br>" +
					"<span>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>" +
					"<span id='num-registered'>" + arr[6] + "</span>";
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
			/*}
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
			}*/
		}
	});
	
	$(document).on("click", ".oh img", function(e) {
		var arr = $(this).next().text().split('/');
		console.log(arr);
		var month_arr = $("#month-name").text().split(' ');
		var month = monthToInt(month_arr[0]);
		var day = parseInt($(this).parent().parent().attr('id'));
		if (day < 10) day = "0" + (day);
		var old_start = month_arr[1] + "-" + month + "-" + day + " " + arr[2] + ":00";
		e.stopPropagation();
		console.log("test");
		$.ajax({
			url: 'ajax/ta_delete_next.php',
			type: 'post',
			data: {netid : arr[6], old_start : old_start},
			success:function(){
				console.log("suecces?");
				console.log(arr[6], old_start);
				var m = $("#month-name").text();
				m = m.substring(0,m.indexOf(' '));
				var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
				$("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
			},
			error:function(){
				console.log("error");
			}
		})
		//cal-ins-netid
		/*$(document).on('submit', 'form#register-false', function(e) {
			e.preventDefault();
			var p_cat = $("#p-cat-cal").val();
			var p_desc = $("#p-desc-cal").val();
			var s_netid = $("#s-netid-cal").val(); 
			var i_netid = $("#i-netid-cal").val(); 
			var old_start = $("#next-oh-old-start").text();
			var netid = $("#instructor_id").text();
	
			$.ajax({
				url: 'ajax/ta_delete_next.php',
				data: {old_start: old_start, netid: netid},
				type: 'POST',
				success: function(response) {
					$("#next-oh-details").html(response); 
				}
			});
		});*/
	});
	
	$(document).on("click", "#month-right", function() {
		var p = $("#happening-now-header").offset();
		var h = $("#happening-now-header").height() + $("#happening-now-info").height();
		var w = $("#happening-now-header").width();
		$("#calendar-window").css({
			"top" : p.top + "px",
			"left" : p.left + "px",
			"width" : w + "px",
			"height" : h + "px",
			"display" : "block"
		});
	});
	
	$(document).on("click", "#window-close", function() {
		$("#calendar-window").hide();	
	});
	
	//TODO
	$(document).on('submit', 'form#edit_OH', function(e) {
		/*
		 *new_location = $_POST['room'];
	$netid = $_POST['netid'];
	$old_start = $_POST['old_start'];
	$month = $_POST['month'];
	while (strlen($month) < 2) {
		$month = '0'.$month;
	}

	$date = $_POST['date'];
	while (strlen($date) < 2) {
		$date = '0'.$date;
	}

	$new_date = $_POST['year'].'-'.$month.'-'.$date;
	$new_start = $new_date.' '.$_POST['start_time'];
	$new_end = $new_date.' '.$_POST['end_time'];
	*/

		e.preventDefault();
		$.ajax({
		    url:'ajax/OH_edit_instructor.php',
		    type:'post',
		    data:{netid : $("#cal-ins-netid").val(), old_start : $("#start-time-cal").val()},
		    success:function(){
			$("#calendar-popup").hide();
			var m = $("#month-name").text();
			m = m.substring(0,m.indexOf(' '));
			var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
			$("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
		    }
		});
	});
	
	$(document).on('submit', 'form#calendar-window-form', function(e) {
		e.preventDefault();
		var netid = $("#window-netid").text();
		var location = $('#window-room').val();
		var date = $('#window-date').val();
		var start_time = date + ' ' + $('#window-start-time').val() + ':00';
		var end_time = date + ' ' + $('#window-end-time').val() + ':00';
		var weekly = $('#window-weekly').prop('checked');
		console.log(netid + ", " + location + ", " + start_time + ", " + end_time + ", " + weekly);
		
		$.ajax({
			url:'ajax/ta_add.php',
			type:'post',
			data:{netid : netid, location : location, date : date, start_time : start_time, end_time : end_time, weekly : weekly},
			success:function(){
				$("#calendar-window").hide();
				var m = $("#month-name").text();
				m = m.substring(0,m.indexOf(' '));
				var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
				$("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
			}
		});
	});
	
	$(document).on('submit', 'form#feedback', function(e) {
		e.preventDefault();
		// ta netid
		// date/time
		// feedback
		console.log($('#cal-ins-netid').val());
		console.log($('#start-time-cal').val());
		console.log($("form#feedback textarea").val());
		$.ajax({
		    url:'ajax/ta_feedback.php',
		    type:'post',
		    data:{netid : $('#cal-ins-netid').val(), start_time : $('#start-time-cal').val(), feedback : $("form#feedback textarea").val()},
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


function getDateArray(date) {
	var next_oh_array = date.split(' ');
	var month = next_oh_array[1];
	var date = next_oh_array[2];
	var day = next_oh_array[0].split(',')[0];
	return [day, month, date];
}

function getDayFromDate(month, date) {
	var d = new Date();
	var year = d.getFullYear();
	d.setFullYear(year, parseInt(month), parseInt(date));
	var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	return days[d.getDay()];
}

function setNextOHDate(set_date) {
	var month = $("#next-oh-month-select").val().split(" ")[1];
	if (month == "Jan" || month == "Mar" || month == "May" || month == "Jul" || month == "Aug" || month == "Oct" || month == "Dec")
		var num_days = 31;
	else if (month == "Feb")
		var num_days = 28;
	else
		var num_days = 30;

	$("#next-oh-date-select").empty();
	for (var i = 1; i <= num_days; i++) {
		if (i != set_date) {
			$("#next-oh-date-select").append("<option value = '"+i+"'>"+i+"</option>");
		} else {
			$("#next-oh-date-select").append("<option value = '"+i+"' selected = 'selected'>"+i+"</option>");
		}

	}

	var day = getDayFromDate($("#next-oh-month-select").val().split(" ")[0], $("#next-oh-date-select").val());
	$("#next-oh-day").text(day);
}

function dispOH(first_name,last_name,day,s_time,e_time,location, i_id, strikethrough, registered) {
	var hr_s = parseInt(s_time.substring(0,s_time.indexOf(':'))) % 12;
	if (hr_s == 0) hr_s = 12;
	console.log(hr_s);
	var hr_e = parseInt(e_time.substring(0,e_time.indexOf(':'))) % 12;
	if (hr_e == 0) hr_e = 12;
	var time = hr_s + s_time.substring(s_time.indexOf(':')) + '-' + hr_e + e_time.substring(e_time.indexOf(':'));
	$("#" + (+day)).append("<div class='oh clickable" + strikethrough + "'>" + time + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + i_id + "/" + registered + "</div></div>")
}
function dispOH_self(first_name,last_name,day,s_time,e_time,location, feedback, cancel, i_id, strikethrough, registered) {
	var hr_s = parseInt(s_time.substring(0,s_time.indexOf(':'))) % 12;
	if (hr_s == 0) hr_s = 12;
	console.log(hr_s);
	var hr_e = parseInt(e_time.substring(0,e_time.indexOf(':'))) % 12;
	if (hr_e == 0) hr_e = 12;
	var time = hr_s + s_time.substring(s_time.indexOf(':')) + '-' + hr_e + e_time.substring(e_time.indexOf(':'));
	if(cancel !== ""){
		$("#" + (+day)).addClass('dark-red');
	}
	$("#" + (+day)).append("<div class='oh clickable " + strikethrough + "'>" + time + cancel + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + feedback + "/" + i_id + "/" + registered + "</div></div>")
}
