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
                <h1 class="card-title"><strong>Cat&aacute;logo de Clientes.</strong></h1>
                <div class="card-tools float-right m-2">
                    <button id="agregar-cliente" type="button" class="btn btn-primary"><i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Cliente</button>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-3 login-body">
                <table id="tablaClientes" class="table table-hover text-wrap">
                </table>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.container-fluid -->
    <div id="panel" class="panel" style="display: none;">
        <div class="panel-header">
            Detalles del Cliente
            <button id="cerrarPanel" class="btn-close" aria-label="Cerrar"></button>
        </div>
        <div class="panel-body">
            <!-- Aquí puedes agregar los detalles del cliente -->
            <p>Detalles del cliente aquí...</p>
        </div>
    </div>
</div>
<!-- /.content -->
<!-- Modal Agregar -->
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content bg-modalVoucher">
            <div class="modal-header">
                <h4 class="modal-title" id="modalAgregarLabel"><strong>Agregar Nuevo Cliente</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="height: 420px; overflow-y: scroll;">
                <div class="row" style="color:black;">
                    <div class="col-12 col-sm-12">
                        <div class="card card-success card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">
                                            Datos Personales <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">
                                            Solicitud de Cr&eacute;dito <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-cuentasbancarias-tab" data-toggle="pill" href="#custom-tabs-cuentasbancarias" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">
                                            Cuentas Bancarias <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-direccion" data-toggle="pill" href="#direccion" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">
                                            Direcci&oacute;n <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">
                                            Documentaci&oacute;n <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-referidos-tab" data-toggle="pill" href="#custom-tabs-one-referidos" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">
                                            Referido Por ... <span id="tabDatos" style="color: #FC8804"><i class="fas fa-exclamation-triangle"></i></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card card-success">
                                                    <div class="card-header">
                                                        <h3 class="card-title">Datos Personales<small>del cliente.</small></h3>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clinombre">Nombre <span style="color: red">*</span>:</label>
                                                                    <input type="text" class="form-control" name="clinombre" id="clinombre" aria-describedby="hclinombre" placeholder="">
                                                                    <small id="hclinombre" class="form-text">Capture el nombre del cliente</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliapaterno">Apellido Paterno <span style="color: red">*</span>:</label>
                                                                    <input type="text" class="form-control" name="cliapaterno" id="cliapaterno" aria-describedby="hcliapaterno" placeholder="">
                                                                    <small id="hcliapaterno" class="form-text">Capture el apellido paterno del cliente</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliamaterno">Apellido Materno <span style="color: red">*</span>:</label>
                                                                    <input type="text" class="form-control" name="cliamaterno" id="cliamaterno" aria-describedby="hcliamaterno" placeholder="">
                                                                    <small id="hcliamaterno" class="form-text">Capture el Apellido Materno del cliente</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="cliEdad">Edad <span style="color: red">*</span>:</label>
                                                                    <input type="number" step="1" min="18" value="18" class="form-control" name="cliEdad" id="cliEdad" aria-describedby="hcliEdad" placeholder="">
                                                                    <small id="hcliEdad" class="form-text">Cliente debe ser mayor de edad.</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="typeClient">Tipo de cliente <span style="color: red">*</span>:</label>
                                                                    <select class="form-control" name="typeClient" id="typeClient">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clienteStatus">Estatus del Cliente <span style="color: red">*</span>:</label>
                                                                    <select class="form-control" name="clienteStatus" id="clienteStatus">
                                                                        <option value="">SELECCIONE UN ESTATUS</option>
                                                                        <option value="A">ACTIVO</option>
                                                                        <option value="I">INACTIVO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clientDate">Fecha de Nacimiento <span style="color: red">*</span>:</label>
                                                                    <input type="date" class="form-control" name="clientDate" id="clientDate" aria-describedby="hclientDate" placeholder="">
                                                                    <small id="hclientDate" class="form-text">dd/mm/aaaa</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="clientDateRegister">Fecha de Registro <span style="color: red">*</span>:</label>
                                                                    <input type="date" class="form-control" name="clientDateRegister" id="clientDateRegister" aria-describedby="hclientDateRegister" placeholder="">
                                                                    <small id="hclientDateRegister" class="form-text">dd/mm/aaaa</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="ctelefono">Tel&eacute;fono <span style="color: red">*</span>:</label>
                                                                    <input type="number" class="form-control" name="ctelefono" id="ctelefono" aria-describedby="hctelefono">
                                                                    <small id="hctelefono" class="form-text">N&aacute;mero fijo d de celular</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- /.card-body -->
                                                    <div class="card-footer">
                                                        <strong> (<span style="color: red">*</span>) Campos Obligatorios. </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card card-success">
                                                    <div class="card-header">
                                                        <h3 class="card-title">Datos Solicitud de Cr&eacute;dito <small>debe de llenar cada uno de los campos en el formulario.</small></h3>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="imontoprestamo">Monto del Pr&eacute;stamo Solicitado <span style="color: red">*</span>:</label>
                                                                    <input type="text" name="imontoprestamo" id="imontoprestamo" class="form-control" placeholder="" aria-describedby="helpId">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numpagos">Número de Pagos Calculado <span style="color: red">*</span></label>
                                                                    <input type="text" name="numpagos" id="numpagos" class="form-control" placeholder="" aria-describedby="helpId">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="periodicidad">Periodicidad o Frecuecia de Pago <span style="color: red">*</span></label>
                                                                    <select class="form-control" name="periodicidad" id="periodicidad">
                                                                        <option value="7">SEMANAL</option>
                                                                        <option value="15">QUINCENAL</option>
                                                                        <option value="30">MENSUAL</option>
                                                                        <option value="60">BIMESTRAL</option>
                                                                        <option value="90">TRIMESTRAL</option>
                                                                        <option value="120">CUATRIMESTRAL</option>
                                                                        <option value="180">SEMESTRAL</option>
                                                                        <option value="360">ANUAL</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="interesfijo">Interes Fijo</label>
                                                                    <input type="text" name="interesfijo" id="interesfijo" class="form-control" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="dtfechaestliquidacion">Fecha estimada de liquidaci&oacute;n:</label>
                                                                    <input type="date" name="dtfechaestliquidacion" id="dtfechaestliquidacion" class="form-control" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <!-- Widget: user widget style 1 -->
                                                                <div class="card card-widget widget-user fondo_cliente_edit_modal">
                                                                    <!-- Add the bg color to the header using any of the bg-* classes -->
                                                                    <div class="widget-user-header text-white" style="background: url('../utils/img/billCredit.jpg') center center;">
                                                                        <h1 class="widget-user-username text-right"><strong>Cálculos</strong></h1>
                                                                        <h3 class="widget-user-desc text-right"><strong> de la solicitud de credito</strong></h3>
                                                                    </div>
                                                                    <div class="card-footer">
                                                                        <div class="row">
                                                                            <div class="col-sm-4 border-right">
                                                                                <div class="description-block">
                                                                                    <h1 class="description-header" style="font-size: 36px;">3,200</h1>
                                                                                    <span class="description-text" style="font-size: 24px;"><h3>SALES</h3></span>
                                                                                </div>
                                                                                <!-- /.description-block -->
                                                                            </div>
                                                                            <!-- /.col -->
                                                                            <div class="col-sm-4 border-right">
                                                                                <div class="description-block">
                                                                                <h1 class="description-header" style="font-size: 36px;">3,200</h1>
                                                                                    <span class="description-text" style="font-size: 24px;"><h3>SALES</h3></span>
                                                                                </div>
                                                                                <!-- /.description-block -->
                                                                            </div>
                                                                            <!-- /.col -->
                                                                            <div class="col-sm-4">
                                                                                <div class="description-block">
                                                                                <h1 class="description-header" style="font-size: 36px;">3,200</h1>
                                                                                    <span class="description-text" style="font-size: 24px;"><h3>SALES</h3></span>
                                                                                </div>
                                                                                <!-- /.description-block -->
                                                                            </div>
                                                                            <!-- /.col -->
                                                                        </div>
                                                                        <!-- /.row -->
                                                                    </div>
                                                                </div>
                                                                <!-- /.widget-user -->
                                                            </div>
                                                            <!-- /.col -->
                                                        </div>
                                                    </div>
                                                    <!-- /.card-body -->
                                                    <div class="card-footer">
                                                        <strong> (<span style="color: red">*</span>) Campos Obligatorios. </strong>
                                                    </div>
                                                </div>
                                                <!-- /.card -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-cuentasbancarias" role="tabpanel">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card card-success">
                                                    <div class="card-header">
                                                        <h3 class="card-title">Datos para la Captura de Cuentas Bancarias</h3>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="ctabancariacli">Cuenta Bancaria <span style="color: red">*</span>:</label>
                                                                    <input type="text" name="ctabancariacli" id="ctabancariacli" class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="typeAccountBankCli">Tipo de Cuenta Bancaria <span style="color: red">*</span>: </label>
                                                                    <select class="form-control" name="typeAccountBankCli" id="typeAccountBankCli">
                                                                        <option value="">SELECCIONE</option>
                                                                        <option value="1">CLABE</option>
                                                                        <option value="2">TARJETA D&Eacute;BITO</option>
                                                                        <option value="3">CTA BANCARIA</option>
                                                                    </select>
                                                                    <small id="helpId" class="form-text">N&uacute;m. de Cta, CLABE, N&uacute;m. Tarjeta .</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="selCatIcveBancoCli">Institución Bancaria <span style="color: red">*</span>:</label>
                                                                    <select class="form-control" name="selCatIcveBancoCli" id="selCatIcveBancoCli">
                                                                    </select>
                                                                    <small id="helpId" class="form-text">Instituci&oacute;n Bancaria.</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                    </div>
                                                    <!-- /.card-body -->
                                                    <div class="card-footer">
                                                        <strong> (<span style="color: red">*</span>) Campos Obligatorios. </strong>
                                                    </div>
                                                </div>
                                                <!-- /.card -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="direccion" role="tabpanel">
                                        <div class="card card-success">
                                            <div class="card-header">
                                                <h3 class="card-title">Datos de la Dirección y Geolocalizazción</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="ccalle">Calle <span style="color: red">*</span>:</label>
                                                                    <input type="text" class="form-control" name="ccalle" id="ccalle">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numexterior">Número Exterior <span style="color: red">*</span>:</label>
                                                                    <input type="text" class="form-control" name="numexterior" id="numexterior">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="numinterior">Número Interior</label>
                                                                    <input type="text" class="form-control" name="numinterior" id="numinterior">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="pricalle">Primer entre calle</label>
                                                                    <input type="text" class="form-control" name="pricalle" id="pricalle">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="segcalle">Segunda entre calle</label>
                                                                    <input type="text" class="form-control" name="segcalle" id="segcalle">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="cp">Código Postal (CP)<span style="color: red">*</span>: </label>
                                                                    <input type="text" class="form-control" name="cp" id="cp">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="entidaddir">Entidad:</label>
                                                                    <input type="text" class="form-control" name="entidaddir" id="entidaddir" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="municipiodir">Alcaldía o Municipio</label>
                                                                    <input type="text" class="form-control" name="municipiodir" id="municipiodir" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                  <label for="coloniadir">Asentamiento o Colonia</label>
                                                                  <select class="form-control" name="coloniadir" id="coloniadir">
                                                                  </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="latitud">Latitud:</label>
                                                                    <input type="text" class="form-control" name="latitud" id="latitud" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label for="longitud">Longitud</label>
                                                                    <input type="text" class="form-control" name="longitud" id="longitud" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <div id="map" style="width:100%;height:450px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                            <div class="card-footer">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel">
                                        <div class="card card-success">
                                            <div class="card-header">
                                                <h3 class="card-title">Dropzone.js <small><em>jQuery File Upload</em> like look</small></h3>
                                            </div>
                                            <div class="card-body">
                                                <div id="actions" class="row">
                                                    <div class="col-lg-6">
                                                        <div class="btn-group w-100">
                                                            <span class="btn btn-success col fileinput-button">
                                                                <i class="fas fa-plus"></i>
                                                                <span>Agregar Archivos</span>
                                                            </span>
                                                            <button type="submit" class="btn btn-primary col start">
                                                                <i class="fas fa-upload"></i>
                                                                <span>Cargar Archivos</span>
                                                            </button>
                                                            <button type="reset" class="btn btn-warning col cancel">
                                                                <i class="fas fa-times-circle"></i>
                                                                <span>Cancelar Archivos</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 d-flex align-items-center">
                                                        <div class="fileupload-process w-100">
                                                            <div id="total-progress" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                                                <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="table table-striped files" id="previews">
                                                    <div id="template" class="row mt-2">
                                                        <div class="col-auto">
                                                            <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                                                        </div>
                                                        <div class="col d-flex align-items-center">
                                                            <p class="mb-0">
                                                                <span class="lead" data-dz-name></span>
                                                                (<span data-dz-size></span>)
                                                            </p>
                                                            <strong class="error text-danger" data-dz-errormessage></strong>
                                                        </div>
                                                        <div class="col-4 d-flex align-items-center">
                                                            <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                                                <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto d-flex align-items-center">
                                                            <div class="btn-group">
                                                                <button class="btn btn-primary start">
                                                                    <i class="fas fa-upload"></i>
                                                                    <span>Iniciar</span>
                                                                </button>
                                                                <button data-dz-remove class="btn btn-warning cancel">
                                                                    <i class="fas fa-times-circle"></i>
                                                                    <span>Cancelar</span>
                                                                </button>
                                                                <button data-dz-remove class="btn btn-danger delete">
                                                                    <i class="fas fa-trash"></i>
                                                                    <span>Eliminar</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                            <div class="card-footer">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-referidos" role="tabpanel">
                                        <div class="card card-success">
                                            <div class="card-header">
                                                <h3 class="card-title">Referido</h3>
                                            </div>
                                            <div class="card-body">
                                                Aqui irian los referidos o la persona que recomendo
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">Nombre</label>
                                                            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                                                            <small id="helpId" class="form-text text-muted">Help text</small>
                                                        </div>

                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="">Telefono</label>
                                                            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                                                            <small id="helpId" class="form-text text-muted">Help text</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">

                                                    <div class="col-md-2">

                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <label for="">Notas y/o observaciones:</label>
                                                            <textarea class="form-control" name="" id="" rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">

                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                            <div class="card-footer">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn bg-gradient-success" id="btnInsertarCliente">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarLabel">Editar Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="udp-idcustomer" id="udp-idcustomer" hidden>
                <label for="">Grado: </label>
                <select class="form-control" name="udp-icvegrado" id="udp-icvegrado">
                </select>
                <label for="udp-namecustomer">Nombre</label>
                <input type="text" class="form-control" name="udp-namecustomer" id="udp-namecustomer" placeholder="Nombre del Cliente">
                <label for="udp-addresscustomer">Direcci&oacute;n</label>
                <input type="text" class="form-control" name="udp-addresscustomer" id="udp-addresscustomer" placeholder="Direcci&oacute;n del Cliente">
                <label for="udp-mobilecustomer">Tel&eacute;fono</label>
                <input type="text" class="form-control" name="udp-mobilecustomer" id="udp-mobilecustomer" placeholder="Tel&eacute;fono del Cliente">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnActualizarCliente">Actualizar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalBorrarCliente">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header">
                <h4 class="modal-title">Borrar Registros</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Desea eliminar el Cliente
                <div class="form-group">
                    <label for="deleteCliente">Id del Cliente:</label>
                    <input type="text" class="form-control" name="deleteCliente" id="deleteCliente" readonly>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-warning" id="btnEliminarCliente">Eliminar</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->



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
<?php
require_once('../utils/settings/config.financiera.php');
?>
<script src="../assets/Modules/Clients/GoogleMaps/maps.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo GOOGLE_MAPS_API_KEY; ?>&callback=initMap" async defer></script>
<script src="../assets/Modules/Clients/DropFile/dropfilezone.js"></script>
<script type="module" src="../assets/customer.js"></script>
<script src="../assets/conf.js"></script>