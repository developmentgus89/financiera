<?php
require_once '../Models/Provider.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $customer = new Provider();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $nameProveedor = $_POST['nameProveedor'];
            $telProveedor = $_POST['telProveedor'];
            $direProveedor = $_POST['direProveedor'];
            $customer->insertarProveedor($nameProveedor, $telProveedor, $direProveedor);
            break;
        case 'read':
            // Leer categorias
            $categorias = $customer->obtenerProveedores();
            echo json_encode($categorias);
            break;
        case 'update':
            // Actualizar categoria
            $id            = $_POST['id'];
            $nameProveedor = $_POST['name'];
            $telProveedor  = $_POST['telProveedor'];
            $direProveedor = $_POST['direProveedor'];

            $customer->actualizarProveedor($nameProveedor, $telProveedor, $direProveedor, $id);
            break;
        case 'delete':
            // Eliminar categoria
            $id = $_POST['id'];

            $customer->eliminarProveedor($id);
            break;

        case 'row':
            // Eliminar categoria
            $id = $_POST['id'];

            $categoria = $customer->rowProveedor($id);
            echo json_encode($categoria);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
