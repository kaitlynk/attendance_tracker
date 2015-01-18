<!DOCTYPE html>

<html>
	<head>
		<title>Steve's login test</title>
	</head>

	<body>
		<?php
			$HEADERS = apache_request_headers();
			$netid = $HEADERS["NETID"];
			echo "<p>You are logged in as NetID: $netid</p>";			
		?>
	</body>
</html>