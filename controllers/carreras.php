<?php 
include 'conexion.php';

$queryCarreras = $conn->ejecutar('SELECT id, NOMBRE FROM carreras');

while ($carreras = $queryCarreras->fetchObject()):	?>
	<option value="<?= $carreras->id ?>" data-tokens="<?= $carreras->NOMBRE ?>"><?= $carreras->NOMBRE ?></option>
<?php endwhile; ?>
