$(document).ready(function() {

	$(document).on('click', '.all-oh-list-problem, .all-oh-list-category', function() {
		$(this).parent().stopPropagation();
	});

	$(document).on({
		mouseenter: function() {
			$(this).attr('src', 'img/confirm_icon.png');
		}, 
		mouseleave: function() {
			$(this).attr('src', 'img/confirm_icon_empty.png');
		}
	}, ".icon-empty");

	$(document).on("click", ".icon-empty", function() {
		$(this).attr('src', 'img/confirm_icon.png');
		$(this).removeClass('icon-empty')
			.addClass('icon-selected');
	});

	$(document).on("click", ".icon-selected", function() {
		$(".all-oh-list-expanded").stop();
		$(this).attr('src', 'img/confirm_icon_empty.png');
		$(this).addClass('icon-empty')
			.removeClass('icon-selected');
	});

	$(document).on("click", ".all-oh-list-info", function() {
		$(this).children(".all-oh-list-expanded").slideToggle();
		$(this).children(".all-oh-list-feedback").slideToggle();
	});


	$(document).on("click", "#all-oh-toggle-cal", function() {
		$("#calendar").show();
		$("#all-oh-list").hide();
		$(this).removeClass('light-gray')
			.removeClass('clickable')
			.addClass('black');
		$("#all-oh-toggle-list").removeClass('black')
			.addClass('light-gray')
			.addClass('clickable');
	});

	$(document).on("click", "#all-oh-toggle-list", function() {
		$("#all-oh-list").show();
		$("#calendar").hide();
		$(this).removeClass('light-gray')
			.addClass('black')
			.removeClass('clickable');
		$("#all-oh-toggle-cal").removeClass('black')
			.addClass('light-gray')
			.addClass('clickable');
	});

	$(document).on("click", ".happening-now-list-delete", function() {
		var att_id = $(this).siblings('.happening-now-number').text();
		$.ajax({
			url: 'ajax/student_remove.php',
			data: {att_id: att_id},
			type: 'POST'
		});

		$(this).siblings().hide();
		$(this).parent().slideToggle();
		$(this).parent().remove();

		if (!$(".happening-now-list-section").last().hasClass("no-bottom-border")) {
			$(".happening-now-list-section").last().addClass("no-bottom-border");
		}

		if ($(".happening-now-list-section").length == 0) {
			$("#happening-now-list").append("<span class = 'italic red' id = 'no-registrations-msg'>There are currently no registrations!</span>");
		} 
		
	});

	$(document).on("click", "#happening-now-right-arrow", function() {
		if ($(this).children(".medium-arrow-right").length > 0) {
			var next_instructor_num = parseInt($("#curr-instructor-num").text()) + 1;
			getNextHappeningNow(next_instructor_num);
		}
	});

	$(document).on("click", "#happening-now-left-arrow", function() {
		if ($(this).children(".medium-arrow-left").length > 0) {
			var next_instructor_num = parseInt($("#curr-instructor-num").text()) - 1;
			getNextHappeningNow(next_instructor_num);
		}
	});

	$(document).on("focus", "#happening-now-problem", function() {
		if ($(this).val() == "Description of Problem (approx. 10 words)")
			$(this).val("");
	});

	$(document).on("focusout", "#happening-now-problem", function() {
		if ($(this).val() == "") {
			$(this).val("Description of Problem (approx. 10 words)");
		}
	});

	$(document).on("click", ".medium-arrow-left-white", function() {
		var m = $("#month-name").text();
		m = m.substring(0,m.indexOf(' '));
		var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
		$("#calendar").load("partials/calendar.php", { month : m, direction : 'left', netid : current_user[0], ins : current_user[1]});	
	});
	
	$(document).on("click", ".medium-arrow-right-white", function() {
		var m = $("#month-name").text();
		m = m.substring(0,m.indexOf(' '));
		var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
		$("#calendar").load("partials/calendar.php", { month : m, direction : 'right', netid : current_user[0], ins : current_user[1]});
	});
	
	$(document).mouseup(function (e){
		var cp = $("#calendar-popup");
		if (!cp.is(e.target) && !($.contains(cp.get(0),e.target)) && cp.css("display") == "block") cp.hide();
	});
	
	$(document).on('focus click', '#feedback textarea', function() {
		if ($(this).val() == "Feedback") {
			$(this).val("");
		}
	});

	$(document).on('focusout', '#feedback textarea', function() {
		if ($(this).val() == "") {
			$(this).val("Feedback");
		}
	});

	$(document).on('click', '.all-oh-list-reserve', function() {
		$(this).after('<div class = "all-oh-list-expanded hidden">\
				<textarea class = "all-oh-list-problem" class = "font-size-14 border-box thin">Description of Problem (approx. 10 words)</textarea>\
				<select class = "all-oh-list-category">\
					<option value = "">-- Select Category --</option>\
					<option value = "HTML">HTML</option>\
					<option value = "CSS">CSS</option>\
					<option value = "PHP">PHP</option>\
					<option value = "JS">JavaScript</option>\
					<option value = "SQL">SQL</option>\
					<option value = "General">General</option>\
				</select>\
			</div>');
	});

	$(document).on('click', '.all-oh-list-unreserve', function() {
		//$(this).parent().stopPropagation();
		att_id = $(this).siblings('.all-oh-list-attending-id').text();
		$.ajax({
			url: 'ajax/student_remove.php',
			data: {att_id: att_id},
			type: 'POST',
			success: function() {
				$("this").parent().animate({
					height: "0px"
				});
			}
		});
	});

	$(document).on('change', '.all-oh-list-problem, .all-oh-list-category', function() {

	});
});

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function addNewSection() {
	var category = $("#happening-now-category").val();

	if (category == "") {
		alert("Please choose a category in order to register!");
		return false;
	} else {
		if (category == "JavaScript") category = "JS";
		var problem = $("#happening-now-problem").val();
		var student = $("#student_id").text();
		var instructor = $("#curr-instructor-id").text();
		var start_time = $("#start-time").text();
		var registration = {p_cat: category, p_desc: problem, s_netid: student, i_netid: instructor, start_time: start_time};
		$.ajax({
			url: 'ajax/student_add.php',
			data: registration,
			type: 'POST',
			success: function(result) {
				var number = result.split("|")[0]; 
				var time = result.split("|")[1];
				$("#happening-now-problem").val("Description of Problem (approx. 10 words)");

				$("#no-registrations-msg").remove();

				$(".happening-now-list-section").last().removeClass("no-bottom-border");
				$("#happening-now-list").append('<div class = "happening-now-list-section no-bottom-border center no-height">\
					<span class = "happening-now-number hidden">'+number+'</span>\
					<div class = "happening-now-list-section-text left font-size-14 border-box">\
						<span class = "timestamp orange">['+time+']</span> \
						<span class = "category">'+category+'</span>: \
						<span class = "problem">\
							'+problem+'\
						</span>\
					</div>\
					<img src = "img/delete_icon.png" class = "happening-now-list-delete red clickable" />\
				</div>');
				$('#happening-now-list').stop().animate({
				  scrollTop: $("#happening-now-list")[0].scrollHeight
				}, 800);
			}
		});
		
	}
}

function getNextHappeningNow(next_instructor_num) {
	var next_instructor_info = $($(".curr-instructors")[next_instructor_num]).text().split('|');
	var next_instructor_netid = next_instructor_info[0];
	var next_instructor_time = next_instructor_info[1];
	$.ajax({
		url: 'ajax/happening_now_next.php',
		data: {netid: next_instructor_netid, start_time: next_instructor_time},
		type: 'POST',
		success: function(result) {
			$("#happening-now-list").html(result);
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
}

function monthToInt(monthName) {
	for (var i = 0, len = months.length; i < len; i++) {
		if (months[i] == monthName){
			if (i < 9) return "0" + (i+1);
			else return i+1;
		}
	}
	return -1;
}