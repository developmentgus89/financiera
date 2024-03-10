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
                <h2 class="col-6">Cat&aacute;logo de Tasas y Comisiones</h2>
                <div class="col-2 card-title">

                </div>
                <div class="col-4 card-title">
                    <button type="button" class="btn btn-block bg-gradient-success btn-sm" id="agregar-tasa">
                        <i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Tasa o Comisi&oacute;n
                    </button>
                </div>

            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-2 bg-success">
                <table id="tblImpuestos" class="table table table-hover text-nowrap">
                  
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
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content fondo_cliente_add_modal">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAgregarLabel">Agregar nueva tasa de inter&eacute;s</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="taxdescripcion">Nombre de la tasa de Interés:</label>
                            <input type="text" class="form-control" name="taxdescripcion" id="taxdescripcion"
                                aria-describedby="htaxdescripcion" placeholder="">
                            <small id="htaxdescripcion" class="form-text">Descripci&oacute;n de la Tasa de Inter&eacute;s.</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="taxporcentajeinteres">Porcentaje de Interés:</label>
                            <input type="number" step="0.01" class="form-control" name="taxporcentajeinteres" id="taxporcentajeinteres"
                                aria-describedby="htaxporcentajeinteres" placeholder="">
                            <small id="htaxporcentajeinteres" class="form-text">Indique el porcentaje de la Tasa de Inter&eacute;s.</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="taxobservaciones">Observaciones:</label>
                            <input type="text" class="form-control" name="taxobservaciones" id="taxobservaciones"
                                aria-describedby="htaxobservaciones" placeholder="">
                            <small id="htaxobservaciones" class="form-text">Observaciones no son obligatorias pero se sugiere capturar.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnInsertarInteres">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditarLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarLabel">Editar Tasa de Inter&eacute;s</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="udp-icvetasascomisiones" id="udp-icvetasascomisiones" hidden>
                <label for="">Nombre de la Tasa de Inter&eacute;s: </label>
                <input type="text" class="form-control" name="udp-cdescripciontascom" id="udp-cdescripciontascom"
                    placeholder="Nombre del tabulador de inter&eacute;s">
                <label for="udp-ftasainteres">Porcentaje de Inter&eacute;s:</label>
                <input type="number" step="0.01" class="form-control" name="udp-ftasainteres" id="udp-ftasainteres"
                    placeholder="Direcci&oacute;n del Cliente">
                <label for="udp-cattasacomobs">Observaciones:</label>
                <input type="text" class="form-control" name="udp-cattasacomobs" id="udp-cattasacomobs"
                    placeholder="Descripci&oacute;n detallada">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnActualizarTasaInteres">Actualizar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalBorrarTasaInteres">
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
                    <label for="deleteTasaInteres">Id de la Tasa de Inter&eacute;s:</label>
                    <input type="text" class="form-control" name="deleteTasaInteres" id="deleteTasaInteres" hidden>
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
<script src="../assets/taxcomisions.js"></script>
<script src="../assets/conf.js"></script>