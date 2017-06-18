<?php 
include_once '../Class/database.php';
include_once '../Common/funcionesphp.php';

$conn = new dataBase('alumnado');
if ( $conn->sqlmsg != "") {
	displaylog("Error al Conectar base");
	echo $conn->sqlmsg ; // "Al conectar con la base";
	exit;
}
// $conn->set_charset("utf8");
?>