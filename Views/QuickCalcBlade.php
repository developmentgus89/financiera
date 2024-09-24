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
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="">Seleccione la cantidad de semanas:</label>
                                <select class="form-control" name="cantseman" id="cantseman">
                                    <option value="0">Seleccione</option>
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
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            
                        </div>
                        <div class="col-md-3">
                           
                        </div>
                        <div class="col-md-3">
                            
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="customRange1">Pr&eacute;stmo Solicitado:</label>
                                <h2 class="mb-5">
                                    <div id="vcantprestamo">$ 0.00 MXN</div>
                                </h2>
                                
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="customRange1">Porcentaje del pr&eacute;stamo:</label>
                                <h2 class="mb-5">
                                    <div id="vcantporcentaje"> 0.00 %</div> semanal
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="range" class="custom-range" id="barprestamos" min="0" max="15000" step="500">
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
                                        <div id="montoSolicitado"><h3>$ 0.00 MXN</h3></div>
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
                                        <div id="montoIntereses"><h3>$ 0.00 MXN</h3></div>
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
                                        <div id="pagoSemanal"><h3>$ 0.00 MXN</h3></div>
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
                                        <div id="montoTotal"><h3>$ 0.00 MXN</h3></div>
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