<?php
include_once "../Controllers/verifySession.php";
include_once "dashboard/headDashBoard.php";
include_once "../utils/settings/config.financiera.php";
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
<style>
    .custom-range {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 8px;
        background: #ddd;
        outline: none;
        opacity: 0.7;
        transition: opacity .15s ease-in-out;
    }

    .custom-range:hover {
        opacity: 1;
    }

    .custom-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 5px;
        height: 18px;
        background: #4FFC04;
        border-radius: 1px;
        /* Cambiado para que no sea redondo */
        cursor: pointer;
    }

    .custom-range::-moz-range-thumb {
        width: 24px;
        height: 24px;
        background: #4CAF50;
        border-radius: 0;
        /* Cambiado para que no sea redondo */
        cursor: pointer;
    }

    .custom-range::-ms-thumb {
        width: 24px;
        height: 24px;
        background: #4CAF50;
        border-radius: 0;
        /* Cambiado para que no sea redondo */
        cursor: pointer;
    }

    .custom-range::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: #ddd;
        border-radius: 5px;
    }

    .custom-range::-moz-range-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: #ddd;
        border-radius: 5px;
    }

    .custom-range::-ms-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    .custom-range::-ms-fill-lower {
        background: #ddd;
        border-radius: 5px;
    }

    .custom-range::-ms-fill-upper {
        background: #ddd;
        border-radius: 5px;
    }
</style>
<!-- Main content -->
<div class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="card card-success">
                <div class="card-header">
                    <h1 class="card-title"><strong>C&aacute;lculo de un Pr&eacute;stamo.</strong></h1>
                    <div class="card-tools float-right m-2">

                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-3 bg-financiera-success">
                    <div class="row">
                        <div class="form-group">
                            <label for="">Seleccione la cantidad de semanas:</label>
                            <select class="form-control" name="cantseman" id="cantseman">
                                <option value="0">Seleccione</option>
                                <option value="1">1 semanas</option>
                                <option value="2">2 semanas</option>
                                <option value="3">3 semanas</option>
                                <option value="4">4 semanas</option>
                                <option value="5">5 semanas</option>
                                <option value="6">6 semanas</option>
                                <option value="7">7 semanas</option>
                                <option value="8">8 semanas</option>
                                <option value="9">9 semanas</option>
                                <option value="10">10 semanas</option>
                                <option value="11">11 semanas</option>
                                <option value="12">12 semanas</option>
                                <option value="13">13 semanas</option>
                                <option value="14">14 semanas</option>
                                <option value="15">15 semanas</option>
                                <option value="16">16 semanas</option>
                                <option value="17">17 semanas</option>
                                <option value="18">18 semanas</option>
                                <option value="19">19 semanas</option>
                                <option value="20">20 semanas</option>
                                <option value="21">21 semanas</option>
                                <option value="22">22 semanas</option>
                                <option value="23">23 semanas</option>
                                <option value="24">24 semanas</option>
                                <option value="25">25 semanas</option>
                                <option value="26">26 semanas</option>
                                <option value="27">27 semanas</option>
                                <option value="28">28 semanas</option>
                                <option value="29">29 semanas</option>
                                <option value="30">30 semanas</option>
                                <option value="31">31 semanas</option>
                                <option value="32">32 semanas</option>
                                <option value="33">33 semanas</option>
                                <option value="34">34 semanas</option>
                                <option value="35">35 semanas</option>
                                <option value="36">36 semanas</option>
                                <option value="37">37 semanas</option>
                                <option value="38">38 semanas</option>
                                <option value="39">39 semanas</option>
                                <option value="40">40 semanas</option>
                                <option value="41">41 semanas</option>
                                <option value="42">42 semanas</option>
                                <option value="43">43 semanas</option>
                                <option value="44">44 semanas</option>
                                <option value="45">45 semanas</option>
                                <option value="46">46 semanas</option>
                                <option value="47">47 semanas</option>
                                <option value="48">48 semanas</option>
                                <option value="49">49 semanas</option>
                                <option value="50">50 semanas</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="customRange1">Pr&eacute;stmo Solicitado:</label>
                                <input type="range" class="custom-range" id="barprestamos" min="0" max="200000" step="100">
                                <h2>
                                    <div id="vcantprestamo">$ 0.00 MXN</div>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="info-box bg-modalCapitalPayment">
                                <span class="info-box-icon"><i class="fas fa-dollar-sign"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">
                                        <h4>Monto Solicitado</h4>
                                    </span>
                                    <span class="info-box-number">
                                        <div id="montoSolicitado">$ 0.00 MXN</div>
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-modalCapitalPayment">
                                <span class="info-box-icon"><i class="fas fa-coins"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">
                                        <h4>Intereses</h4>
                                    </span>
                                    <span class="info-box-number">
                                        <div id="montoIntereses">$ 0.00 MXN</div>
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-modalCapitalPayment">
                                <span class="info-box-icon"><i class="fas fa-hand-holding-usd"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">
                                        <h4>Pago por semana</h4>
                                    </span>
                                    <span class="info-box-number">
                                        <div id="pagoSemanal">$ 0.00 MXN</div>
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-modalCapitalPayment">
                                <span class="info-box-icon"><i class="fas fa-money-check-alt"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">
                                        <h4>Total</h4>
                                    </span>
                                    <span class="info-box-number">
                                        <div id="montoTotal">$ 0.00 MXN</div>
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
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
<script src="../utils/plugins/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
<script src="../utils/plugins/bootstrap-slider/bootstrap-slider.min.js"></script>
<script src="../assets/conf.js"></script>
<script src="../assets/Modules/QuickCalc/quickcalc.js"></script>