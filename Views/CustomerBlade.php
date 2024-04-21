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
                <h2 class="col-6 card-title"><strong>Cat&aacute;logo de Clientes</strong></h2>
                <div class="col-2 card-title">

                </div>
                <div class="col-2 card-title">

                </div>
                <div class="col-2 card-title">
                    <button type="button" class="btn btn-block bg-gradient-primary btn-sm" id="agregar-cliente">
                        <i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Cliente
                    </button>
                </div>

            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-3 fondo-tabs">
                <table id="tablaClientes" class="table table-hover text-wrap">
                    <!-- <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Edad</th>
                            <th>Tipo Cliente</th>
                            <th>Status</th>
                            <th>Acciones</th>
                        </tr>
                    </thead> -->
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
            <div class="modal-body" style="height: 350px; overflow-y: scroll;">
                <div class="row">
                    <div class="col-5 col-sm-3">
                        <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical" style="color: black;">
                            <a class="nav-link active" id="vert-tabs-home-tab" data-toggle="pill" href="#vert-tabs-home" role="tab" aria-controls="vert-tabs-home" aria-selected="true" style="color:black;">Datos Personales</a>
                            <a class="nav-link" id="vert-tabs-profile-tab" data-toggle="pill" href="#vert-tabs-profile" role="tab" aria-controls="vert-tabs-profile" aria-selected="false" style="color:black;">Documentaci&oacute;n</a>
                            <a class="nav-link" id="vert-tabs-messages-tab" data-toggle="pill" href="#vert-tabs-messages" role="tab" aria-controls="vert-tabs-messages" aria-selected="false" style="color:black;">Cr&eacute;ditos</a>
                            <a class="nav-link" id="vert-tabs-settings-tab" data-toggle="pill" href="#vert-tabs-settings" role="tab" aria-controls="vert-tabs-settings" aria-selected="false" style="color:black;">Cuenta Bancaria</a>
                        </div>
                    </div>
                    <div class="col-7 col-sm-9">
                        <div class="tab-content" id="vert-tabs-tabContent">
                            <div class="tab-pane text-left fade show active" id="vert-tabs-home" role="tabpanel" aria-labelledby="vert-tabs-home-tab">
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
                            <div class="tab-pane fade" id="vert-tabs-profile" role="tabpanel" aria-labelledby="vert-tabs-profile-tab">
                                <div class="card card-success">
                                    <div class="card-header">
                                        <h3 class="card-title">Documentaci&oacute;n <small> que es solicitada al cliente. </small></h3>
                                    </div>
                                    <div class="card-body" style="color:black">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="cli-cdomicilio">Comprobante de Domicilio</label>
                                                    <input type="file" class="form-control-file" name="cli-cdomicilio" id="cli-cdomicilio" placeholder="" aria-describedby="fileHelpId">
                                                    <small id="fileHelpId" class="form-text text-muted">Cargue el comprobante de Domicilio</small>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="cli-cdomicilio">Comprobante de Domicilio</label>
                                                    <input type="file" class="form-control-file" name="cli-cdomicilio" id="cli-cdomicilio" placeholder="" aria-describedby="fileHelpId">
                                                    <small id="fileHelpId" class="form-text text-muted">Cargue el comprobante de Domicilio</small>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="cli-cdomicilio">Comprobante de Domicilio</label>
                                                    <input type="file" class="form-control-file" name="cli-cdomicilio" id="cli-cdomicilio" placeholder="" aria-describedby="fileHelpId">
                                                    <small id="fileHelpId" class="form-text text-muted">Cargue el comprobante de Domicilio</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.card-body -->
                                    <div class="card-footer">

                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="vert-tabs-messages" role="tabpanel" aria-labelledby="vert-tabs-messages-tab">
                                Aqui iria la solicitud de cr&eacute;ditos.
                            </div>
                            <div class="tab-pane fade" id="vert-tabs-settings" role="tabpanel" aria-labelledby="vert-tabs-settings-tab">
                                Aqui los datos de la cuenta bancaria.
                            </div>
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
<script src="../assets/Modules/Clients/DropFile/dropfilezone.js"></script>
<script src="../assets/customer.js"></script>
<script src="../assets/conf.js"></script>