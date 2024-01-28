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
    <div class="row">
        <div class="col-md-12">
            <div class="card card-success">
                <div class="card-header">
                    <h2 class="card-title col-md-3"><strong><i class="fas fa-search-dollar"></i> &nbsp; &nbsp; Inversionista</strong></h2>
                    <div class="card-tools col-md-9 float-left">
                        <strong>
                            <div id="idInvestor"></div>
                        </strong>
                    </div>
                    <input type="text" name="fieldicveinversionista" id="fieldicveinversionista" hidden>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="row">
                        <!-- Main content -->
                        <section class="content col-12">

                            <!-- Default box -->
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Datos y seguimiento del Inversionista</h3>

                                    <div class="card-tools">
                                        <button id="btnBackInvestments" type="button" class="btn btn-danger">Regresar</button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-12 col-lg-12 order-2 order-md-1">

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <!-- Profile Image -->
                                            <div class="card card-success card-outline">
                                                <div class="card-body box-profile">
                                                    <div class="text-center">
                                                        <img class="profile-user-img img-fluid img-circle" src="../utils/img/descarga.png" alt="User profile picture">
                                                    </div>

                                                    <h3 class="profile-username text-center text-title-cat">
                                                    </h3>

                                                    <h4 class="text-muted text-center">Datos Personales</h4>

                                                    <ul class="list-group list-group-unbordered mb-3">
                                                        <li class="list-group-item">
                                                            <b class="text-title-cat"><i class="nav-icon fas fa-user-tie p-2"></i>Nombre:</b> <span class="float-right text-title-cat">
                                                                <div id="nameInvestor"></div>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <b class="text-title-cat"><i class="nav-icon fas fa-phone p-2"></i>Tel&eacute;fono:</b> <span class="float-right text-title-cat">
                                                                <div id="telephoneInvestor"></div>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <b class="text-title-cat"><i class="nav-icon fas fa-university p-2"></i>Cuentas Bancarias</b> <a name="" id="seeBankData" class="float-right" href="#">Ver</a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <b class="text-title-cat"><i class="nav-icon fas fa-id-card p-2"></i>Benefeciarios:</b> <a name="" id="seeBeneficiaries" class="float-right" href="#">Ver</a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <b class="text-title-cat"><i class="nav-icon fas fa-envelope-open-text p-2"></i> E-Mail</b> <a class="float-right text-title-cat">
                                                                <div id="mailInvestor"></div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!-- /.card-body -->
                                            </div>
                                            <!-- /.card -->
                                        </div>
                                        <div class="col-md-5">
                                            <div class="card card-success">
                                                <div class="card-header">
                                                    Comportamiento de las inversiones.
                                                </div>
                                                <div class="card-body text-title-cat">
                                                    <div class="chart">
                                                        <canvas id="lineChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;">
                                                        </canvas>
                                                    </div>
                                                </div>
                                                <div class="card-footer bg-secondary text-muted">
                                                    Solo se toma en cuenta el &uacute;ltimo a&ntilde;o.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="row">
                                                <div class="col-12 col-sm-12">
                                                    <div class="info-box bg-success">
                                                        <div class="info-box-content">
                                                            <h5 class="info-box-text text-center"><strong>Capital</strong></h5>
                                                            <span class="info-box-number text-center mb-0">
                                                                <div id="totalCapital"></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 col-sm-12">
                                                    <div class="info-box bg-secondary">
                                                        <div class="info-box-content">
                                                            <h5 class="info-box-text text-center"><strong>Inversiones</strong></h5>
                                                            <span class="info-box-number text-center mb-0">
                                                                <div id="totalInversiones"></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 col-sm-12">
                                                    <div class="info-box bg-primary">
                                                        <div class="info-box-content">
                                                            <strong>Inter&eacute;s Pagado</strong>
                                                            <span class="info-box-text text-center"></span>
                                                            <span class="info-box-number text-center mb-0">
                                                                <div id="interesTotalPagado"></div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <!-- /.card-body -->

                            <!-- Default box -->
                            <div class="card card-secondary">
                                <div class="card-header">
                                    <h2 class="card-title">Cat&aacute;logo de Inversiones.</h2>
                                    <div class="card-tools float-right m-2">
                                        <button id="btnAddInversion" type="button" class="btn btn-primary"><i class="nav-icon fas fa-money-bill-wave"></i>&nbsp; &nbsp;Agregar</button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive p-0 bg-success justify-content-center">
                                    <table id="tblInversiones" class="table table table-hover text-nowrap">
                                    </table>
                                </div>
                            </div>
                            <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                    </section>
                </div>
            </div>
        </div>
        <!-- /.card-body -->
    </div>
