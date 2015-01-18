$(document).ready(function() {
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
        if (d < d_oh) {
            var start = arr[2].split(':');
            var end = arr[3].split(':');
            var s_ampm = (start[0] > 11) ? " PM" : " AM";
            var e_ampm = (end[0] > 11) ? " PM" : " AM";
            var s_hr = (start[0] % 12) == 0 ? 12 : start[0] % 12;
            var e_hr = (end[0] % 12) == 0 ? 12 : end[0] % 12;
            
            var form =
                "<form id='register' class='calendar-popup-form' method='post'>" +
                "<span class='calendar-popup-left'>TA </span><span class='calendar-popup-right'>" + arr[0] + "</span><br>" +
                "<span class='calendar-popup-left'>Room </span><span class='calendar-popup-right'>" + arr[4] + "</span><br>" +
                "<span class='calendar-popup-left'>Time </span><span class='calendar-popup-right'>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>" +
                "<textarea>" + arr[6] + "</textarea>" + 
		"<select id = 'calendar-category'>" + 
		    "<option value = ''>-- Select Category --</option>" +
                    "<option value = 'HTML'>HTML</option>" + 
                    "<option value = 'CSS'>CSS</option>" + 
                    "<option value = 'PHP'>PHP</option>" + 
                    "<option value = 'JS'>JavaScript</option>" + 
                    "<option value = 'SQL'>SQL</option>" + 
                    "<option value = 'General'>General</option>" + 
		"</select>" +
                "<span id='num-registered'>" + arr[7] + "</span>" + 
                "<input type='submit' value='Register!'>" +
                "</form";
            $("#calendar-popup").empty();
            $("#calendar-popup").html(form);
            $("select#calendar-category option").each(function() { this.selected = (this.text == arr[5]);});
            var offset = $(this).offset();
            var x_pos = offset.left - $("#calendar-popup").width() + 40;
            var y_pos = offset.top - $("#calendar-popup").height() - 28;
            $("#calendar-popup input[type='submit']").css({
                    "width" : "100%"
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
                $("#calendar-popup input[type='submit']").css({
                        "width" : "100%"
                });
                $("#calendar-popup").css({
                        "top" : y_pos,
                        "left" : x_pos,
                        "display" : "block"
                });
        }        
    });
    
    $(document).on('submit', 'form#register', function(e) {
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

function dispOH(first_name,last_name,day,s_time,e_time,location,feedback) {
	$("#" + (+day)).append("<div class='oh clickable'>" + first_name + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + feedback + "</div></div>")
}

function dispOH_future(first_name,last_name,day,s_time,e_time,location,curr_r,p_cat,p_desc,registered) {
        if(curr_r !== ''){
		$("#" + (+day)).addClass('dark-red');
	}
	$("#" + (+day)).append("<div class='oh clickable" + curr_r + "'>" + first_name + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + p_cat + "/" + p_desc + "/" + registered + "</div></div>")
}