<?php
require_once '../Models/Customer.php';
require_once '../Models/Grados.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $customer = new Customer();
    $grados   = new Grados();

    switch ($operation) {
        case 'create':
            // Crear cliente
            $grado = $_POST['grado'];
            $name = $_POST['name'];
            $address = $_POST['address'];
            $mobile = $_POST['mobile'];

            $customer->insertarCliente($grado, $name, $address, $mobile);
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

            $customer->actualizarCliente($id, $icvegrado, $name, $address, $mobile);
            break;
        case 'delete':
            // Eliminar cliente
            $id = $_POST['id'];

            $customer->eliminarCliente($id);
            break;

        case 'row':
            // Eliminar cliente
            $id = $_POST['id'];

            $cliente = $customer->rowCustomer($id);
            echo json_encode($cliente);
            break;
        case 'createselect':
            // Leer marcas
            $catGrados = $grados->obtenerGrados();
            echo json_encode($catGrados);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
