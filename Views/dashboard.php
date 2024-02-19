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
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-success">
        <div class="inner">
          <h3>150</h3>
          <p>Clientes</p>
        </div>
        <div class="icon">
          <i class="ion ion-bag"></i>
        </div>
        <a href="CustomerBlade.php" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-info">
        <div class="inner">
          <h3>5</h3>

          <p>Inversionistas</p>
        </div>
        <div class="icon">
          <i class="ion ion-stats-bars"></i>
        </div>
        <a href="InvestorsBlade.php" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
      </div>
    </div>
  </div>
 
  <!-- /.container-fluid -->
</div>
<!-- /.content -->
<?php
include_once "dashboard/endTemplateDashboard.php";
?>

<!-- REQUIRED SCRIPTS -->
<?php
include_once "dashboard/footerDashBoard.php";
?>
<script src="../assets/dashboard.js"></script>