<?php
require_once '../Models/Customer.php';
require_once '../Models/CreditsClients.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $customer = new Customer();
    $credits  = new CreditsClients();
    global $clientes;

    switch ($operation) {
        case 'create':
            // Crear cliente
            $cnombre = $_POST['cnombre'];
            $capelpat = $_POST['capelpat'];
            $capelmat = $_POST['capelmat'];
            $ctelefono = $_POST['ctelefono'];
            $cedad = $_POST['cedad'];
            $typeClient = $_POST['typeClient'];
            $cdatebirthday = $_POST['cdatebirthday'];
            $clientDateRegister = $_POST['clientDateRegister'];
            $clienteStatus = $_POST['clienteStatus'];

            $customer->insertarCliente(
                $cnombre,
                $capelpat,
                $capelmat,
                $cedad,
                $typeClient,
                $cdatebirthday,
                $clientDateRegister,
                $clienteStatus,
                $ctelefono
            );
            break;
        case 'read':
            // Leer clientes
            $clientes = $customer->obtenerClientes();
            echo json_encode($clientes);
            break;
        case 'update':
            // Actualizar cliente
            $id        = $_POST['id'];
            $icvegrado = $_POST['icvegrado'];
            $name      = $_POST['name'];
            $address   = $_POST['address'];
            $mobile    = $_POST['mobile'];

            // $customer->actualizarCliente($id, $icvegrado, $name, $address, $mobile);
            break;
        case 'delete':
            // Eliminar cliente
            $id = $_POST['id'];
            // $customer->eliminarCliente($id);
            break;

        case 'row':
            // Eliminar cliente
            $id = $_POST['id'];

            // $cliente = $customer->rowCustomer($id);
            echo json_encode($cliente);
            break;
        case 'readtypesclients':
            // Leer tipos de cliente
            $tiposCliente = $customer->obtenerTiposClientes();
            echo json_encode($tiposCliente);
            break;
        case 'readCreditsByCustomer':
            $icvecliente = $_POST['icvecliente'];
            $rowCredits = $credits->getRowsCreditsByClient($icvecliente);
            echo json_encode($rowCredits);
            break;

        //Obetener las colonias de acuerdo al codigo postal
        case 'readZipCode':
            $zipcode = $_POST['zipcode'];
            $rowsZipCode = $customer->get_AsentamientosByZipCode($zipcode);
            echo json_encode($rowsZipCode);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
