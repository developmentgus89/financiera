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
                <div class="card-body table-responsive p-3 bg-info">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="customRange1">Porcentaje de Beneficio Disponible</label>
                                    <input type="range" class="custom-range" id="porcbenefi" min="0" max="100" step="0.5">
                                    <h2><div id="vporcentaje">0.0 %</div></h2>
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
<script src="../assets/mainDashboard.js"></script>