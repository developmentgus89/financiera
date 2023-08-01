<?php
require_once '../Models/Brands.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $brands = new Brands();

    switch ($operation) {
        case 'create':
            // Crear marca
            $name     = $_POST['name'];
            $category = $_POST['category'];
            $row = $brands->existeMarca($name);
            $existe = $row[0]['rowmarca'];
            
            if( $existe > 0) {
                echo true;
            }else {
                echo false;
                $brands->insertarMarca($category, $name);
            }

            echo json_encode($res);
            break;
        case 'read':
            // Leer marcas
            $marcas = $brands->obtenerMarcas();
            echo json_encode($marcas);
            break;
        case 'update':
            // Actualizar marca
            $id               = $_POST['id'];
            $idCategoriaMarca = $_POST['idcategoriamarca'];
            $name             = $_POST['name'];

            $brands->actualizarMarca($id, $idCategoriaMarca, $name);
            break;
        case 'delete':
            // Eliminar marca
            $id = $_POST['id'];

            $brands->eliminarMarca($id);
            break;

        case 'row':
            // Eliminar marca
            $id = $_POST['id'];

            $marca = $brands->rowMarca($id);
            echo json_encode($marca);
            break;
        case 'createselect':
            // Leer marcas
            $marcasCategorias = $brands->obtenerCategorias();
            echo json_encode($marcasCategorias);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
