<?php
session_start();
unset($_SESSION['username']);
unset($_SESSION['id']);
unset($_SESSION['isAdmin']);

header('Location: ../index.php');

?>