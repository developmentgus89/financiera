<?php
require_once '../Models/Purchase.php';
require_once '../Models/Products.php';
require_once '../Models/Provider.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $purchase = new Purchase();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $pid = $_POST['pid'];
            $cantidad = $_POST['cantidad'];
            $icveproveedor = $_POST['icveproveedor'];
            
            $stock = $purchase->get_stockProduct($pid);
            $cantidadActual = $stock[0]['quantity'];

            $cantidadTotal = $cantidad + $cantidadActual;
            echo "La cantidad es: " . $cantidadTotal;

            $purchase->set_updateStock($pid, $cantidadTotal);
            $purchase->insertarCompra($icveproveedor, $pid, $cantidad);
            break;
        case 'read':
            // Leer categorias
            $compras = $purchase->get_compras();
            echo json_encode($compras);
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
            $providers = new Provider();
            $proveedores = $providers->obtenerProveedores();
            echo json_encode($proveedores);
            break;
        case 'stock':
            $pid = $_POST['pid'];
            echo $purchase->get_stockProduct($pid);
            
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
