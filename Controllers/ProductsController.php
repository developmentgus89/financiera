<?php
require_once '../Models/Products.php';
require_once '../Models/Brands.php';
require_once '../Models/Provider.php';
require_once '../Models/Units.php';
require_once '../Models/Shelf.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $products = new Products();

    switch ($operation) {
        case 'create':
            // Crear categoria
            $proname         = $_POST['proname'];              
            $promarca        = $_POST['promarca'];                   
            $proproveedor    = $_POST['proproveedor'];        
            $prodescripcion  = $_POST['prodescripcion'];  
            $proubicacion    = $_POST['proubicacion'];   
            $promodelo       = $_POST['promodelo'];   
            $prostock        = $_POST['prostock'];     
            $prounidadmedida = $_POST['prounidadmedida'];
            $prominorden     = $_POST['prominorden'];
            $prostatus       = $_POST['prostatus'];  
            $profechaalta    = $_POST['profechaalta']; 

            $products->insertarProducto(
                $promarca,                      
                $proname,                 
                $promodelo,       
                $prodescripcion,    
                $prostock,        
                $prounidadmedida, 
                $prominorden,  
                $proproveedor,          
                $prostatus,    
                $profechaalta, 
                $proubicacion     
            );
            break;
        case 'read':
            // Leer categorias
            $listproducts = $products->obtenerProductos();
            echo json_encode($listproducts);
            break;
        case 'update':
            
            $brandid       = $_POST['udpMarcaProducto'];
            $pname         = $_POST['udpNameProducto'];
            $model         = $_POST['udpModeloProducto'];
            $description   = $_POST['udpDescripcionProducto'];
            $quantity      = $_POST['udpStockProducto'];
            $unit          = $_POST['udpUnidadMediadProducto'];
            // $base_price    = $_POST['udpCostoProducto'];
            // $tax           = $_POST['udpImpuestoProducto'];
            $minimum_order = $_POST['udpMinOrdenProducto'];
            $supplier      = $_POST['udpProveedorProducto'];
            $status        = $_POST['udpStatusProducto'];
            $date          = $_POST['udpFecahAltaProducto'];
            $ubicacion     = $_POST['udpUbicacionProducto'];
            $pid           = $_POST['pid']; 
            

            $products->actualizarProducto($brandid, $pname, $model, $description, $quantity, $unit,
                                         $minimum_order, $supplier, $status, $date, $ubicacion, $pid);
            break;
        case 'delete':
            // Eliminar categoria
            $id = $_POST['id'];

            $products->eliminarProducto($id);
            
            break;

        case 'row':
            // Eliminar categoria
            $pid = $_POST['pid'];
            $producto = $products->rowProducto($pid);
            echo json_encode($producto);
            break;
        case 'readbrands':
            // Eliminar categoria
            $brands = new Brands();
            $marcas = $brands->obtenerMarcas();
            echo json_encode($marcas);
            break;
        case 'readprovider':
            // Eliminar categoria
            $providers = new Provider();
            $proveedores = $providers->obtenerProveedores();
            echo json_encode($proveedores);
            break;
        case 'readunits':
            // Eliminar categoria
            $units = new Units();
            $unidades = $units->obtenerUnidadMedidas();
            echo json_encode($unidades);
            break;
        case 'readubication':
            // Eliminar categoria
            $shelfs = new Shelf();
            $ubicaciones = $shelfs->obtenerAnaqueles();
            echo json_encode($ubicaciones);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
