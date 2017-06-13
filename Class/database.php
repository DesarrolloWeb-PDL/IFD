<?php

    include_once ("../config.php");
    include_once ("../common/funcionesphp.php");


 // class database extends  PDO {
  	class database  {



  	protected $datahost;

  	public $sqlmsg = '';
  	public $sqlduplicado = FALSE;


  	public function __construct ($nombre_de_base) {
  		//Sobreescribo el m�todo constructor de la clase PDO.
  		$this->sqlmsg = "";
  		$this->tipo_de_base = DB_TIPOBASE;
  	    $ruta='';
  		try{

  			switch (DB_TIPOBASE) {
  				case 'sqlsrv':
  					// SQL Server
  					// DSN de PDO_SQLSRV � Conectar a bases de datos de MS SQL Server y de SQL Azure
            // Para la vs PHP7   instalar SQLSRV40.EXE
            //            PHP5.6 instalar SQLSRV32.EXE
  					// Para usar access  En php.ini  extension=php_pdo_odbc.dll
            //   extension=php_pdo.dll
            //   extension=PDO_SQLSRV.dll
            //  extension=php_sqlsrv_7_ts_x86.dll
            //  extension=php_pdo_sqlsrv_7_ts_x86.dll
  					$server = DB_SERVER;
  					$database = DB_DATABASE;
  					$username = DB_USERNAME;
  					$password = DB_PASSWORD;
  					$this->datahost = new PDO( "sqlsrv:server=$server;Database = $database", $username, $password);
            break;

  				case 'mysql':
  					// Mysql
            //displaylog("MySql: " . $server);
  					$server = DB_SERVER;
  					$database = DB_DATABASE;
  					$username = DB_USERNAME;
  					$password = DB_PASSWORD;
  					$this->datahost = new PDO ($this->tipo_de_base.':host='.$server.';dbname='.$database . ";charset=utf8" , $username, $password);
            break;

  				case 'access':
  					// Access:
  					// Para usar access  En php.ini  extension=php_pdo_odbc.dll
  					$ruta = DB_RUTABD;
  					$this->datahost = new PDO ("odbc:Driver={Microsoft Access Driver (*.mdb)};Dbq="  . $ruta   . ";charset=utf8");
            break;

  			}

  			// Permite controlar los errores con try{
  			$this->datahost->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);

  		}catch(PDOException $e){
  			$msglog = 'Ha surgido un error y no se puede conectar a la base de datos. getMessage(): ' . $e->getMessage(). "\r\n"  ;
  			$msglog = $msglog . '   Detalle getTraceAsString: ' . $e->getTraceAsString(). "\r\n" ;
  			$msglog = $msglog . '   Detalle getFile(): ' . $e->getFile() . "\r\n"  ;
  			$msglog = $msglog . '   Detalle getLine(): ' . $e->getLine() . "\r\n"  ;
  			$msglog = $msglog . '   Detalle errorInfo: ' . $e->errorInfo  . "\r\n" ;
  			$msglog = $msglog . '   Ruta: ' . $ruta   ;
  			displaylog($msglog);

  			$this->sqlmsg = "Error: Al conectar base - " .  $e->getMessage() ;

  			/* Aqui no anda esto
  				echo "Error C�digo de error SQLSTATE: " . $this->errorInfo()[0] . "<br>";
  				echo "Error C�digo de error espec�fico del driver.: " . $this->errorInfo()[1] . "<br>";
  				echo "Error Mensaje del error espec�fico del driver.: " . $this->errorInfo()[2] . "<br>";
  				*/

  		}

  	}

	public function commit(){
		return $this->datahost->commit();
	}

	public function beginTransaction(){
		return $this->datahost->beginTransaction();
	}

	public function rollBack(){
		return $this->datahost->rollBack();
	}

	public function lastInsertId(){
		// access no soporta ->lastInsertId()
		if ($this->tipo_de_base == 'access' or $this->tipo_de_base == 'sqlsrv') {
			return 0; // 'access y sql srv no soportan ->lastInsertId()';
		} else {
			return $this->datahost->lastInsertId();
		}
	}

	public function query($sqlselect) {

		// Ejecuta la consulta y retorna $row  , selecionado el 1ro
		$this->sqlmsg = '';

		$execonsulta=$this->ejecutar($sqlselect);
		if ($this->sqlmsg == '') {
			$row=$execonsulta->fetch();
			if ( !$row ) {
				displaylog("sin registro");
			}
			return  $row;
		}else{
			return "";
		}
	}

	public function queryfaltahacer($consulta) {
		// no se si es conveniente y para que
		$resultado = $this->datahost->query($consulta);
        if (!$resultado) {
		//if ($resultado->errorCode() <> 0) {
		//	$this->sqlmsg = 'Error: En query SQL - ' .  $resultado->errorInfo()[2] ;
			$this->sqlmsg = 'Error: En query SQL - '  ;
		}else{
			$this->sqlmsg = '';
			return $resultado;
		}
	}

	public function json($sqlselect) {

		// Ejecuta la consulta y retorna un String tipo json

		$execonsulta=$this->ejecutar($sqlselect);
		if ($this->sqlmsg == '') {
			$row=$execonsulta->fetchAll();
			return  $this->safe_json_encode($row);
		}else{
			return "";
		}

		// Funciones que no anduvieron
		//$data = json_encode(utf8_encode($row), JSON_PRETTY_PRINT);  // Cuidado no toma si tiene �
		//  $data = json_encode($row, JSON_PRETTY_PRINT);  // Cuidado no toma si tiene �

		//$input = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($row));
		// $input = mb_convert_encoding($row, "UTF-8", "auto");
		// $data = json_decode($row); // Cuidado no toma si tiene �

	}


	public function jsonSP($sql) {

    
	   $this->sqlmsg = '';
	   $this->sqlduplicado = FALSE; // por defecto

/*     Otras formas de llamar a Procedimentos Almacenados(SP)
       --------------------------------- 
        SQL Server:

 	  	$resultado = $this->datahost->prepare("{call Materias_Alumno(?,?)}");
		$params = array($par1,$par2);  
		$resultado->execute($params);

		My SQL:

 	  	$resultado = $this->datahost->prepare('CALL prusel(?)');
   		$resultado->bindParam(1, $par1, PDO::PARAM_INT);
   		$resultado->execute();

*/
	   try{
			displaylog($sql); // Temporal para debug este mensage
  			switch (DB_TIPOBASE) {
  				case 'sqlsrv':
  					// SQL Server
						//Ej $resultado = $this->datahost->prepare("{call Materias_Alumno(3,5)}");
 	  	 				$resultado = $this->datahost->prepare("{call $sql}");
		            break;

  				case 'mysql':
  					// Mysql
  						// Ej  $resultado = $this->datahost->prepare('CALL prusel(3)');
  						$resultado = $this->datahost->prepare("CALL $sql");
		            break;

  				case 'access':
  					// Access:
		            break;

  			}

  		
			$resultado->execute();

			$row=$resultado->fetchAll();
			return  $this->safe_json_encode($row);


	   }catch(PDOException $e){

		  if ( $e->getCode() == 23000) {
			$msglog = "Registro Duplicado en Instruccion SQL: " . $sql ;
			displaylog($msglog);
			$this->sqlduplicado = TRUE;
			$this->sqlmsg = 'Registro Duplicado '  ;
		  }else{
	   		$msglog = 'Ha surgido un error al ejecutar SP en base de datos. getMessage(): ' . $e->getMessage(). "\r\n"  ;
			$msglog = $msglog . '   Detalle getTraceAsString: ' . $e->getTraceAsString(). "\r\n" ;
			$msglog = $msglog . '   Detalle getFile(): ' . $e->getFile() . "\r\n"  ;
			$msglog = $msglog . '   Detalle getLine(): ' . $e->getLine() . "\r\n"  ;
			$msglog = $msglog . '   Detalle getCode(): ' . $e->getCode() . "\r\n"  ;
			$msglog = $msglog . '   Scrip: ' . $sql . "\r\n"  ;
			displaylog($msglog);
			$this->sqlmsg = "ErrorTry:  Al ejecutar SQL - " .  $e->getMessage() ;
		  }
	   } // end try

	}

	public function ejecutar($sql) {

	   $this->sqlmsg = '';
	   $this->sqlduplicado = FALSE; // por defecto

	   try{
		$resultado = $this->datahost->prepare($sql);
		displaylog($sql); // Temporal para debug este mensage
		$resultado->execute();
		return  $resultado;

	   }catch(PDOException $e){

		  if ( $e->getCode() == 23000) {
			$msglog = "Registro Duplicado en Instruccion SQL: " . $sql ;
			displaylog($msglog);
			$this->sqlduplicado = TRUE;
			$this->sqlmsg = 'Registro Duplicado '  ;
		  }else{
	   		$msglog = 'Ha surgido un error al ejecutar SQL en base de datos. getMessage(): ' . $e->getMessage(). "\r\n"  ;
			$msglog = $msglog . '   Detalle getTraceAsString: ' . $e->getTraceAsString(). "\r\n" ;
			$msglog = $msglog . '   Detalle getFile(): ' . $e->getFile() . "\r\n"  ;
			$msglog = $msglog . '   Detalle getLine(): ' . $e->getLine() . "\r\n"  ;
			$msglog = $msglog . '   Detalle getCode(): ' . $e->getCode() . "\r\n"  ;
			$msglog = $msglog . '   Scrip: ' . $sql . "\r\n"  ;
			displaylog($msglog);
			$this->sqlmsg = "ErrorTry:  Al ejecutar SQL - " .  $e->getMessage() ;
		  }
	   } // end try

	}


	//  FUNCIONES INTERNAS
	//  ==================

	private function safe_json_encode($value){
		
		//  Cuidado con campos que tengan ñ  usar: [AÑO] as anio
 		if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
			$encoded = json_encode($value, JSON_PRETTY_PRINT);
		} else {
			$encoded = json_encode($value);
		}
		switch (json_last_error()) {
			case JSON_ERROR_NONE:
				return $encoded;
			case JSON_ERROR_DEPTH:
				return 'Maximum stack depth exceeded'; // or trigger_error() or throw new Exception()
			case JSON_ERROR_STATE_MISMATCH:
				return 'Underflow or the modes mismatch'; // or trigger_error() or throw new Exception()
			case JSON_ERROR_CTRL_CHAR:
				return 'Unexpected control character found';
			case JSON_ERROR_SYNTAX:
				return 'Syntax error, malformed JSON'; // or trigger_error() or throw new Exception()
			case JSON_ERROR_UTF8:
				$clean = $this->utf8ize($value);
				return $this->safe_json_encode($clean);
			default:
				return 'Unknown error'; // or trigger_error() or throw new Exception()

		}
	}

	private function utf8ize($mixed) {
		if (is_array($mixed)) {
			foreach ($mixed as $key => $value) {
				$mixed[$key] = $this->utf8ize($value);
			}
		} else if (is_string ($mixed)) {
			return utf8_encode($mixed);
		}
		return $mixed;
	}


} // Fin de la Clase
?>
