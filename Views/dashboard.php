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
		<div class="col-3">
			<!-- small box -->
			<div class="small-box bg-success">
				<div class="inner">
					<h3><div id="totalClientes"></div></h3>
					<h5>Clientes</h5>
				</div>
				<div class="icon">
					<i class="ion ion-bag"></i>
				</div>
				<a href="CustomerBlade.php" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
			</div>
		</div>
		<div class="col-3">
			<!-- small box -->
			<div class="small-box bg-info">
				<div class="inner">
					<h3><div id="totalInversionistas"></div></h3>

					<h5>Inversionistas</h5>
				</div>
				<div class="icon">
					<i class="ion ion-stats-bars"></i>
				</div>
				<a href="InvestorsBlade.php" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
			</div>
		</div>
		<div class="col-3">
			<!-- small box -->
			<div class="small-box bg-warning">
				<div class="inner">
					<h3><i class="fas fa-money-bill-alt"></i></h3>

					<h5>C&aacute;lculo R&aacute;pido de un Pr&eacute;stamo</h5>
				</div>
				<div class="icon">
					<i class="ion ion-stats-bars"></i>
				</div>
				<a href="QuickCalcBlade.php" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
			</div>
		</div>
		<div class="col-3">
			<!-- small box -->
			<div class="small-box bg-financiera-danger">
				<div class="inner">
					<h3>5</h3>

					<h5>Adeudos de Clientes por Vencer</h5>
				</div>
				<div class="icon">
					<i class="ion ion-stats-bars"></i>
				</div>
				<a href="#" class="small-box-footer">M&aacute;s Informaci&oacute;n <i class="fas fa-arrow-circle-right"></i></a>
			</div>
		</div>
	</div>
	<div class="row">
		
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
<script src="../assets/mainDashboard.js"></script>
<script src="../assets/wsListenner.js" defer></script>