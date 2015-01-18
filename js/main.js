$(document).ready(function() {
	$(document).on("click", ".happening-now-list-delete", function() {
		var att_id = $(this).siblings('.happening-now-number').text();
		$.ajax({
			url: 'ajax/student_remove.php',
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

	$("#happening-now-right-arrow").click(function() {

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
		var instructor = $("#instructor_id").text();
		var start_time = $("#start_time").text();
		var registration = {p_cat: category, p_desc: problem, s_netid: student, i_netid: instructor, start_time: start_time};
		$.ajax({
			url: 'ajax/student_add.php',
			data: registration,
			type: 'POST',
			success: function(result) {
				var number = result.split("|")[0];
				var time = result.split("|")[1];
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

				var height = $(".happening-now-list-section").height();

				$(".happening-now-list-section").last().animate({
					height: height
				});
			}
		});
		
	}
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