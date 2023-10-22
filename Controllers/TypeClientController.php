<?php
require_once '../Models/TypeClient.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $typeClient = new TypeClient();
    global $typesClients;

    switch ($operation) {
        case 'create':
            // Crear el tipo de cliente
            //* Recordar que esto se basa con la capacidad de pago del cliente
            $typeclientdescripcion = $_POST['typeclientdescripcion'];
            $abreTipoClient = $_POST['abreTipoClient'];
            $typeClientTax = $_POST['typeClientTax'];

            $typeClient->insertarTipoCliente($typeclientdescripcion, $abreTipoClient, $typeClientTax);
            break;
        case 'read':
            // Leer los tipos de cliente
            $tiposClientes = $typeClient->obtenerTipoCliente();
            echo json_encode($tiposClientes);
            break;
        case 'update':
            // Actualizar tasa de interes
            $id                    = $_POST['id'];
            $udpcdescriptipocliente = $_POST['udpcdescriptipocliente'];
            $udpcabreviiatipo    = $_POST['udpcabreviiatipo'];
            $udptasainteres      = $_POST['udptasainteres'];
            $typeClient->actualizarTipoCliente($id, $udpcdescriptipocliente, $udpcabreviiatipo, $udptasainteres);
            break;
        case 'delete':
            // Eliminar tasa de interes
            $id = $_POST['id'];
            $typeClient->eliminarTipoCliente($id);
            break;

        case 'row':
            // Consultar tasa de interes
            $id = $_POST['id'];
            $tipoClienteRow = $typeClient->rowTipoCliente($id);
            echo json_encode($tipoClienteRow);
            break;
        case 'createselect':
            // Leer tasas de interes
            $catTasasInteres = $typeClient->obtenerTaxes();
            echo json_encode($catTasasInteres);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