</div>
</div>

<!-- /.container-fluid -->
</div>
<!-- /.content -->

<div class="modal fade" id="modalAddInversion">
    <div class="modal-dialog">
        <div class="modal-content bg-info">
            <div class="modal-header">
                <h4 class="modal-title">Registro de Nueva Inversi&oacute;n</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputDateInver">FECHA INVERSI&Oacute;N:</label>
                            <input type="date" class="form-control" name="setInputDateInver" id="setInputDateInver">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputMontoInver">CANTIDAD $:</label>
                            <input type="text" step="0.5" class="form-control" name="setIinputMontoInver" id="setInputMontoInver">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="inputInteres">Porcetaje de Inter&eacute;s de la inversi&oacute;n:</label>
                            <select class="form-control" name="setInputInteres" id="setIinputInteres">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="inputObsInver">OBSERVACIONES:</label>
                            <input type="text" class="form-control" name="setInputObsInver" id="setInputObsInver">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnSaveInvesments">Guardar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade" id="modalEditionInvesment">
    <div class="modal-dialog modal-lg">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h4 class="modal-title">Edici&oacute;n de la Inversi&oacute;n</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="inputDateInver">FECHA INVERSI&Oacute;N:</label>
                            <input type="number" class="form-control" name="udpcveinverdetalle" id="udpcveinverdetalle" hidden>
                            <input type="number" class="form-control" name="udpcveinversionista" id="udpcveinversionista" hidden>
                            <input type="date" class="form-control" name="udpinputDateInver" id="udpinputDateInver">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="icveinteres">Inter&eacute;s:</label>
                            <select class="form-control" name="udpicveinteres" id="udpicveinteres">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="inputMontoInver">CANTIDAD $:</label>
                            <input type="text" step="0.5" class="form-control" name="udpinputMontoInver" id="udpinputMontoInver">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="inputObsInver">OBSERVACIONES:</label>
                            <input type="text" class="form-control" name="udpinputObsInver" id="udpinputObsInver">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" name="btnSaveUpdateInvesmentsDetail" id="btnSaveUpdateInvesmentsDetail">Guardar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<!-- Modal -->
<div class="modal fade" id="modalSeeDataBank" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h3 class="modal-title">Cuentas Bancarias.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="card card-success">
                            <div class="card-header">
                                <h2 class="card-title">Cat&aacute;logo de Cuentas Bancarias.</h2>
                                <div class="card-tools float-right m-2">
                                    <button id="btnAddDataBank" type="button" class="btn btn-primary active"><i class="nav-icon fas fa-layer-group"></i>&nbsp; &nbsp;Agregar</button>
                                </div>
                            </div>
                            <div class="card-body table-responsive p-2 bg-success">
                                <table id="tblBankAccounts" class="table table table-hover text-nowrap">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalAddDataBank" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h3 class="modal-title">Captura de Cuenta Bancaria.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="ctaicvebanco">Banco:</label>
                              <select class="form-control" name="ctaicvebanco" id="ctaicvebanco">
                                <option>Banco 1</option>
                                <option>Banco 2</option>
                                <option>Banco 3</option>
                              </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for=""></label>
                              <input type="text"
                                class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                              <small id="helpId" class="form-text text-muted">Help text</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success">Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="modalSeeBeneficiaries" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Control de Beneficiarios del Inversionista.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="text-center">
                            <div class="card card-info">
                                <div class="card-header">
                                    <h2 class="card-title">Cat&aacute;logo de Beneficiarios</h2>
                                    <div class="card-tools float-right m-2">
                                        <button id="btnAddInversion" type="button" class="btn btn-primary"><i class="nav-icon fas fa-money-bill-wave"></i>&nbsp; &nbsp;Agregar</button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive p-0 bg-success">
                                    <table id="tblBankAccounts" class="table table table-hover text-nowrap">
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


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
<script src="../utils/js/libs/crypto.js"></script>
<script type="module" src="../assets/conf.js"></script>
<script src="../utils/plugins/uplot/uPlot.iife.min.js"></script>
<script src="../utils/plugins/chart.js/Chart.min.js"></script>
<script src="../assets/getInterestsForInvestment.js"></script>
<script src="../assets/investorsDetails.js"></script>
<script type="module" src="../assets/investmentsDetail.js"></script>
<script src="../assets/conf.js"></script>