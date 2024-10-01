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
					<h3>
						<div id="totalClientes"></div>
					</h3>
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
					<h3>
						<div id="totalInversionistas"></div>
					</h3>

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
		<div class="col-12">
			<div class="card card-info">
				<div class="card-header">
					<h1 class="card-title"><strong>Cat&aacute;logo de Carteras.</strong></h1>
					<div class="card-tools">
						<button type="button" class="btn btn-tool" data-card-widget="collapse">
							<i class="fas fa-minus"></i>
						</button>
					</div>
				</div>
				<!-- /.card-header -->
				<div class="card-body table-responsive p-3 fondo-graficas">
					<div class="row">
						<div class="col-3">
							<table id="tableWallets" class="table table-hover text-wrap">
							</table>
						</div>
						<div class="col-5">
							<div class="chart">
								<canvas id="walletChart" style="min-height: 350px; height: 250px; max-height: 350px; max-width: 200%;">
								</canvas>
							</div>
						</div>
						<div class="col-4">
							<div class="chart" style="color:#FFF !important;">
								<canvas id="walletChartBarras" style="min-height: 350px; height: 250px; max-height: 350px; max-width: 200%;">
								</canvas>
							</div>
						</div>
					</div>
				</div>
				<!-- /.card-body -->
			</div>
			<!-- /.card -->
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
<script src="../utils/plugins/chart.js/Chart.min.js"></script>
<script src="../assets/mainDashboard.js"></script>