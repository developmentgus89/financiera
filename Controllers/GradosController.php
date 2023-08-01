<?php
require_once '../Models/Grados.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $grado = new Grados();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $name = $_POST['name'];
            $grado->insertarGrado($name);
            break;
        case 'read':
            // Leer categorias
            $grados = $grado->obtenerGrados();
            echo json_encode($grados);
            break;
        case 'update':
            // Actualizar categoria
            $id = $_POST['id'];
            $name = $_POST['name'];

            $grado->actualizarGrado($name, $id);
            break;
        case 'delete':
            // Eliminar categoria
            $id = $_POST['id'];

            $grado->eliminarGrado($id);
            break;

        case 'row':
            // Eliminar categoria
            $id = $_POST['id'];

            $categoria = $grado->rowGrado($id);
            echo json_encode($categoria);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
