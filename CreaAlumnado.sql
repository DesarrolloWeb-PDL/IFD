# ====================================================================
#  Creacion en MySQL Tabla: alumno
# -----------------------------------
CREATE TABLE `profesores` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`apellido` VARCHAR(20) NULL DEFAULT NULL,
	`nombres` VARCHAR(30) NULL DEFAULT NULL,
	`DNI` VARCHAR(10) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);
create table `alumno` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `Apellido` varchar(30)
   , `Nombre` varchar(35)
   , `idtipodoc` Int(11)
   , `numerodni` varchar(10)
   , `idtipocedula` Int(11)
   , `numerocedula` varchar(10)
   , `fnacimiento` varchar(10)
   , `lugarnacimiento` varchar(50)
   , `idpais` Int(11)
   , `idprovincia` Int(11)
   , `edad` varchar(5)
   , `idsexo` Int(11)
   , `idestadocivil` Int(11)
   , `domicilio` varchar(120)
   , `telefono` varchar(25)
   , `titulosecundario` varchar(120)
   , `establecimiento` varchar(120)
   , `foto` varchar(90)
   , `codigo_alumno` varchar(10)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: Carrera_Alumno
# -----------------------------------

create table `Carrera_Alumno` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `idalumno` Int(11)
   , `idcarrera` Int(11)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: carreras
# -----------------------------------

create table `carreras` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `NOMBRE` varchar(80)
   , `DECRETO` varchar(30)
   , `idDIRECTOR` Int(11)
   , `clave_carrera` varchar(3)
   , `pertenece` varchar(15)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: inscripcioncursado
# -----------------------------------

create table `inscripcioncursado` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `idmateria` Int(11)
   , `idalumno` Int(11)
   , `idtiporegimen` Int(11)
   , `fechainscripcion` varchar(10)
   , `año_lectivo` int
   , `division` varchar(2)
   , `condicional` varchar(2)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: inscripcionrendir
# -----------------------------------

create table `inscripcionrendir` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `idalumno` Int(11)
   , `idmateria` Int(11)
   , `idtiporegimen` Int(11)
   , `fechainsc` Datetime
   , `turno` varchar(10)
   , `año_lectivo` int
   , `condicion` varchar(50)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: materia
# -----------------------------------

create table `materia` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `NOMBRE` varchar(80)
   , `idCARRERA` Int(11)
   , `AÑO` varchar(10)
   , `idPLANESTUDIO` Int(11)
   , `idduracionmat` Int(11)
   , `idPROFESOR` Int(11)
   , `opcional` varchar(3)
   , `Trabajo_Final` varchar(3)
   , `Programa` Text
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: MateriaAprobada
# -----------------------------------

create table `MateriaAprobada` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `idmateria` Int(11)
   , `idalumno` Int(11)
   , `tipoAprobacion` varchar(15)
   , `Nacta` varchar(15)
   , `fechaAprob` varchar(10)
   , `Nota` varchar(10)
   , `Nota_Letra` varchar(25)
  ,PRIMARY KEY (`id`)
);
# ====================================================================
#  Creacion en MySQL Tabla: MateriasRegulares
# -----------------------------------

create table `MateriasRegulares` (
     `id` int(11) NOT NULL AUTO_INCREMENT
   , `idmateria` Int(11)
   , `idalumno` Int(11)
   , `fecha` varchar(15)
   , `nota` varchar(10)
   , `vencimiento` varchar(12)
  ,PRIMARY KEY (`id`)
);

