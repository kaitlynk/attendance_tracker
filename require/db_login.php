<?php session_start();
	if (file_exists('require/password.php'))
        require 'require/password.php';
    else require '../require/password.php';
    $mysqli = new mysqli($host,$login,$password,$databaseName);

    if (mysqli_connect_error() ){
        die("Can't connect to database: " . $mysqli->error);
    }

    class Person {
    	public $userid;
    	public $username;
    	public $netid;
    	public $firstName;
    	public $lastName;
    	public $groups;
    }

    function set_user($user_array) {
        $temp_person = new Person();
        $temp_person->netid = $user_array['netid'];
        $temp_person->firstName = $user_array['first_name'];
        $temp_person->lastName = $user_array['last_name'];
        $_SESSION['current_user'] = $temp_person;
    }
?>