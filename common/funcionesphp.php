<?phpfunction displaylog($msg){	 	//Definimos la hora de la accion	$hora=str_pad(date("H:i:s"),10," "); //hhmmss;	//Definimos el contenido de cada registro de accion por usuario.	//$usuario=strtoupper(str_pad($usuario,15," "));	$cadena=$hora. " " . $msg . "\r\n";	 	//Creamos dinamicamente el nombre del archivo por dia	$pre= ARCHIVO_LOG; // $_SERVER['DOCUMENT_ROOT']. "/alumnado/logs/log";	$date=date("ymd"); //aammddhhmmss	$fileName=$pre.$date.".TXT";	//echo "$fileName";	file_put_contents($fileName,$cadena, FILE_APPEND);	//$f = fopen("logs/$fileName.TXT","a");	//fputs($f,$cadena."\r\n"); // or die("no se pudo crear o insertar el fichero");	//fclose($f);}//end funcion displaylogfunction limpiacaracteres ($texto) {	// le saca los caracteres malos (escapar caracteres depende de la Bd)	// no soportado en PHP7  $this->$var = Mysql_real_escape_string ($valor);	// No se puede usar con odbc   $this->$var = $conexion->quote($valor);	return  str_replace("'","''",$texto); // Para access	}function numdec ($num,$cantdec =0) {		// La Cantidad de decimales en opcional		if ($cantdec > 0) {	    return number_format($num, $cantdec, ".", "");	}else{		return number_format($num, 0, "", "");			}}
function implota($fecha) // bd2local
{
	if (($fecha == "") || ($fecha == "0000-00-00"))
		return "";
	$vector_fecha = explode("-",$fecha);
	$aux = $vector_fecha[2];
	$vector_fecha[2] = $vector_fecha[0];
	$vector_fecha[0] = $aux;
	return implode("/",$vector_fecha);
}

function explota($fecha) // local2bd
{
	$vector_fecha = explode("/",$fecha);
	$aux = $vector_fecha[2];
	$vector_fecha[2] = $vector_fecha[0];
	$vector_fecha[0] = $aux;
	return implode("-",$vector_fecha);
};
?>
