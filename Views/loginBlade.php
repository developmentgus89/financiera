<?php
include_once "Views/headLogin.php";
?>

<body class="hold-transition login-page login-body">
	<div class="login-box">
		<!-- /.login-logo -->
		<div class="card card-outline border-card-login">
			<div class="card-header text-center">
				<div class="h1 text-title-login"><b>Inicio de Sesi&oacute;n</b></div>
			</div>
			<div class="card-body">
				<img class="img-fluid p-2" src="utils/img/FinancieraBanner.png" alt="" >
				<form id="form-login">
					<div class="input-group mb-3">
						<input type="text" class="form-control" placeholder="Usuario" id="username">
						<div class="input-group-append">
							<div class="input-group-text">
								<span class="fa fa-user"></span>
							</div>
						</div>
					</div>
					<div class="input-group mb-3">
						<input type="password" class="form-control" placeholder="Password" id="password">
						<div class="input-group-append">
							<div class="input-group-text">
								<span class="fas fa-lock"></span>
							</div>
						</div>
					</div>
				</form>

				<div class="social-auth-links text-center mt-2 mb-3">
					<button type="button" class="btn btn-block btn-success" id="btnLoginStart">
						Iniciar Sesi&oacute;n
					</button>
					<a href="#" class="btn btn-block btn-danger" id="btnLoginPassword">
						Desbloquear Usuario
					</a>
				</div>
			</div>
			<!-- /.card-body -->
		</div>

		<!-- /.card -->
	</div>
	<!-- /.login-box -->
	
	<?php
	include_once "Views/footerLogin.php";
	?>
	<script src="assets/login.js"></script>