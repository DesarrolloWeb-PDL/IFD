<?php
  
  // Arma grilla de consulta principal de Profesores, tomando los parametros de Filtro   

  // Utilizado para completar tablas bootstrap  => Genera un archivo tipo json desde una consulta SQL 

  require_once '../class/database.php';
  include_once ("../common/funcionesphp.php");

  // Tomo todos los parametros de entrada para filtrar
  $apellido=$_POST['apellido'];
  $nombres=$_POST['nombres'];
  $documento=$_POST['documento'];
  
  $conexion = new database('alumnado');
  if ( $conexion->sqlmsg <> "") {
  	displaylog("Error en Profesores2: Al Conectar base");
  	echo $conexion->sqlmsg ; // "Al conectar con la base";
  	exit;
  }
  
  
  // Armo scrip de consulta
  $filtro = " where 1=1";
  if ( $apellido <> "") {
  	$filtro = $filtro . " AND apellido LIKE '%" .  $apellido .  "%' ";  	 
  }
  if ( $nombres <> "") {
  	$filtro = $filtro . " AND nombres LIKE '%" .  $nombres .  "%' ";  	 
  }
  if ( $documento <> "") {
  	$filtro = $filtro . " AND DNI LIKE '%" .  $documento .  "%' ";  	 
  }
  $filtro = $filtro . " order by apellido";
  
  $consulta= "SELECT apellido,Nombres,DNI,Id FROM Profesores " . $filtro ;

  $data=$conexion->json($consulta); // Ejecuta la consulta y retorna un String tipo json
  if ( $conexion->sqlmsg <> "") {
  	displaylog("Error en Profesores2: Al consultar base y generar json");
  	echo $conexion->sqlmsg;
  	exit;
  }
  // Gravo un archivo json para que lo tome la tabla que lo llamo
  $file = "json/ventas.json";
  file_put_contents($file, $data);
  $respuesta = array("html"=>$file);
  echo json_encode($respuesta);
   
 ?>