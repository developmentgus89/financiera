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
            // Leer inpuestos
            $impuestos = $taxes->obtenerImpuestos();
            echo json_encode($impuestos);
            break;
        case 'update':
            // Actualizar tasa de interes
            $id                    = $_POST['id'];
            $udpcdescripciontascom = $_POST['udpcdescripciontascom'];
            $udpftasainteresame    = $_POST['udpftasainteresame'];
            $udpcattasacomobs      = $_POST['udpcattasacomobs'];
            $taxes->actualizarTasaInteres($id, $udpcdescripciontascom, $udpftasainteresame, $udpcattasacomobs);
            break;
        case 'delete':
            // Eliminar tasa de interes
            $id = $_POST['id'];
            $taxes->eliminarTasaInteres($id);
            break;

        case 'row':
            // Consultar tasa de interes
            $id = $_POST['id'];
            $tasaInteres = $taxes->rowTaxInteres($id);
            echo json_encode($tasaInteres);
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
