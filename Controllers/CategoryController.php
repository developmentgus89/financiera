<?php
require_once '../Models/Category.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $customer = new Category();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $name = $_POST['name'];
            $customer->insertarCategoria($name);
            break;
        case 'read':
            // Leer categorias
            $categorias = $customer->obtenerCategorias();
            echo json_encode($categorias);
            break;
        case 'update':
            // Actualizar categoria
            $id = $_POST['id'];
            $name = $_POST['name'];

            $customer->actualizarCategoria($name, $id);
            break;
        case 'delete':
            // Eliminar categoria
            $id = $_POST['id'];

            $customer->eliminarCategoria($id);
            break;

        case 'row':
            // Eliminar categoria
            $id = $_POST['id'];

            $categoria = $customer->rowCategoria($id);
            echo json_encode($categoria);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
