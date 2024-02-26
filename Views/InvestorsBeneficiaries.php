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
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card card-success">
                <div class="card-header">
                    <h1 class="card-title col-md-4" style="font-size: 26px; margin:auto;">
                        <strong><i class="fas fa-search-dollar"></i>
                            &nbsp; &nbsp; Inversionista - Control de Beneficiairios y Porcentajes.
                        </strong>
                    </h1>
                    <div class="card-tools col-md-4 float-left">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3>150</h3>

                                <p><div id="pasignado"></div></p>
                            </div>
                            <div class="icon">
                                <i class="fas fa-sort-amount-up"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-tools col-md-4 float-left">
                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h3><div id="pnoasignado"></div></h3>

                                <p>Porcentaje no Asignado</p>
                            </div>
                            <div class="icon">
                                <i class="fas fa-sort-amount-down"></i>
                            </div>
                        </div>
                    </div>
                    <input type="text" name="fieldicveinversionista" id="fieldicveinversionista" hidden>
                </div>
                <!-- /.card-header -->
                <div class="card-body">

                    <div class="row">
                        <!-- Main content -->
                        <section class="col-12">

                            <!-- Default box -->
                            <div class="card bg-financiera-success">
                                <div class="card-header">
                                    <h2 class="card-title"><i class="fas fa-credit-card"></i> <strong> Cat&aacute;logo de Beneficiarios Inversionista. </strong> </h2>
                                    <div class="card-tools float-right m-2">
                                        <button id="btnAddBenefs" type="button" class="btn btn-success"><i class="nav-icon fas fa-money-bill-wave"></i>&nbsp; &nbsp;Agregar</button>
                                        <button id="btnReturnInvestor" type="button" class="btn btn-danger">&nbsp; &nbsp;Regresar</button>
                                    </div>
                                </div>
                                <div class="card-body table-responsive p-0 bg-success">
                                    <table id="tblBenefs" class="table table table-hover text-nowrap">
                                    </table>
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </section>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </div>
</div>

<div class="modal fade" id="modalAddBenefs" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h3 class="modal-title">Captura Beneficiario del Inversionista.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <form id="formAddDataBank">
                        <div class="row justify-content-center">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="nameBenefi">Nombre del Beneficiario:</label>
                                    <input type="text" class="form-control" name="nameBenefi" id="nameBenefi" aria-describedby="">
                                    <small id="helpId" class="form-text">Nombre de la Beneficiaria o Beneficiario.</small>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="teleBenefi">Tel&eacute;fono del Beneficiario:</label>
                                    <input type="tel" class="form-control" name="teleBenefi" id="teleBenefi" aria-describedby="">
                                    <small id="helpId" class="form-text">Tel&eacute;fono de la Beneficiaria o Beneficiario.</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="direcciBenefi">Direcci&oacute;n:</label>
                                    <input type="text" class="form-control" name="direcciBenefi" id="direcciBenefi" aria-describedby="helpId" placeholder="Este campo puede ir vac&iacute;o.">
                                    <small id="direcciBenefi-help" class="form-text">Direcci&oacute;n de la Beneficiaria o Beneficiario.</small>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="btnSaveBenefi">Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalEditBenefi" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content fondo_cliente_edit_modal">
            <div class="modal-header">
                <h3 class="modal-title">Edici&oacute;n de Datos - Cuenta Bancaria.</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" name="icvecuentacveinver" id="icvecuentacveinver" hidden>
                <div class="col-12">
                    <form id="formAddDataBank">
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="selCatIcveBanco">Banco:</label>
                                    <select class="form-control" name="udp-selCatIcveBanco" id="udp-selCatIcveBanco">
                                    </select>
                                    <small id="helpId" class="form-text">Instituci&oacute;n Bancaria.</small>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="numberAccountBank">N&uacute;mero de Cuenta:</label>
                                    <input type="text" class="form-control" name="udp-numberAccountBank" id="udp-numberAccountBank" aria-describedby="helpId" placeholder="">
                                    <small id="helpId" class="form-text">Cuenta Bancaria.</small>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="typeAccountBank">Tipo de Cuenta:</label>
                                    <select class="form-control" name="udp-typeAccountBank" id="udp-typeAccountBank">
                                        <option value="">SELECCIONE</option>
                                        <option value="1">CLABE</option>
                                        <option value="2">TARJETA D&Eacute;BITO</option>
                                        <option value="3">CTA BANCARIA</option>
                                    </select>
                                    <small id="helpId" class="form-text">N&uacute;m. de Cta, CLABE, N&uacute;m. Tarjeta .</small>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="statusAccountBank">Estatus de Cuenta:</label>
                                    <select class="form-control" name="udp-statusAccountBank" id="udp-statusAccountBank">
                                        <option value="1">ACTIVA</option>
                                        <option value="2">INACTIVA</option>
                                    </select>
                                    <small id="helpId" class="form-text">Estatus de la cuenta bancaria.</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="observationsAccountBank">Observaciones:</label>
                                    <input type="text" class="form-control" name="udp-observationsAccountBank" id="udp-observationsAccountBank" aria-describedby="helpId" placeholder="Este campo puede ir vac&iacute;o.">
                                    <small id="observationsAccountBank-help" class="form-text">Observaciones de la Cuenta Bancaria.</small>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <div class="form-group">
                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                        <input type="checkbox" class="custom-control-input" id="udp-customSwitch3">
                                        <label class="custom-control-label" for="udp-customSwitch3">Active este Switch si la cuenta es la principal.</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="btnSaveEditAccountBank">Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<?php
include_once "dashboard/endTemplateDashboard.php";
?>
<script src="../utils/js/libs/crypto.js"></script>
<script src="../utils/plugins/uplot/uPlot.iife.min.js"></script>
<script src="../utils/plugins/chart.js/Chart.min.js"></script>
<script src="../assets/conf.js"></script>
<script text="text/javascript" type="module" src="../assets/mainBeneficiaries.js"></script>

<!-- REQUIRED SCRIPTS -->
<?php
include_once "dashboard/footerDashBoard.php";
?>