<?php
include_once "../Controllers/verifySession.php";
include_once "dashboard/headDashBoard.php";
?>

<!--
`body` tag options:

  Apply one or more of the following classes to to the body tag
  to get the desired effect

  * sidebar-collapse
  * sidebar-mini
-->

<?php
include_once "dashboard/startTemplateDashboard.php";

?>

<!-- Main content -->
<div class="content">
    <div class="col-md-12">
        <div class="card card-success">
            <div class="card-header">
                <h1 class="card-title"><strong>Cat&aacute;logo de Clientes.</strong></h1>
                <div class="card-tools float-right m-2">
                    <button id="agregar-cliente" type="button" class="btn btn-primary"><i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Cliente</button>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-3 fondo-tabs">
                <table id="tablaClientes" class="table table-hover text-wrap">
                </table>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.container-fluid -->
    <div id="panel" class="panel" style="display: none;">
        <div class="panel-header">
            Detalles del Cliente
            <button id="cerrarPanel" class="btn-close" aria-label="Cerrar"></button>
        </div>
        <div class="panel-body">
            <!-- Aquí puedes agregar los detalles del cliente -->
            <p>Detalles del cliente aquí...</p>
        </div>
    </div>
</div>
<!-- /.content -->
<!-- Modal Agregar -->
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content bg-modalVoucher">
            <div class="modal-header">
                <h4 class="modal-title" id="modalAgregarLabel"><strong>Agregar Nuevo Cliente</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="height: 550px; overflow-y: scroll;">
                <div class="row" style="color:black;">
                    <div class="col-12 col-sm-12">
                        <div class="card card-success card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Datos Personales</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Solicitud de Cr&eacute;dito</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-direccion" data-toggle="pill" href="#direccion" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Direcci&oacute;n</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Documentaci&oacute;n</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card card-success">
                                                    <div class="card-header">
                                                        <h3 class="card-title">Datos Personales<small>del cliente.</small></h3>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clinombre">Nombre:</label>
                                                                    <input type="text" class="form-control" name="clinombre" id="clinombre" aria-describedby="hclinombre" placeholder="">
                                                                    <small id="hclinombre" class="form-text">Capture el nombre del cliente</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliapaterno">Apellido Paterno:</label>
                                                                    <input type="text" class="form-control" name="cliapaterno" id="cliapaterno" aria-describedby="hcliapaterno" placeholder="">
                                                                    <small id="hcliapaterno" class="form-text">Capture el apellido paterno del cliente</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliamaterno">Apellido Materno:</label>
                                                                    <input type="text" class="form-control" name="cliamaterno" id="cliamaterno" aria-describedby="hcliamaterno" placeholder="">
                                                                    <small id="hcliamaterno" class="form-text">Capture el Apellido Materno del cliente</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliEdad">Edad:</label>
                                                                    <input type="number" step="1" min="18" value="18" class="form-control" name="cliEdad" id="cliEdad" aria-describedby="hcliEdad" placeholder="">
                                                                    <small id="hcliEdad" class="form-text">Cliente debe ser mayor de edad.</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="typeClient">Tipo de cliente</label>
                                                                    <select class="form-control" name="typeClient" id="typeClient">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clienteStatus">Estatus del Cliente</label>
                                                                    <select class="form-control" name="clienteStatus" id="clienteStatus">
                                                                        <option value="">SELECCIONE UN ESTATUS</option>
                                                                        <option value="A">ACTIVO</option>
                                                                        <option value="I">INACTIVO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clientDate">Fecha de Nacimiento:</label>
                                                                    <input type="date" class="form-control" name="clientDate" id="clientDate" aria-describedby="hclientDate" placeholder="">
                                                                    <small id="hclientDate" class="form-text">dd/mm/aaaa</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clientDateRegister">Fecha de Registro:</label>
                                                                    <input type="date" class="form-control" name="clientDateRegister" id="clientDateRegister" aria-describedby="hclientDateRegister" placeholder="">
                                                                    <small id="hclientDateRegister" class="form-text">dd/mm/aaaa</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="ctelefono">Tel&eacute;fono:</label>
                                                                    <input type="number" class="form-control" name="ctelefono" id="ctelefono" aria-describedby="hctelefono">
                                                                    <small id="hctelefono" class="form-text">N&aacute;mero fijo d de celular</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- /.card-body -->
                                                    <div class="card-footer">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card card-success">
                                                    <div class="card-header">
                                                        <h3 class="card-title">Datos Solicitud de Cr&eacute;dito <small>debe de llenar cada uno de los campos en el formulario.</small></h3>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="imontoprestamo">Monto del Pr&eacute;stamo Solicitado:</label>
                                                                    <input type="text" name="imontoprestamo" id="imontoprestamo" class="form-control" placeholder="" aria-describedby="helpId">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numpagos">Número de Pagos Calculado</label>
                                                                    <input type="text" name="numpagos" id="numpagos" class="form-control" placeholder="" aria-describedby="helpId">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="periodicidad">Periodicidad o Frecuecia de Pago</label>
                                                                    <select class="form-control" name="periodicidad" id="periodicidad">
                                                                        <option value="7">SEMANAL</option>
                                                                        <option value="15">QUINCENAL</option>
                                                                        <option value="30">MENSUAL</option>
                                                                        <option value="60">BIMESTRAL</option>
                                                                        <option value="90">TRIMESTRAL</option>
                                                                        <option value="120">CUATRIMESTRAL</option>
                                                                        <option value="180">SEMESTRAL</option>
                                                                        <option value="360">ANUAL</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="interesfijo">Interes Fijo</label>
                                                                    <input type="text" name="interesfijo" id="interesfijo" class="form-control" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="dtfechaestliquidacion">Fecha estimada de liquidaci&oacute;n:</label>
                                                                    <input type="date" name="dtfechaestliquidacion" id="dtfechaestliquidacion" class="form-control" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- /.card-body -->
                                                    <div class="card-footer">

                                                    </div>
                                                </div>
                                                <!-- /.card -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="direccion" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                        <div class="card card-success">
                                            <div class="card-header">
                                                <h3 class="card-title">Datos de la Dirección y Geolocalizazción</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="ccalle">Calle</label>
                                                                    <input type="text" class="form-control" name="ccalle" id="ccalle">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numexterior">Número Exterior</label>
                                                                    <input type="text" class="form-control" name="numexterior" id="numexterior">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numinterior">Número Interior</label>
                                                                    <input type="text" class="form-control" name="numinterior" id="numinterior">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="pricalle">Primer entre calle</label>
                                                                    <input type="text" class="form-control" name="pricalle" id="pricalle">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="segcalle">Segunda entre calle</label>
                                                                    <input type="text" class="form-control" name="segcalle" id="segcalle">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="cp">Código Postal (CP)</label>
                                                                    <input type="text" class="form-control" name="cp" id="cp">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="entidaddir">Entidad:</label>
                                                                    <input type="text" class="form-control" name="entidaddir" id="entidaddir">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="municipiodir">Alcaldía o Municipio</label>
                                                                    <input type="text" class="form-control" name="municipiodir" id="municipiodir">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="coloniadir">Asentamiento o Colonia</label>
                                                                    <input type="text" class="form-control" name="coloniadir" id="coloniadir">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <div id="map" style="width:100%;height:450px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                            <div class="card-footer">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                        <div class="card card-success">
                                            <div class="card-header">
                                                <h3 class="card-title">Dropzone.js <small><em>jQuery File Upload</em> like look</small></h3>
                                            </div>
                                            <div class="card-body">
                                                <div id="actions" class="row">
                                                    <div class="col-lg-6">
                                                        <div class="btn-group w-100">
                                                            <span class="btn btn-success col fileinput-button">
                                                                <i class="fas fa-plus"></i>
                                                                <span>Agregar Archivos</span>
                                                            </span>
                                                            <button type="submit" class="btn btn-primary col start">
                                                                <i class="fas fa-upload"></i>
                                                                <span>Cargar Archivos</span>
                                                            </button>
                                                            <button type="reset" class="btn btn-warning col cancel">
                                                                <i class="fas fa-times-circle"></i>
                                                                <span>Cancelar Archivos</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 d-flex align-items-center">
                                                        <div class="fileupload-process w-100">
                                                            <div id="total-progress" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                                                <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="table table-striped files" id="previews">
                                                    <div id="template" class="row mt-2">
                                                        <div class="col-auto">
                                                            <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                                                        </div>
                                                        <div class="col d-flex align-items-center">
                                                            <p class="mb-0">
                                                                <span class="lead" data-dz-name></span>
                                                                (<span data-dz-size></span>)
                                                            </p>
                                                            <strong class="error text-danger" data-dz-errormessage></strong>
                                                        </div>
                                                        <div class="col-4 d-flex align-items-center">
                                                            <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                                                <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto d-flex align-items-center">
                                                            <div class="btn-group">
                                                                <button class="btn btn-primary start">
                                                                    <i class="fas fa-upload"></i>
                                                                    <span>Iniciar</span>
                                                                </button>
                                                                <button data-dz-remove class="btn btn-warning cancel">
                                                                    <i class="fas fa-times-circle"></i>
                                                                    <span>Cancelar</span>
                                                                </button>
                                                                <button data-dz-remove class="btn btn-danger delete">
                                                                    <i class="fas fa-trash"></i>
                                                                    <span>Eliminar</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                            <div class="card-footer">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn bg-gradient-success" id="btnInsertarCliente">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarLabel">Editar Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="udp-idcustomer" id="udp-idcustomer" hidden>
                <label for="">Grado: </label>
                <select class="form-control" name="udp-icvegrado" id="udp-icvegrado">
                </select>
                <label for="udp-namecustomer">Nombre</label>
                <input type="text" class="form-control" name="udp-namecustomer" id="udp-namecustomer" placeholder="Nombre del Cliente">
                <label for="udp-addresscustomer">Direcci&oacute;n</label>
                <input type="text" class="form-control" name="udp-addresscustomer" id="udp-addresscustomer" placeholder="Direcci&oacute;n del Cliente">
                <label for="udp-mobilecustomer">Tel&eacute;fono</label>
                <input type="text" class="form-control" name="udp-mobilecustomer" id="udp-mobilecustomer" placeholder="Tel&eacute;fono del Cliente">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnActualizarCliente">Actualizar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalBorrarCliente">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header">
                <h4 class="modal-title">Borrar Registros</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Desea eliminar el Cliente
                <div class="form-group">
                    <label for="deleteCliente">Id del Cliente:</label>
                    <input type="text" class="form-control" name="deleteCliente" id="deleteCliente" readonly>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-warning" id="btnEliminarCliente">Eliminar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->



<?php
include_once "dashboard/endTemplateDashboard.php";
?>


<!-- REQUIRED SCRIPTS -->
<?php
include_once "dashboard/footerDashBoard.php";
?>
<!-- <script>
    $(function() {
        $("#example1").DataTable({
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    });
</script> -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4WQMsVbk-lm1IFuhwfPGJAkQ2EQmf5e4&callback=initMap" async defer></script>
<script src="../assets/Modules/Clients/GoogleMaps/maps.js"></script>
<script src="../assets/Modules/Clients/DropFile/dropfilezone.js"></script>
<script src="../assets/customer.js"></script>
<script src="../assets/conf.js"></script>