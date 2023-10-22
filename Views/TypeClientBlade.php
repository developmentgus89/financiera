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
        <div class="card card-info">
            <div class="card-header">
                <h2 class="col-6 ">Cat&aacute;logo de Tipos de Cliente</h2>
                <div class="col-2 card-title">

                </div>
                <div class="col-4 card-title">
                    <button type="button" class="btn btn-block bg-gradient-success btn-sm" id="agregar-tasa">
                        <i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Tipo de Cliente
                    </button>
                </div>

            </div>
            <!-- /.card-header -->
            <div class="card-body">
                <table id="tblTipoCliente" class="table table-bordered table-dark">

                </table>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content -->
<!-- Modal Agregar -->
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content fondo-tipo-cliente">
            <div class="modal-header">
                <h4 class="modal-title" id="modalAgregarLabel">Agregar nuevo Tipo de Cliente</h4>
                <button type="button" class="close btnCloseColor" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="typeclientdescripcion">Descripci&oacute;n del Tipo de Cliente:</label>
                            <input type="text" class="form-control" name="typeclientdescripcion" id="typeclientdescripcion" aria-describedby="htaxdescripcion" placeholder="">
                            <small id="htaxdescripcion" class="form-text">Descripci&oacute;n larga tipo de cliente.</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="abreTipoClient">Abreviatura del Tipo Cliente:</label>
                            <input type="text" class="form-control" name="abreTipoClient" id="abreTipoClient" aria-describedby="habreTipoClient" placeholder="">
                            <small id="habreTipoClient" class="form-text">Indique la abreviatura del tipo de cliente.</small>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                            <label for="typeClientTax">Tasa de Inter&eacute;s:</label>
                            <select class="form-control" name="typeClientTax" id="typeClientTax">
                            </select>
                            <small id="htypeClientTax" class="form-text">Observaciones no son obligatorias pero se sugiere capturar.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnInsertarTipoCliente">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-lg fondo_cliente_edit_modal">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarLabel">Editar registro del "Tipo Cliente"</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="udp-icvetipocliente" id="udp-icvetipocliente" hidden>
                <label for="udp-cdescriptipocliente">Descripción del Tipo de Cliente: </label>
                <input type="text" class="form-control" name="udp-cdescriptipocliente" id="udp-cdescriptipocliente" placeholder="Nombre del tabulador de inter&eacute;s">
                <label for="udp-cabreviiatipo">Abreviaci&oacute;n:</label>
                <input type="text" class="form-control" name="udp-cabreviiatipo" id="udp-cabreviiatipo" placeholder="Direcci&oacute;n del Cliente">
                <label for="udp-tasainteres">% Tasa de Inter&eacute;s:</label>
                <select class="form-control" name="udp-tasainteres" id="udp-tasainteres">
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnActTasaInteresTCliente">Actualizar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalBorrarTipoCliente">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header">
                <h4 class="modal-title">Borrar Tasa de Inter&eacute;s</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Desea eliminar la tasa de inter&eacute;s
                <div class="form-group">
                    <label for="deleteTipoClienteId">Id de la Tasa de Inter&eacute;s:</label>
                    <input type="text" class="form-control" name="deleteTipoClienteId" id="deleteTipoClienteId" hidden>
                </div>
                <div id="elementText">

                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-warning" id="btnEliminarInteres">Eliminar</button>
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
<script src="../assets/typeclient.js"></script>
<script src="../assets/conf.js"></script>