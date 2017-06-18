<?php include("../cabecera.php");?>

<script src="../js/ranbootstrap-table-export.js"></script>
<script src="../js/tableExport.min.js"></script>
<script type="text/javascript" src="../js/jsPDF/jspdf.min.js"></script>
<script type="text/javascript" src="../js/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>

<div class="container"> 
	<div class="col-sm-12">

			<!-- Panel Del Titulo y Filtros -->
			<div class="panel panel-info">         
				<div class="panel-heading">
					<h3 class="panel-title">Inscripcion a Rendir</h3>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label for="carrera" class="sr-only">Carrera:</label>
						<select name="carrera" id="idcarrera" class="selectpicker form-control" data-live-search="true">
							<option value="0" title="Carrera" data-subtext="Carrera"></option>
							<?php include_once '../controllers/carreras.php'; ?>								
						</select>
						<label class="control-label">Alumno: Gomez Enzo</label>
						<input type="text" class="form-control hidden" id="idalumno" value="1">
						<label class="control-label">Año Lectivo: 2017</label>
						<input type="text" class="form-control hidden" id="anio" value="2017">
						<label class="control-label">Turno: Nro001</label>
						<input type="text" class="form-control hidden" id="turno" value="Nro001">
					</div>  
					<div class="form-group">
						<button type="button" onClick="consultar()" class="btn btn-primary pull-right">Consultar</button>             
					</div>  
				</div>
			</div> <!-- Fin Panel Info -->

		<!-- Panel De la Tabla -->
		<div class="panel panel-success">
			<table id="mitabla"
			data-toggle="table"
			data-search="true"
			data-show-export="true"
			data-cache = "false"
			data-pagination="true"
			data-page-list=""
			class="table table-hover">
				<thead>
					<tr>
						<th data-halign="center" data-sortable="true">Materia</th>
						<th data-sortable="true">Año</th>
						<th data-halign="center" data-align="center" data-sortable="true">Fecha</th>
						<th data-halign="center" data-align="center" data-sortable="true">Hora</th>
						<th data-halign="center" data-align="center" data-sortable="true">Estado</th>
						<th vdata-align="center" data-events="operateEvents" data-formatter="operateFormatter"><input type="checkbox" class="checkbox" id="marcarTodos"></th>            
					</tr>
				</thead>
			</table>
		</div> <!-- fin Panel Tabla -->
</div> <!-- fin de col -->

<div class="container">
	<br>
	<a class="btn btn-primary btn-lg" data-toggle="modal" id="btnCarComp">Cargar inscripción</a>
	
	<!-- Modal comprobante materias inscriptas -->
	<div class="modal fade" id="modalCompMaterias">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title">Comprobante de inscripcion</h3>
				</div>
				<div class="modal-body">
					
					<div id="alert" class="alert alert-info">
						<h4><b>¿Esta seguro?</b> Se inscribira en las siguientes materias.</h4>
					</div>
						<table id="tabComp" data-toggle="table" data-cache="true" data-page-list="" class="table table-bordered">
							<thead>
								<tr>
									<th data-halign="center" data-sortable="true" data-field=0>Materia</th>
									<th data-sortable="true" data-field=1>Año</th>
									<th data-halign="center" data-align="right" data-sortable="true" data-field=2>Fecha</th>
									<th data-halign="center" data-align="right" data-sortable="true" data-field=3>Hora</th>
								</tr>
							</thead>
						</table>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
					<button type="button" class="btn btn-primary" id="btnConfirmar">Confirmar</button>
				</div>
			</div>
		</div>
	</div>
</div>

</div> <!-- /container -->



<div class="modal fade" id="modalEdit">
	<div class="modal-dialog">
		<div class="modal-header">
			<a class="close" data-dismiss="modal">×</a>
			<h3>Modificacion</h3>
		</div>
		<div class="modal-body">
			<p>Campos a modificar...........</p>
		</div>
		<div class="modal-footer">
			<a href="#" class="btn">Cerrar</a>
			<a href="#" class="btn btn-primary">Salvar Cambios</a>
		</div>
	</div>
</div>

<?php  include("../pie.php");?>



<script src="../js/funciones.js"></script>
</body>
</html>