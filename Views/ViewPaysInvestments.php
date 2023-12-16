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
                <h2 class="col-6 card-title"><strong>Cat&aacute;logo de Pagos de Intereses</strong></h2>
                <div class="card-tools">
                    <button id="btnBackPaysInvestments" type="button" class="btn btn-danger" onclick="window.history.back()">Regresar</button>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
                <div class="row">
                    <div class="col-md-5">
                        <!-- Profile Image -->
                        <div class="card card-success card-outline">
                            <div class="card-body box-profile">
                                <div class="text-center">
                                    <img class="profile-user-img img-fluid img-circle" src="../utils/img/iconInvestment.png" alt="User profile picture">
                                </div>

                                <h3 class="profile-username text-center text-title-cat">
                                </h3>

                                <h4 class="text-muted text-center">Detalle de la Inversi&oacute;n</h4>

                                <ul class="list-group list-group-unbordered mb-3">
                                    <li class="list-group-item">
                                        <b class="text-title-cat"><i class="nav-icon fas fa-hand-holding-usd"></i> Monto:</b> <span class="float-right text-title-cat">
                                            <div id="montoInvestment"></div>
                                        </span>
                                    </li>
                                    <li class="list-group-item">
                                        <b class="text-title-cat"><i class="nav-icon fas fa-calendar-day"></i> Fecha Registro:</b> <span class="float-right text-title-cat">
                                            <div id="dateInvestment"></div>
                                        </span>
                                    </li>
                                    <li class="list-group-item">
                                        <b class="text-title-cat"><i class="nav-icon fas fa-lightbulb"></i> Estatus:</b> <a class="float-right text-title-cat">
                                            <div id="statusInvestment"></div>
                                        </a>
                                    </li>
                                    <li class="list-group-item">
                                        <b class="text-title-cat"><i class="nav-icon fas fa-percent"></i> Interes Aplicado:</b> <a class="float-right text-title-cat">
                                            <div id="interesInvestment"></div>
                                        </a>
                                    </li>
                                    <li class="list-group-item">
                                        <b class="text-title-cat"><i class="fas fa-comment-dollar"></i> Intereses Pagados:</b> <a class="float-right text-title-cat">
                                            <div id="totalInterestInvestment"></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <div class="col-md-7">
                        <!-- Profile Image -->
                        <div class="card card-primary card-outline">
                            <div class="card-body table-responsive box-profile bg-financiera-success">
                                <h3 class="">Control de Pagos.</h3>
                                <table id="tblPaysInvestments" class="table table-hover text-nowrap">
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>

            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content -->

<div class="modal fade" id="m-confirm-pay">
    <div class="modal-dialog">
        <div class="modal-content bg-warning">
            <div class="modal-header">
                <h3 class="modal-title">Confirmaci&oacute;n de Pago.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <input type="text" class="form-control" name="icvepayment" id="icvepayment" hidden>
            </div>
            <div class="modal-body">
                <div id="text-msj">¿Desea confirmar el pago del inversionista? </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnRegresaModal">NO</button>
                <button type="button" class="btn btn-success" id="btnShowDialogAddDoc">SI</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<div class="modal fade" id="m-adddocument-pay">
    <div class="modal-dialog">
        <form id="formSubir" action="" method="post" enctype="multipart/form-data">
            <div class="modal-content bg-info">
                <div class="modal-header">
                    <h3 class="modal-title">Adjunta Comprobante de Pago.</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <input type="text" class="form-control" name="icvepaymentdoc" id="icvepaymentdoc" hidden>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                            <label for="">Adjuntar Documento: <span id="cvepagodoc"></span></label>
                            <input type="file" class="form-control-file" name="paycompfile" id="paycompfile" accept="image/*" aria-describedby="fileHelpAdjDoc">
                            <small id="fileHelpAdjDoc" class="form-text">Campo para subir el comprobante de pago.</small>
                        </div>
                    </div>

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="btnRegresaModal">CANCELAR</button>
                    <button type="button" class="btn btn-success" id="btnConfirmPay">GUARDAR</button>
                </div>
            </div>
            <!-- /.modal-content -->
    </div>
    </form>
    <!-- /.modal-dialog -->
</div>


<div class="modal fade" id="modalProgressBar">
    <div class="modal-dialog">
        <form id="formSubir" action="" method="post" enctype="multipart/form-data">
            <div class="modal-content bg-financiera-success">
                <div class="modal-header">
                    <h3 class="modal-title">Cargando Comprobante.</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container mt-3">
                        <h2>Subiendo Voucher a Servidor</h2>
                        <div class="progress">
                            <div id="myProgressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p id="statusMessage" class="mt-3" style="display: none;">Carga Completa!</p>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">

                </div>
            </div>
            <!-- /.modal-content -->
        </form>
    </div>

    <!-- /.modal-dialog -->
</div>

<div class="modal fade" id="modalViewVoucher">
    <div class="modal-dialog modal-lg">
        <form id="formSubir" action="" method="post" enctype="multipart/form-data">
            <div class="modal-content bg-success">
                <div class="modal-header">
                    <h3 class="modal-title">Cargando Comprobante.</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container mt-3 text-center">
                        <h2>Voucher de Pago</h2>
                        <img id="voucher" src="" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                    </div>
                </div>
                <div class="modal-footer justify-content-between">

                </div>
            </div>
            <!-- /.modal-content -->
        </form>
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

<script src="../utils/js/libs/crypto.js"></script>
<script type="module" src="../assets/conf.js"></script>
<script src="../utils/plugins/uplot/uPlot.iife.min.js"></script>
<script src="../utils/plugins/chart.js/Chart.min.js"></script>
<script src="../assets/getInterestsForInvestment.js"></script>
<script src="../assets/investorsDetails.js"></script>
<script src="../assets/viewPaysInvestments.js"></script>
<script src="../assets/conf.js"></script>