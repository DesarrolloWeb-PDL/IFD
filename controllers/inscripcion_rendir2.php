<?php
  
  // Arma grilla de consulta principal de Profesores, tomando los parametros de Filtro   

  // Utilizado para completar tablas bootstrap  => Genera un archivo tipo json desde una consulta SQL 

  require_once '../class/database.php';
  include_once ("../common/funcionesphp.php");

  // Tomo todos los parametros de entrada para filtrar

  $NombreSP=$_POST['nombreSP'];
  
  $conexion = new database('alumnado');
  if ( $conexion->sqlmsg <> "") {
  	displaylog("Error ejecutar SP: Al Conectar base");
  	echo $conexion->sqlmsg ; // "Al conectar con la base";
  	exit;
  }
  
  
  $data=$conexion->jsonSP( $NombreSP); // Ejecuta el SP y retorna un String tipo json
  if ( $conexion->sqlmsg <> "") {
  	displaylog("Error en inscripcion_rendir2: Al consultar base y generar json");
  	echo $conexion->sqlmsg;
  	exit;
  }
  // Gravo un archivo json para que lo tome la tabla que lo llamo
  $file = "json/ventas.json";
  file_put_contents($file, $data);
  $respuesta = array("html"=>$file);
  echo json_encode($respuesta);
   
 ?>