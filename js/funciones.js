// Declaro todas las variables que utilice.
var $materias,
	$filas,
	$alumno,
	$carrera,
	$anio,
	$turno;
$(function() {

	// Checkbox que marca o desmarca todos.
	$('#marcarTodos').on('change', function() {
		
		if ($(this).prop('checked') == true) {
			$('.checkbox').prop('checked', true);
		} else {
			$('.checkbox').prop('checked', false);
		}

	}); // Fin de marca desmarca todos.

	// Cuando se haga Click en boton de Incribirse.
	$('#btnCarComp').on('click', function(event) {
		event.preventDefault();
		$filas = new Array(),
		$materias = new Object();

		// Detecto cada checkbox que este marcado.
		$('tbody input[type=checkbox]:checked').each(function() {
			
			// Variables que utilizo para crear un Array de Objetos.
			var checkbox = $(this),
				fila = new Object(),
				i = 0;

			// Creamos los Objetos.
			checkbox.closest('td').siblings().prev().each(function() {
				// .each() ------> Por cada celda de la fila (td).
				// .prev() ------> Devuelve la la etiqueta hermana anterior en el DOM (Para Excluir la condicion).
				// .siblings() --> Devuelve las etiquetas hermanas.
				// .colsest() ---> Devuelve la etiqueta padre (td del cehckbox marcado).
				
				var celda = $(this).text();
				fila[i] = celda;
				i++;				
			
			}); // Fin de Creacion de Objetos. 

			// Cargamos los Objetos en un Array.
			$filas.push(fila);

			// Cargamos un Objeto con el valor y la condicion que muestra la tabla.
			$materias[$(this).val()] = $(this).closest('td').prev().text();

		}); // Fin de Checkbox

		// Comprobamos si selecionaron.
		if ($materias.length != 0) {

			// Cargamos la tabla del modal oculto con el Array de Objetos que creamos.
			$('#tabComp').bootstrapTable('load', {data: $filas} );

			// Mostramos un  modal de comprobacion con las materias seleccionadas.
			$('#modalCompMaterias').modal('show');

		} else {
			// Exigir que eliga almenos un materia.
			msgerror('Error: Debe completar los campos!');
		
		} // Fin de Comprobacion.

	}); // Fin de Click Boton Inscribirse.

	// Cuando se confirme la inscripcion.
	$('#btnConfirmar').on('click', function(event) {
		event.preventDefault();
		
		// Estructura para enviar o imprimir el comprobante.
		if ($(this).text() == 'Confirmar') {
			
			// Asiganamos el valor a las variables a enviar.
			$alumno = $('#idalumno').val();
			$carrera = $('#idcarrera').val();
			$anio = $('#anio').val();
			$turno = $('#turno').val();
			
			$.ajax({
				url: '../controllers/insRendir2.php',
				type: 'post',
				dataType: 'json',
				data: {
					idAlumno: $alumno,
					idMaterias: $materias,
					turno: $turno,
					anio: $anio
				},
			})
			.done(function(respuesta) {
				// console.log("success");

				// Cambiamos es estilo del alert y el texto del boton para que no se envie de nuevo por error.
				$('#alert').removeClass('alert-info')
				.addClass('alert-success')
				.html('<h4><b>CORRECTO</b></h4><h6>Fecha: ' + respuesta.html + '</h6>');
				$('#btnConfirmar').text('Impirimir');
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});

		} else {
			// Falta plugin Aqui XDDD.
			alert('IMPRIMIENDO DICE QUE!!');
		}

	}); // Fin de Confirmacion de Inscripcion.
	
	// Se pone para que en todos los llamados ajax se bloquee la pantalla mostrando el mensaje Procesando...
	$.blockUI.defaults.message = '<h3>Procesando...</h3>';
	$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

});


/* -------------------------------------------- Codigo del Profesor -------------------------------------------- */
var $table = $('#mitabla');

function consultar()  {
	// LLama a 2da pagina con la logica de la busqueda
	// ------------------------------------------------      
	// Tomo los datos de entrada
	$carrera = $("#idcarrera").val();
	$alumno = $("#idalumno").val();
	$anio = $("#anio").val();
	$turno = $('#turno').val();

	$nombreSP = "Materias_Alumno("+ $carrera + ", " + $alumno +", " + $anio + ", '"+ $turno +"')";

	$.ajax({
		dataType: "json",
		data: { nombreSP: $nombreSP},
		url:   '../controllers/inscripcion_rendir2.php',
		type:  'post',
		beforeSend: function(){
			//Lo que se hace antes de enviar el formulario
		},
		success: function(respuesta){
			//lo que se si el destino devuelve algo
			// console.log(respuesta.html);
			$nomfile = "../controllers/" + respuesta.html;
			$table.bootstrapTable('refresh', { url: $nomfile ,silent: true} );

		},
		error:	function(xhr,err){ 
			// console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status+"\n \n responseText: "+xhr.responseText);
			// readyState values are 1:loading, 2:loaded, 3:interactive, 4:complete.
			// status is the HTTP status number, i.e. 404: not found, 500: server error, 200: ok. 
			$nomfile = "../controllers/json/error.json"; // Para que vacie la tabla
			msgerror( xhr.responseText);
			$table.bootstrapTable('refresh', { url: $nomfile ,silent: true} );
			} // Fin si hay error
		});
} // Fin consultar()


//  alert('Valor: ' + JSON.stringify(row.Cli_Id));

window.operateEvents = {
	'click .editar': function (e, value, row) {
		//'location.href = "#myModal.modal('toggle')" // "ABM_Clientes.php?id=" +  row.Cli_Id + "&accion=M";	
		// $('#modalEdit').modal('show')  ;
	},
	'click .remove': function (e, value, row) {
		// alert('row: ' + JSON.stringify(row[0]));
		// $('#modalerror').modal('show');
	}	
};

function operateFormatter(id, row, index) {
	return [
	/*'<div class="pull-left">',
	'</div>',*/
	// '<div class="pull-right">',
	'<input type="checkbox" class="checkbox" value="'+id+'">' // CheckBox's de la ultima columna.
	/*'<input type="text" class="hidden" id="condicion" value="'+ row[3] +'">',       name="'+ row[3] +'" */
	// '</div>'
	].join('');
}
