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
        <div class="col-md-12">
            <div class="card card-info">
                <div class="card-header">
                    <h2 class="col-6 card-title"><strong>Control de Estad&iacute;sticas.</strong></h2>
                    <div class="col-2 card-title">

                    </div>
                    <div class="col-2 card-title">

                    </div>
                    <div class="col-2 card-title">

                    </div>

                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>
                                        <div id="totalInvestors"></div>
                                    </h3>

                                    <p>Total Inversionistas</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-id-card"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>
                                        <div id="totalInvestorsCapital"></div>
                                    </h3>

                                    <p>Total Capital</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card card-success">
            <div class="card-header">
                <div class="row">
                    <h2 class="col-6"><strong>Cat&aacute;logo de Inversionistas</strong></h2>
                    <div class="col-2">

                    </div>
                    <div class="col-2 mt-2">
                        <button type="button" class="btn btn-block bg-gradient-info btn-sm" id="agregar-inversionista">
                            <i class="nav-icon fas fa-plus-square"></i> &nbsp; Agregar Inversionista.
                        </button>
                    </div>
                    <div class="col-2">

                    </div>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body fondo-tabs">
                <table id="tableInvestors" class="table table-bordered">
                </table>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
</div>

<!-- /.container-fluid -->
</div>
<!-- /.content -->
<!-- Modal Agregar -->
<div class="modal fade" id="modalAgregar" tabindex="-1" role="dialog" aria-labelledby="modalAgregarLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content fondo-modal-add-inv">
            <div class="modal-header">
                <h4 class="modal-title" id="modalAgregarLabel"><strong>Agregar Nuevo Inversionista.</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invnombre">Nombre:</label>
                            <input type="text" class="form-control" name="invnombre" id="invnombre" aria-describedby="hclinombre" placeholder="">
                            <small id="hclinombre" class="form-text">Capture el nombre del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invapaterno">Apellido Paterno:</label>
                            <input type="text" class="form-control" name="invapaterno" id="invapaterno" aria-describedby="hcliapaterno" placeholder="">
                            <small id="hcliapaterno" class="form-text">Capture el apellido paterno del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invamaterno">Apellido Materno:</label>
                            <input type="text" class="form-control" name="invamaterno" id="invamaterno" aria-describedby="hcliamaterno" placeholder="">
                            <small id="hcliamaterno" class="form-text">Capture el Apellido Materno del Inversionista</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="invedad">Edad:</label>
                            <input type="number" step="1" min="18" value="18" class="form-control" name="invedad" id="invedad" aria-describedby="hinvedad" placeholder="">
                            <small id="hinvedad" class="form-text">Edad del inversionista.</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="invtelefono">Tel&eacute;fono:</label>
                                <input type="number" class="form-control" name="invtelefono" id="invtelefono" aria-describedby="hinvtelefono" placeholder="">
                                <small id="hinvtelefono" class="form-text">Cliente debe ser mayor de edad.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="invinteres">Inter&eacute;s Mensual:</label>
                            <select class="form-control" name="invinteres" id="invinteres">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="invcantinvertida">Cantidad Invertida:</label>
                            <input type="text" class="form-control" name="invcantinvertida" id="invcantinvertida" aria-describedby="hinvcantinvertida" placeholder="">
                            <small id="hinvcantinvertida" class="form-text">Capital inicial de inversi&oacute;n</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="invtipocuenta">Tipo de Cuenta:</label>
                                <select class="form-control" name="invtipocuenta" id="invtipocuenta">
                                    <option value="">SELECCIONE</option>
                                    <option value="1">CLABE</option>
                                    <option value="2">TARJETA D&Eacute;BITO</option>
                                    <option value="3">CTA BANCARIA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invinstbancaria">Instituci&oacute;n Bancaria:</label>
                            <select class="form-control" name="invinstbancaria" id="invinstbancaria">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invctabancaria">Cuenta Bancaria:</label>
                            <input type="text" class="form-control" name="invctabancaria" id="invctabancaria" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hinvclabe" class="form-text">Cuenta de dep&oacute;sito Bancaria (CLABE, Débito. Cuenta)</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invemail">E-Mail:</label>
                            <input type="email" class="form-control" name="invemail" id="invemail" aria-describedby="hinvemail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                            <small id="hinvemail" class="form-text">Correo electr&oacute;nico de contacto</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invDate">Fecha de Registro:</label>
                            <input type="date" class="form-control" name="invDateRegister" id="invDateRegister" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hclientDateRegister" class="form-text">dd/mm/aaaa</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn bg-gradient-success" id="btnInsertInvestor">Agregar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditarLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content fondo-modal-add-inv">
            <div class="modal-header">
                <h3 class="modal-title" id="modalEditarLabel">Editar Inversionista y Consulta de Capital</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <input type="text" class="form-control" name="udp-idcveinvestor" id="udp-idcveinvestor" hidden>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="udp-invnombre">Nombre:</label>
                            <input type="text" class="form-control" name="udp-invnombre" id="udp-invnombre" aria-describedby="hclinombre" placeholder="">
                            <small id="hclinombre" class="form-text">Capture el nombre del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="udp-invapaterno">Apellido Paterno:</label>
                            <input type="text" class="form-control" name="udp-invapaterno" id="udp-invapaterno" aria-describedby="hcliapaterno" placeholder="">
                            <small id="hcliapaterno" class="form-text">Capture el apellido paterno del Inversionista</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="udp-invamaterno">Apellido Materno:</label>
                            <input type="text" class="form-control" name="udp-invamaterno" id="udp-invamaterno" aria-describedby="hcliamaterno" placeholder="">
                            <small id="hcliamaterno" class="form-text">Capture el Apellido Materno del Inversionista</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="udp-invedad">Edad:</label>
                            <input type="number" step="1" min="18" value="18" class="form-control" name="udp-invedad" id="udp-invedad" aria-describedby="hinvedad" placeholder="">
                            <small id="hinvedad" class="form-text">Edad del inversionista.</small>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="udp-invtelefono">Tel&eacute;fono:</label>
                                <input type="number" class="form-control" name="udp-invtelefono" id="udp-invtelefono" aria-describedby="hinvtelefono" placeholder="">
                                <small id="hinvtelefono" class="form-text">Cliente debe ser mayor de edad.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="udp-invcantinvertida">Cantidad Invertida:</label>
                            <input type="text" class="form-control" name="udp-invcantinvertida" id="udp-invcantinvertida" aria-describedby="hinvcantinvertida" placeholder="" readonly>
                            <small id="hinvcantinvertida" class="form-text">Capital inicial de inversi&oacute;n</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="invtipocuenta">Tipo de Cuenta:</label>
                                <select class="form-control" name="udp-invtipocuenta" id="udp-invtipocuenta">
                                    <option value="">SELECCIONE</option>
                                    <option value="1">CLABE</option>
                                    <option value="2">TARJETA D&Eacute;BITO</option>
                                    <option value="3">CTA BANCARIA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invinstbancaria">Instituci&oacute;n Bancaria:</label>
                            <select class="form-control" name="udp-invinstbancaria" id="udp-invinstbancaria">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="invctabancaria">Cuenta Bancaria:</label>
                            <input type="text" class="form-control" name="udp-invctabancaria" id="udp-invctabancaria" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hinvclabe" class="form-text">Cuenta de dep&oacute;sito Bancaria (CLABE, Débito. Cuenta)</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="udp-invemail">E-Mail:</label>
                            <input type="email" class="form-control" name="udp-invemail" id="udp-invemail" aria-describedby="hinvemail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                            <small id="hinvemail" class="form-text">Correo electr&oacute;nico de contacto</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="udp-invDateRegister">Fecha de Registro:</label>
                            <input type="date" class="form-control" name="udp-invDateRegister" id="udp-invDateRegister" aria-describedby="hclientDateRegister" placeholder="">
                            <small id="hclientDateRegister" class="form-text">dd/mm/aaaa</small>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        <h2>TOTAL INVERTIDO</h2>
                                    </th>
                                    <th>
                                        <h2>TOTAL PAGADO CAPITAL</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="cantTotalInvertida"></div>
                                    </td>
                                    <td>
                                        <div id="cantPagCapital"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" id="btnUpdateInvestor">Actualizar</button>
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

<div class="modal fade" id="m-danger-msj">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header">
                <h4 class="modal-title">Cuidado.</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" name="go-icveinvestor" id="go-icveinvestor" hidden>
                <p>Este inversionista ya existe en su base de datos.</p>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal" id="btnRegresaModal">Cerrar</button>
                <button type="button" class="btn btn-outline-light" id="btnIrAInv">Ir a Inversionista</button>
            </div>
        </div>
        <!-- /.modal-content -->
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
<script src="../utils/js/libs/crypto.js"></script>
<script type="module" src="../assets/conf.js"></script>
<script src="../assets/investorsDetails.js"></script>
<script src="../assets/investors.js"></script>