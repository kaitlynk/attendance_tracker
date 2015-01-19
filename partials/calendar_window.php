<div id = "calendar-window-header">
    Add New OH
    <img src='img/close_icon.png' id='window-close' alt='close'>
</div>
<form id = "calendar-window-form" method = "post">
    <div>Room</div>
    <input type='text' name='room' id='window-room'>
    <div>Date</div>
    <input type='date' name='date' id='window-date'>
    <div>Time</div>
    <div id='window-form-time'><input type='time' name='start' class='float-left' id='window-start-time'><span id='time-center'> - </span><input type='time' name='end' class='float-right' id='window-end-time'></div>
    <div class='clear'>Weekly? &nbsp;&nbsp;<input type='checkbox' name='weekly' value='weekly' id='window-weekly'></div>
    <input type='submit' value='Submit'>
   <!--
    // pull netid from page
    // 
    -->
</form>