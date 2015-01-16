<?php
	include 'require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if (mysqli_connect_error() ){
        die("Can't connect to database: " . $mysqli->error);
    }
?>

<html>
	<head>
		<title>Office Hours Tracker</title>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src = "js/main.js"></script>
	</head>

	<body>