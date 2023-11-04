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
                    <h1 class="col-6"><strong>Detalle de Inversiones.</strong></h1>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="row">
                        <div class="card card-success card-tabs text-title-cat">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true"><b>Datos Personales</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false"><b>Inversiones</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false"><b>Egresos</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-pays" data-toggle="pill" href="#custom-tabs-one-pays" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false"><b>Pagos</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-egresos" data-toggle="pill" href="#custom-tabs-one-egresos" role="tab" aria-controls="custom-tabs-one-egresos" aria-selected="false"><b>Estad&iacute;sticas</b></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body fondo-tabs">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active col-12" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                        <div class="row">
                                            <div class="col-xl-4">
                                                <div class="form-group">
                                                    <label for="">NOMBRE:</label>
                                                    <input type="text" class="form-control text-muted" name="selInvNombre" id="selInvNombre" placeholder="" disabled>
                                                </div>
                                            </div>
                                            <div class="col-xl-4">
                                                <div class="form-group">
                                                    <label for="">A. PATERNO:</label>
                                                    <input type="text" class="form-control text-muted" name="selInvAPaterno" id="selInvAPaterno" placeholder="" disabled>
                                                </div>
                                            </div>
                                            <div class="col-xl-4">
                                                <div class="form-group">
                                                    <label for="">A. MATERNO:</label>
                                                    <input type="text" class="form-control text-muted" name="selInvAMaterno" id="selInvAMaterno" placeholder="" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="">EDAD:</label>
                                                    <input type="text" class="form-control" name="selInvEdad" id="selInvEdad" aria-describedby="helpId" placeholder="" disabled>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="">TEL&Eacute;FONO</label>
                                                    <input type="text" class="form-control" name="selInvTelefono" id="selInvTelefono" aria-describedby="helpId" placeholder="" disabled>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="">CAPITAL INVERTIDO</label>
                                                    <input type="text" class="form-control" name="selInvCapInv" id="selInvCapInv" aria-describedby="helpId" placeholder="" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <div class="row">
                                            <div class="col-md-3 col-sm-6 col-12 text-title-cat">
                                                <div class="info-box">
                                                    <span class="info-box-icon bg-success"><i class="fas fa-coins"></i></span>

                                                    <div class="info-box-content">
                                                        <span class="info-box-text">Total de Inversiones.</span>
                                                        <span class="info-box-number">1,410</span>
                                                    </div>
                                                    <!-- /.info-box-content -->
                                                </div>
                                                <!-- /.info-box -->
                                            </div>
                                            <div class="col-md-3 col-sm-6 col-12 text-title-cat">
                                                <div class="info-box">
                                                    <span class="info-box-icon bg-warning"><i class="fas fa-dollar-sign"></i></span>

                                                    <div class="info-box-content">
                                                        <span class="info-box-text">Capital Invertido.</span>
                                                        <span class="info-box-number">
                                                            <div id="cTotalInvertida"></div>
                                                        </span>
                                                    </div>
                                                    <!-- /.info-box-content -->
                                                </div>
                                                <!-- /.info-box -->
                                            </div>
                                            <div class="col-md-3 col-sm-6 col-12 text-title-cat">
                                                <div class="info-box">
                                                    <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>

                                                    <div class="info-box-content">
                                                        <span class="info-box-text">Capital Pagado.</span>
                                                        <span class="info-box-number">
                                                            <div id="cPagCapital"></div>
                                                        </span>
                                                    </div>
                                                    <!-- /.info-box-content -->
                                                </div>
                                                <!-- /.info-box -->
                                            </div>
                                            <div class="col-md-3 col-sm-6 col-12 text-title-cat">
                                                <div class="info-box">
                                                    <span class="info-box-icon bg-danger"><i class="fas fa-dollar-sign"></i></span>

                                                    <div class="info-box-content">
                                                        <span class="info-box-text">Capital Pendiente.</span>
                                                        <span class="info-box-number">
                                                            <div id="cPendCapital"></div>
                                                        </span>
                                                    </div>
                                                    <!-- /.info-box-content -->
                                                </div>
                                                <!-- /.info-box -->
                                            </div>
                                        </div>
                                        <hr class="divider">
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <div class="card card-secondary">
                                                    <div class="card-header">
                                                        <h2 class="card-title col-md-6"><strong>Registro de Inversiones.</strong></h2>
                                                        <div class="card-title col-md-6">
                                                            <button type="button" class="btn bg-gradient-primary btn-sm" id="btnAddInversion">
                                                                <i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Inversi&oacute;n.
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-- /.card-header -->
                                                    <div class="card-body">
                                                        <table id="tableInvestorsDetails" class="table table-bordered table-dark">
                                                        </table>
                                                    </div>
                                                    <!-- /.card-body -->
                                                </div>
                                                <!-- /.card -->
                                            </div>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-pays" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                        Control de pagos de inter&eacute;s.
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                        Control de egresos o retiros de capital.
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-egresos" role="tabpanel" aria-labelledby="custom-tabs-egresos">
                                        Control de estad&iacute;sticas del inversionista comportamiento.
                                    </div>
                                </div>
                            </div>
                            <!-- /.card -->
                        </div>
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
<!-- Modal Agregar -->
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content fondo-modal-add-inv">
            <div class="modal-header">
                <h4 class="modal-title" id="modalAgregarLabel"><strong>Agregar Nuevo Inversionista.</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invnombre">Nombre:</label>
                            <input type="text" class="form-control" name="invnombre" id="invnombre" aria-describedby="hclinombre" placeholder="">
                            <small id="hclinombre" class="form-text">Capture el nombre del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invapaterno">Apellido Paterno:</label>
                            <input type="text" class="form-control" name="invapaterno" id="invapaterno" aria-describedby="hcliapaterno" placeholder="">
                            <small id="hcliapaterno" class="form-text">Capture el apellido paterno del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invamaterno">Apellido Materno:</label>
                            <input type="text" class="form-control" name="invamaterno" id="invamaterno" aria-describedby="hcliamaterno" placeholder="">
                            <small id="hcliamaterno" class="form-text">Capture el Apellido Materno del Inversionista</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="invedad">Edad:</label>
                            <input type="number" step="1" min="18" value="18" class="form-control" name="invedad" id="invedad" aria-describedby="hinvedad" placeholder="">
                            <small id="hinvedad" class="form-text">Edad del inversionista.</small>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="invtelefono">Tel&eacute;fono:</label>
                                <input type="number" class="form-control" name="invtelefono" id="invtelefono" aria-describedby="hinvtelefono" placeholder="">
                                <small id="hinvtelefono" class="form-text">Cliente debe ser mayor de edad.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="invcantinvertida">Cantidad Invertida:</label>
                            <input type="text" class="form-control" name="invcantinvertida" id="invcantinvertida" aria-describedby="hinvcantinvertida" placeholder="">
                            <small id="hinvcantinvertida" class="form-text">Capital inicial de inversi&oacute;n</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invclabe">Cuenta Bancaria:</label>
                            <input type="text" class="form-control" name="invclabe" id="invclabe" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hinvclabe" class="form-text">Cuenta de dep&oacute;sito Bancaria (CLABE)</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invemail">E-Mail:</label>
                            <input type="email" class="form-control" name="invemail" id="invemail" aria-describedby="hinvemail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                            <small id="hinvemail" class="form-text">Correo electr&oacute;nico de contacto</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invDate">Fecha de Registro:</label>
                            <input type="date" class="form-control" name="invDateRegister" id="invDateRegister" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hclientDateRegister" class="form-text">dd/mm/aaaa</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn bg-gradient-success" id="btnInsertInvestor">Agregar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-add-inversion">
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
                          <input type="date"
                            class="form-control" name="inputDateInver" id="inputDateInver">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputMontoInver">CANTIDAD $:</label>
                          <input type="number" step="0.5"
                            class="form-control" name="inputMontoInver" id="inputMontoInver">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                    <div class="form-group">
                          <label for="inputObsInver">OBSERVACIONES:</label>
                          <input type="text" 
                            class="form-control" name="inputObsInver" id="inputObsInver">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success">Guardar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
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
<script src="../assets/investorsDetails.js"></script>
<script src="../assets/investmentsDetail.js"></script>
<script typ="module" src="../assets/conf.js"></script>