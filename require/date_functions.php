<?php
	function change_to_date($prevtime) {
		$date = date("D, M j", strtotime($prevtime));
		return $date;
	}

	function change_to_time($prevtime, $hasSecs) {
		$time = strtotime($prevtime);
		if ($hasSecs)
			$timestamp = date("g:i:s A", $time);
		else
			$timestamp = date("g:i A", $time);
		return $timestamp;
	}

	function change_back_time($prevtime) {
		$timestamp = date("Y-m-d H:i:s", $prevtime);
		return $timestamp;
	}
?>