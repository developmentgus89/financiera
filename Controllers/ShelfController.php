<?php
require_once '../Models/Shelf.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $shelfs = new Shelf();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $numeroanaquel     = $_POST['numeroanaquel'];
            $numestanteanaquel = $_POST['numestanteanaquel'];
            $numrejillaanaquel = $_POST['numrejillaanaquel'];
            $check             = $_POST['check']; 
            $shelfs->insertarAnaquel($numeroanaquel, $numestanteanaquel, $numrejillaanaquel, $check);
            break;
        case 'read':
            // Leer categorias
            $categorias = $shelfs->obtenerAnaqueles();
            echo json_encode($categorias);
            break;
        case 'update':
            // Actualizar categoria
            $udpicveanaquel = $_POST['udpicveanaquel'];
            $udpnumeroanaquel = $_POST['udpnumeroanaquel'];
            $udpnumestanteanaquel = $_POST['udpnumestanteanaquel'];
            $udpnumrejillaanaquel = $_POST['udpnumrejillaanaquel'];
            $udpdisponible = $_POST['udpdisponible'];

            $shelfs->actualizarAnaquel($udpnumeroanaquel, $udpnumestanteanaquel, $udpnumrejillaanaquel, $udpdisponible, $udpicveanaquel);
            break;
        case 'delete':
            // Eliminar categoria
            $icveanaquel = $_POST['icveanaquel'];
            $shelfs->eliminarAnaquel($icveanaquel);
            break;

        case 'row':
            // Leer unidad de medida
            $icveanaquel = $_POST['icveanaquel'];
            $anaquel = $shelfs->rowAnaquel($icveanaquel);
            echo json_encode($anaquel);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
