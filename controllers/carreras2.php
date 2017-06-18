<?php  include_once 'conexion.php';



$materia = $_POST['materia'];

$queryMaterias = $conn->query('SELECT carreras.id AS carID, carreras.NOMBRE AS carNOMBRE FROM carreras INNER JOIN materias ON (materia.idCARRERA = carreras.id) WHERE materias.id = '. $materia);

$html = '<option>Todas</option>';

while ($carreras = $queryMaterias->fetch_object()) {
	$html .= '<option value="'. $carreras->carID .'" data-tokens="'. $carreras->carNOMBRE .'">'. $carreras->carNOMBRE .'</option>';
}

$respuesta = array('html' => $html);
echo json_encode($respuesta);
?>