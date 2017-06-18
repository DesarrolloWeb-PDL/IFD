<!DOCTYPE html>
<html lang="es">
<head>
   <!--  Anula el cahe ver si conviente
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="Sistema Alumnado" content="">
    
    
    <link rel="icon" href="fonts/logo.ico">

    <title>Alumnado</title>

    <!-- Bootstrap core CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <!-- Para la barra del menu -->
    <link href="../css/navbar-fixed-top.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/bootstrap-select.min.css"> 
    <link rel="stylesheet" href="../css/bootstrap-table.min.css"> 
    <link rel="stylesheet" href="../css/formvalidation.min.css"> 
    
    
    <link rel="stylesheet" href="../css/ran.css"> 

    <script src="../js/jquery-1.12.3.min.js"></script>    
    <script src="../js/jquery.blockUI.js"></script>    <!-- Para bloquiear pantalla cuando llamamos a otroa  -->

    <script src="../js/bootstrap-modal.js"></script>

    <script src="../js/bootstrap-select.min.js"></script>
    <script src="../js/bootstrap-table.min.js"></script>
    <script src="../js/bootstrap-table-es-ES.js"></script>  <!-- Para traducir los mensajes al español -->

    <script src="../js/formvalidation.min.js"></script>
    <script src="../js/validation/bootstrap.min.js"></script>
    <script src="../js/language/es_ES.js"></script>  <!-- Para traducir los mensajes al español -->
    <script src="../js/bootstrap-button.js"></script>
    
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../css/ie10-viewport-bug-workaround.css" rel="stylesheet">


    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../js/ie-emulation-modes-warning.js"></script>

  <style type="text/css">
    .modal-header{
        background: #79f568;
       
      }
      .modal-footer{
        
      }
      .btn{
         background: #79f568;
         color: black;
         border-radius: 0;
         border-color: black;
      }
      .panel{
         color: black;
         border-radius: 0;
         border-color: black;
      }
      .panel-info .panel-heading{
         background: #79f568;
         color: black;
      }
  </style>

  </head>

  <body>
    <!-- MENU Principal de la Aplicacion -->
    <!-- Barra Superiro Fija de Navegacion Fixed navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Alumnado</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
           <!--Dejamos sin activa   <li class="active"><a href="#">Home</a></li> -->
           <li><a href="#">Inicio</a></li>
           <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Opciones <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="inscripcion_rendir.php">Inscripcion a Rendir</a></li>
              <li><a href="materias.php">Materias</a></li>
              <li><a href="profesores.php">Profesores</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="planes_estudio.php">Planes de estudio</a></li>
              <li><a href="duracion_materia.php">Duracion Materias</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>    <!-- FIN DEL MENU -->

  <div class="modal fade" id="modalerror">
   <div class="modal-dialog">
    <div class="alert alert-danger">
     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
     <b>Error:</b>
     <div id="lblerror">...completa llamado...</div>
     <div class="modal-footer">
      <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
    </div>
  </div>
</div><!-- /.modal-dialog TIENE QUE IR -->
</div><!-- /.modal -->

<div class="modal fade" id="modalran">
 <div class="modal-dialog">
  <div id="modalRanTipo">
   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
   <div id="modalRanMsg">...completa llamado...</div>
 </div>
</div><!-- /.modal-dialog TIENE QUE IR -->
</div><!-- /.modal -->



<script>
 function msgerror(msg,tiempo) {

  $('#lblerror').html(msg);
  $('#modalerror').modal('show');


        // Si marco el tiempo de cierre automatico
        if(tiempo){
          window.setTimeout(function(){
           $('#modalerror').modal('hide');
         }, tiempo);
        }

        return true;	
      }

    </script>