$(document).ready(function() {

    $(document).on("click", ".oh", function() {
        var arr = $(this).children("#info").first().text().split('/');
        var month_arr = $("#month-name").text().split(' ');
        var month = monthToInt(month_arr[0]);
        var day = parseInt($(this).parent().attr('id'));
        if (day < 10)  day = "0" + (day);
        
        var d = new Date();
        var d_oh = new Date(month_arr[0] + ' ' + arr[1] + ', ' + month_arr[1] + ' ' + arr[3]);
        
        var reg = ($(this).hasClass('dark-red'));
        
        if (d < d_oh) {
            var start = arr[2].split(':');
            var end = arr[3].split(':');
            var s_ampm = (start[0] > 11) ? " PM" : " AM";
            var e_ampm = (end[0] > 11) ? " PM" : " AM";
            var s_hr = (start[0] % 12) == 0 ? 12 : start[0] % 12;
            var e_hr = (end[0] % 12) == 0 ? 12 : end[0] % 12;
            var form =
                "<form id='register-" + reg + "' class='calendar-popup-form' method='post'>" +
                "<span class='calendar-popup-left'>TA </span><span class='calendar-popup-right'>" + arr[0] + "</span><br>" +
                "<span class='calendar-popup-left'>Room </span><span class='calendar-popup-right'>" + arr[4] + "</span><br>" +
                "<span class='calendar-popup-left'>Time </span><span class='calendar-popup-right'>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>" +
                "<textarea id = 'p-desc-cal'>" + arr[6] + "</textarea>" + 
		"<select id = 'p-cat-cal'>" + 
		    "<option value = ''>-- Select Category --</option>" +
                    "<option value = 'HTML'>HTML</option>" + 
                    "<option value = 'CSS'>CSS</option>" + 
                    "<option value = 'PHP'>PHP</option>" + 
                    "<option value = 'JS'>JavaScript</option>" + 
                    "<option value = 'SQL'>SQL</option>" + 
                    "<option value = 'General'>General</option>" + 
		"</select>" +
                "<span id='num-registered'>" + arr[7] + "</span>" +
                "<input type='hidden' id='i-netid-cal' value='" + arr[8] + "'>" +
                "<input type='hidden' id='s-netid-cal' value='" + arr[9] + "'>" +
                "<input type='hidden' id='start-time-cal' value='" + month_arr[1] + "-" + month + "-" + day + " " + arr[2] + ":00'>" + 
                "<input type='submit' value='Register!'>" +
                "</form";
            $("#calendar-popup").empty();
            $("#calendar-popup").html(form);
            $("select#p-cat-cal option").each(function() { this.selected = (this.text == arr[5]);});
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
            var start = arr[2].split(':');
            var end = arr[3].split(':');
            var s_ampm = (start[0] > 11) ? " PM" : " AM";
            var e_ampm = (end[0] > 11) ? " PM" : " AM";
            var s_hr = (start[0] % 12) == 0 ? 12 : start[0] % 12;
            var e_hr = (end[0] % 12) == 0 ? 12 : end[0] % 12;
            if (reg) {
                var reg = ($(this).hasClass('dark-red'));
                var form =
                    "<form id='feedback' class='calendar-popup-form' method='post'>" +
                    "<span>" + arr[0] + "</span><br>" +
                    "<span>" + arr[4] + "</span><br>" +
                    "<span>" + s_hr + ":" + start[1] + s_ampm + " - " + e_hr + ":" + end[1] + e_ampm + "</span><br>" +
                    "<span id='num-registered'>" + arr[6] + "</span>" + 
                    "<textarea name='feedback' rows='3'>" + arr[5] + "</textarea><br>" +
                    "<input type='hidden' id='i-netid-cal' value='" + arr[7] + "'>" +
                    "<input type='hidden' id='s-netid-cal' value='" + arr[8] + "'>" +
                    "<input type='hidden' id='start-time-cal' value='" + month_arr[1] + "-" + month + "-" + day + " " + arr[2] + ":00'>" + 
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
            else {
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
            }
        }        
    });
    
    $(document).on('submit', 'form#register-false', function(e) {
        e.preventDefault();
        var p_cat = $("#p-cat-cal").val();
        var p_desc = $("#p-desc-cal").val();
        var s_netid = $("#s-netid-cal").val(); 
        var i_netid = $("#i-netid-cal").val(); 
        var start_time = $("#start-time-cal").val();
        if (p_desc === "Description of Problem") p_desc = "";
        if (p_cat === "") {
            $("<div class='cal-error'>*** Please select a category <span>for your problem ***</span></div>").insertBefore($("#p-cat-cal"));
        }
        else {
            $.ajax({
                url:'ajax/student_add.php',
                type:'post',
                data:
                    {p_cat : p_cat,
                    p_desc : p_desc,
                    s_netid : s_netid, 
                    i_netid : i_netid, 
                    start_time : start_time},
                success:function(){
                    $("#calendar-popup").hide();
                    var m = $("#month-name").text();
                    m = m.substring(0,m.indexOf(' '));
                    var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
                    $("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
                }
            });
        }
    });
    
    $(document).on('submit', 'form#register-true', function(e) {
        e.preventDefault();
        var p_cat = $("#p-cat-cal").val();
        var p_desc = $("#p-desc-cal").val();
        var s_netid = $("#s-netid-cal").val(); 
        var i_netid = $("#i-netid-cal").val(); 
        var start_time = $("#start-time-cal").val();
        if (p_desc === "Description of Problem") p_desc = "";
        if (p_cat === "") {
            $("<div class='cal-error'>*** Please select a category <span>for your problem ***</span></div>").insertBefore($("#p-cat-cal"));
        }
        else {
            $.ajax({
                url:'ajax/student_update.php',
                type:'post',
                data:
                    {p_cat : p_cat,
                    p_desc : p_desc,
                    s_netid : s_netid, 
                    i_netid : i_netid, 
                    start_time : start_time},
                success:function(){
                    $("#calendar-popup").hide();
                    var m = $("#month-name").text();
                    m = m.substring(0,m.indexOf(' '));
                    var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
                    $("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
                }
            });
        }
    });
    
    $(document).on('submit', 'form#feedback', function(e) {
        e.preventDefault();
        console.log($('#s-netid-cal').val());
        console.log($('#i-netid-cal').val());
        console.log($('#start-time-cal').val());
        console.log($("form#feedback textarea").val());
        $.ajax({
            url:'ajax/student_feedback.php',
            type:'post',
            data:{s_netid : $('#s-netid-cal').val(), i_netid : $('#i-netid-cal').val(), start_time : $('#start-time-cal').val(), feedback : $("form#feedback textarea").val()},
            success:function(){
                $("#calendar-popup").hide();
                var m = $("#month-name").text();
                m = m.substring(0,m.indexOf(' '));
                var current_user = $('#student_id').length ? [$('#student_id').text(),0] : [$('#instructor_id').text(),1];
                $("#calendar").load("partials/calendar.php", { month : m, direction : 'none', netid : current_user[0], ins : current_user[1]});
            }
        });
    });
    
    $(document).on('focus click', '#p-desc-cal', function() {
        if ($(this).val() == "Description of Problem") {
            $(this).val("");
        }
    });

    $(document).on('focusout', '#p-desc-cal', function() {
        if ($(this).val() == "") {
            $(this).val("Description of Problem");
        }
    });
    
});

function dispOH(first_name,last_name,day,s_time,e_time,location,feedback,curr_r,registered,s_id,i_id) {
    var hr_s = parseInt(s_time.substring(0,s_time.indexOf(':'))) % 12;
    if (hr_s == 0) hr_s = 12;
    var hr_e = parseInt(e_time.substring(0,e_time.indexOf(':'))) % 12;
    if (hr_e == 0) hr_e = 12;
    var time = hr_s + s_time.substring(s_time.indexOf(':')) + '-' + hr_e + e_time.substring(e_time.indexOf(':'));
    if(curr_r !== ''){
            $("#" + (+day)).addClass('dark-red');
    }
    console.log(curr_r);
    $("#" + (+day)).append("<div class='oh clickable strikethrough" + curr_r + "'>" + time + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + feedback + "/" + registered + "/" + s_id + "/" + i_id + "</div></div>")
}

function dispOH_future(first_name,last_name,day,s_time,e_time,location,curr_r,p_cat,p_desc,registered,i_id,s_id) {
    var hr_s = parseInt(s_time.substring(0,s_time.indexOf(':'))) % 12;
    if (hr_s == 0) hr_s = 12;
    console.log(hr_s);
    var hr_e = parseInt(e_time.substring(0,e_time.indexOf(':'))) % 12;
    if (hr_e == 0) hr_e = 12;
    var time = hr_s + s_time.substring(s_time.indexOf(':')) + '-' + hr_e + e_time.substring(e_time.indexOf(':'));
    if(curr_r !== ''){
            $("#" + (+day)).addClass('dark-red');
    }
    $("#" + (+day)).append("<div class='oh clickable" + curr_r + "'>" + time + "<div id='info' class='hidden'>" + first_name + " " + last_name + "/" + day + "/" + s_time + "/" + e_time + "/" + location + "/" + p_cat + "/" + p_desc + "/" + registered + "/" + i_id + "/" + s_id + "</div></div>")
}