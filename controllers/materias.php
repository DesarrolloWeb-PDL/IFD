<?php include 'conexion.php';

$queryMaterias = $conn->query('SELECT materia.id AS matID, materia.NOMBRE AS matNOMBRE, carreras.NOMBRE AS carNOMBRE FROM materia INNER JOIN carreras ON (materia.idCARRERA = carreras.id)');

while ($materias = $queryMaterias->fetch_object()):	?>
	<option value="<?= $materias->matID ?>" data-tokens="<?= $materias->matNOMBRE ?>" data-subtext="<?= $materias->carNOMBRE ?>"><?= $materias->matNOMBRE ?></option>
<?php endwhile; ?>