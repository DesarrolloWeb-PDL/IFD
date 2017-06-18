<?php include_once 'conexion.php';
	
	$carrera = $_POST['carrera'];
	$materia = $_POST['materia'];

	// Script de consulta
	$where = " where 1 = 1";
	
	if ($carrera != "") {
		$where .= " AND materia.idCARRERA = ". $carrera;
	} else if ($materia != "") {
		$where .= " AND materia.id = ". $materia;
	}

	$where .= " ORDER BY materia.NOMBRE ASC";

	// CONCAT() para concatenar los datos de las columnas apellido y nombres en una sola.
	$consulta = "SELECT
					materia.NOMBRE AS matNOMBRE,
					materia.AÑO AS matAÑO,
					duracion.Descripcion AS DUR,
					CONCAT(CONCAT(profesores.apellido, ' '), profesores.nombres) AS PROFESORES,
					materia.Trabajo_Final AS matTarbFin
				FROM materia 
					INNER JOIN duracion on (materia.idduracionmat = duracion.id) 
				INNER JOIN profesores on (materia.idPROFESOR = profesores.id)". $where;

	$data = $conn->json($consulta); // Trae los resultados de la conuslta en formato JSON
	
	$file = "json/JSON.json"; // Ruta donde se escribiran los resultado
  	file_put_contents($file, $data); // Escribimos en la ruta, los resultados

  	// Devolvemos como respuesta la ruta.
  	$respuesta = array("html"=>$file);
  	echo json_encode($respuesta);

?>