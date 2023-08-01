<?php
require_once '../Models/Orden.php';
require_once '../Models/Products.php';
require_once '../Models/Customer.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $orden = new Orden();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $pid = $_POST['pid'];
            $cantidad = $_POST['cantidad'];
            $icveproveedor = $_POST['icveproveedor'];
            
            $stock = $orden->get_stockProduct($pid);
            $cantidadActual = $stock[0]['quantity'];
            if($cantidad > $cantidadActual){
                $res['msj'] = false;
            }else{

                $cantidadTotal = $cantidadActual - $cantidad;
                $orden->set_updateStock($pid, $cantidadTotal);
                $orden->insertarSalida($pid, $cantidad, $icveproveedor);
                $res['msj'] = true;
            }
            

            echo json_encode( $res);

            break;
        case 'read':
            // Leer categorias
            $salidas = $orden->get_salidas();
            echo json_encode($salidas);
            break;
        // case 'update':
        //     // Actualizar categoria
        //     $id = $_POST['id'];
        //     $name = $_POST['name'];

        //     $customer->actualizarCategoria($name, $id);
        //     break;
        case 'readproducts':
            // Eliminar categoria
            $products = new Products();
            $listProducts = $products->obtenerProductos();
            echo json_encode($listProducts);
            break;
        case 'readprovider':
            // Eliminar categoria
            $customers = new Customer();
            $elementos = $customers->obtenerClientes();
            echo json_encode($elementos);
            break;
        case 'stock':
            $pid = $_POST['pid'];
            echo $orden->get_stockProduct($pid);
            
        // case 'row':
        //     // Eliminar categoria
        //     $id = $_POST['id'];

        //     $categoria = $customer->rowCategoria($id);
        //     echo json_encode($categoria);
        //     break;
        default:
            echo 'Operación no válida';
            break;
    }
}
?>
