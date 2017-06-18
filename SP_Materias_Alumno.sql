CREATE DEFINER=`root`@`localhost` PROCEDURE `Materias_Alumno`(
	IN `p_id_carrera` INT,
	IN `p_id_alumno` INT,
	IN `p_anio_lectivo` INT,
	IN `p_turno` VARCHAR(10)
)

LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''

BEGIN
	select 
		materia.NOMBRE,
		materia.`AÑO` as anio,
		fecha_rendir.Fecha_Rendir,
		fecha_rendir.hora,
			(select case when  Exists(Select materiasregulares.idmateria from materiasregulares where materiasregulares.idalumno = p_id_alumno and materiasregulares.idmateria = materia.id) then 
				'Regular' else 'Libre' end) as estado,
		materia.id
	from  materia LEFT JOIN fecha_rendir ON materia.id = fecha_rendir.idmateria
	where materia.idcarrera = p_id_carrera And fecha_rendir.turno = p_turno
		-- 1) Filtro las materias que ya esta Inscripto
		And Not Exists (Select inscripcioncursado.idmateria from inscripcioncursado where inscripcioncursado.idalumno = p_id_alumno and inscripcioncursado.idmateria = materia.id and inscripcioncursado.año_lectivo = p_anio_lectivo)
		-- 2) Filtro las materias que ya aprobo
		And Not Exists (Select materiaaprobada.idmateria from materiaaprobada where materiaaprobada.idalumno = p_id_alumno and materiaaprobada.idmateria = materia.id)
		-- 3) Filtro las materias que ya esta inscripto en este turno
		And Not Exists (Select inscripcionrendir.idmateria from inscripcionrendir where inscripcionrendir.idalumno = p_id_alumno and inscripcionrendir.idmateria = materia.id and inscripcionrendir.turno = p_turno)
		
		
	order by AÑO;
END