<?php
require_once '../Models/Units.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $units = new Units();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $nameunidad = $_POST['nameunidad'];
            $abreviaunidad = $_POST['abreviaunidad'];
            $units->insertarUnidad($nameunidad, $abreviaunidad);
            break;
        case 'read':
            // Leer categorias
            $categorias = $units->obtenerUnidadMedidas();
            echo json_encode($categorias);
            break;
        case 'update':
            // Actualizar categoria
            $icveunidad = $_POST['icveunidad'];
            $udpnameunidadmedida = $_POST['udpnameunidadmedida'];
            $udpabreviaunidadmedida = $_POST['udpabreviaunidadmedida'];

            $units->actualizarUnidad($udpnameunidadmedida, $udpabreviaunidadmedida ,$icveunidad);
            break;
        case 'delete':
            // Eliminar categoria
            $icveunidad = $_POST['icveunidad'];
            $units->eliminarUnidad($icveunidad);
            break;

        case 'row':
            // Leer unidad de medida
            $icveunidad = $_POST['icveunidad'];
            $unidad = $units->rowUnidadMedida($icveunidad);
            echo json_encode($unidad);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
