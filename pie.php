    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Tienen que ir Aqui al final, Placed at the end of the document so the pages load faster  -->
 
    <script src="../js/bootstrap.min.js"></script>
    <!-- <link rel="stylesheet" href="stilos.css"> -->

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../js/ie10-viewport-bug-workaround.js"></script>

    <script>

   	 function muestroMsg(msg,tiempo,cuadroChico) {
		 
	     $('#modalRanMsg').html(msg);
	   	 $('#modalRanTipo').addClass('alert alert-success');
	   	 if(cuadroChico){
	   	 	$('#modalRanTipo').addClass('modal-sm');
	   	 }
	     $('#modalran').modal('show');
	   	
        // Si marco el tiempo de cierre automatico
	   	 if(tiempo){
	         window.setTimeout(function(){
	        	 $('#modalran').modal('hide');
	         }, tiempo);
	     }
	 	   	 
		 return true;	
	 }

   	 </script>