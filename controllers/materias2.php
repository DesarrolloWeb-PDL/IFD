<?php  include_once 'conexion.php';

$carrera = $_POST['carrera'];

$queryMaterias = $conn->query('SELECT materia.id AS matID, materia.NOMBRE AS matNOMBRE, carreras.NOMBRE AS carNOMBRE FROM materia INNER JOIN carreras ON (materia.idCARRERA = carreras.id) WHERE materia.idCARRERA = '. $carrera);

$html = '<option>Todas</option>';

while ($materias = $queryMaterias->fetch_object()) {
	$html .= '<option value="'. $materias->matID .'" data-tokens="'. $materias->matNOMBRE .'" data-subtext="'. $materias->carNOMBRE .'">'. $materias->matNOMBRE .'</option>';
}

$respuesta = array('html' => $html);
echo json_encode($respuesta);
?>