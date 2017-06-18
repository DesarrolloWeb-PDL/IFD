<?php 
require_once 'conexion.php';

// Seteamos la zona horaria y tomamos la fecha.
date_default_timezone_set("America/Argentina/Buenos_Aires");
$fecha = date('Y-m-d');

// Variables que utilizamos.
$idAlumno = $_POST['idAlumno'];
$materias = $_POST['idMaterias'];
$turno = $_POST['turno'];
$anioLectivo = $_POST['anio'];
$indice = "";


try {
	// Iniciamos una transaccion por si ocurre un error.
	$conn->beginTransaction();

	// Preparamos la Sentencia.
	$prepare = $conn->prepare("
		INSERT INTO inscripcionrendir (
			inscripcionrendir.idalumno, 
			inscripcionrendir.idmateria, 
			inscripcionrendir.turno, 
			inscripcionrendir.`año_lectivo`, 
			inscripcionrendir.condicion)
		VALUES ({$idAlumno}, :idmateria, '{$turno}', {$anioLectivo}, :condicion)");

	// Bucle para cargar mas de una materia.
	foreach ($materias as $idMateria => $condicion) {

		// Asignar la materia y la condicion a los parametros de la sentencia preprada.
		$prepare->bindParam(':idmateria', $idMateria);
		$prepare->bindParam(':condicion', $condicion);

		// Ejecutamos la sentencia.
		$consultaOk = $prepare->execute();

		// Acumular los IDs de las mateias para la conuslta.
		$indice .= $idMateria . ', ';

	}

	// Borramos las ultima coma.
	$indice = trim($indice, ", ");

	// Ejecutamos la Sentencia de consulta de inscripcion.
	$inscriptoQuery = $conn->ejecutar("
		SELECT DISTINCT 
			inscripcionrendir.fechainsc as fecha from 
			inscripcionrendir inner join materia on (inscripcionrendir.idmateria = materia.id)
		left join fecha_rendir on (fecha_rendir.idmateria = materia.id)
		where 
			inscripcionrendir.idalumno = {$idAlumno}
		and inscripcionrendir.idmateria in ({$indice})
		and inscripcionrendir.turno = '{$turno}'
		and inscripcionrendir.fechainsc like '{$fecha}%'");

	// Recupera el resultado como un Objeto.
	$inscripto = $inscriptoQuery->fetchObject();
	
	// Guardar Cambios en la BD. (DESCOMENTAR PARA QUE FUNCIONE)
	// $conn->commit();
} catch (Exception $e) {

	// En caso de error revierte los cambios en la BD y guarda el mensaje de error.
	$conn->rollBack();
	displaylog('Error: '. $e->getMessage());

}

// Devolvemos el resultado de la consulta como un JSON.
$html = $inscripto->fecha;
$respuesta = array("html" => $html);
echo json_encode($respuesta);

?>