<?php
require_once '../Models/Taxes.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $taxes = new Taxes();
    global $clientes;

    switch ($operation) {
        case 'create':
            // Crear interes para el cliente del prestamo
            $descripcion = $_POST['descripcion'];
            $pinteres = $_POST['pinteres'];
            $observaciones = $_POST['observaciones'];

            $taxes->insertarInteres($descripcion, $pinteres, $observaciones);
            break;
        case 'read':
            // Leer clientes
            $impuestos = $taxes->obtenerImpuestos();
            echo json_encode($impuestos);
            break;
        case 'update':
            // Actualizar cliente
            $id        = $_POST['id'];
            $icvegrado = $_POST['icvegrado'];
            $name      = $_POST['name'];
            $address   = $_POST['address'];
            $mobile    = $_POST['mobile'];

            // $taxes->actualizarCliente($id, $icvegrado, $name, $address, $mobile);
            break;
        case 'delete':
            // Eliminar cliente
            $id = $_POST['id'];

            // $taxes->eliminarCliente($id);
            break;

        case 'row':
            // Eliminar cliente
            $id = $_POST['id'];

            // $cliente = $taxes->rowCustomer($id);
            echo json_encode($cliente);
            break;
        // case 'createselect':
        //     // Leer marcas
        //     $catGrados = $grados->obtenerGrados();
        //     echo json_encode($catGrados);
        //     break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
