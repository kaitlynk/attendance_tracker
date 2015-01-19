<?php 
	if (mysqli_num_rows($result) > 0) {
	    while($row = mysqli_fetch_assoc($result)) {
	        echo "<div class = 'happening-now-list-section center'>
	       		<span class = 'happening-now-number hidden'>".$row['att_id']."</span>
				<div class = 'happening-now-list-section-text left font-size-14 border-box'>
					<span class = 'timestamp orange'>[";
			
			if (strcasecmp($page_type, "ta") == 0) echo strtoupper($row['s_netid']);
			else echo change_to_time($row['registration_time'], true);

			echo "]</span> 
					<span class = 'category'>".strtoupper($row['p_cat'])."</span>: 
					<span class = 'problem'>
						".$row['p_desc']."
					</span>
				</div>";
			if (strcasecmp($page_type, "student") == 0 && strcasecmp($_SESSION['current_user']->netid, $row['s_netid']) == 0) {
				echo '<img src = "img/delete_icon.png" class = "happening-now-list-delete clickable" />';
			}
			echo "</div>";
	    }

	} else {
	    echo "<span class = 'italic red' id = 'no-registrations-msg'>There are currently no registrations!</span>";
	}
?>