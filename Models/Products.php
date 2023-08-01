<?php
require_once 'Conexion.php';

class Products{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarProducto(
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
    ) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO ims_product ( brandid, pname, model, description, quantity, 
                                    unit, minimum_order, supplier, status, date, ubicacion) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
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
            ]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la producto: ' . $e->getMessage();
        }
    }

    public function eliminarProducto($idProducto) {
        try {
            $query = "DELETE FROM ims_product WHERE pid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idProducto]);

            // echo 'Producto eliminada correctamente';
            $res['msj'] = 'SUCCESS';
            echo json_encode($res);
        } catch (PDOException $e) {
            // echo 'Error al eliminar la producto: ' . $e->getMessage();
            $res['msj'] = 'ERROR';
            echo json_encode($res);
        }
    }

    public function actualizarProducto($brandid, $pname, $model, $description, $quantity, $unit, 
                                 $minimum_order, $supplier, $status, $date, $ubicacion, $pid) {
        try {
            
            $query = "UPDATE ims_product SET brandid = ?, pname = ?, model = ?, description = ?,
                            quantity = ?, unit = ?,  minimum_order = ?, supplier = ?, status = ?, 
                            date = ?, ubicacion = ?  WHERE pid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$brandid, $pname, $model, $description, $quantity, $unit, 
                             $minimum_order, $supplier, $status, $date, $ubicacion, $pid]);

            echo 'Producto actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la producto: ' . $e->getMessage();
        }
    }

    public function obtenerProductos() {
        try {
            $query = "SELECT productos.pid, categoria.categoryid, categoria.name,
                        marca.id, marca.bname, productos.pname, productos.description,
                        productos.quantity, productos.unit, productos.base_price,
                        productos.tax, productos.minimum_order, proveedor.icveproveedor,
                        proveedor.supplier_name, productos.status, productos.date  
                        FROM ims_product as productos
                        inner join ims_brand as marca on productos.brandid = marca.id
                        inner join ims_category as categoria on marca.categoryid = categoria.categoryid
                        inner join ims_supplier as proveedor on productos.supplier = proveedor.icveproveedor";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowProducto($idProducto){
        try {
            $query = "SELECT productos.pid, categoria.categoryid, categoria.name,
            marca.id, marca.bname, productos.pname, productos.description,
            unidad.icveunidad, unidad.cdescripcion, productos.model,
            productos.quantity, productos.unit as cveumedida, productos.base_price,
            productos.tax, productos.minimum_order, proveedor.icveproveedor,
            proveedor.supplier_name, productos.status, productos.date, anaquel.icveanaqueles,
            anaquel.inumeroanaquel, anaquel.cestante, anaquel.crejilla, anaquel.bocupado   
            FROM ims_product as productos
            inner join ims_brand as marca on productos.brandid = marca.id
            inner join ims_category as categoria on marca.categoryid = categoria.categoryid
            inner join ims_supplier as proveedor on productos.supplier = proveedor.icveproveedor
            inner join cat_unidades_med as unidad on productos.unit = unidad.icveunidad
            inner join cat_anaqueles as anaquel on productos.ubicacion = anaquel.icveanaqueles WHERE productos.pid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idProducto]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    //Este es un query para obtener los resultados del invenario
    public function obtenerInventario(){
        try {
                $query = "SELECT 
                productos.pid, 
                categoria.categoryid, 
                categoria.name AS category_name,
                marca.id AS brand_id, 
                marca.bname AS brand_name, 
                productos.pname,
                productos.model,
                productos.description,
                productos.quantity, 
                productos.unit, 
                productos.base_price,
                productos.tax, 
                productos.minimum_order, 
                proveedor.icveproveedor, 
                proveedor.supplier_name, 
                productos.status, 
                productos.date,
                ubicacion.icveanaqueles, 
                ubicacion.inumeroanaquel,
                ubicacion.cestante, 
                ubicacion.crejilla,
                unidad.cabrevia,
                COALESCE(salidas.total_salidas, 0) AS total_salidas,
                COALESCE(entradas.total_entradas, 0) AS total_entradas
            FROM ims_product AS productos
                INNER JOIN ims_brand AS marca ON productos.brandid = marca.id
                INNER JOIN ims_category AS categoria ON marca.categoryid = categoria.categoryid
                INNER JOIN ims_supplier AS proveedor ON productos.supplier = proveedor.icveproveedor
                INNER JOIN cat_anaqueles AS ubicacion ON productos.ubicacion = ubicacion.icveanaqueles
                INNER JOIN cat_unidades_med AS unidad on productos.unit = unidad.icveunidad
                LEFT JOIN (
                    SELECT product_id, COUNT(*) AS total_salidas
                    FROM ims_order
                    GROUP BY product_id
                ) AS salidas ON productos.pid = salidas.product_id
                LEFT JOIN (
                    SELECT product_id, COUNT(*) AS total_entradas
                    FROM ims_purchase
                    GROUP BY product_id
                ) AS entradas ON productos.pid = entradas.product_id";
            $statement = $this->acceso->prepare($query);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta para generar el invenario: ' . $e->getMessage();
        }
    }


}
?>
