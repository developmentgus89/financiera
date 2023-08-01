<?php
require_once 'Conexion.php';

class Purchase {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarCompra($icveproveedor, $pid, $cantidad) {
        try {
            
            // $stock = $this->get_stockProduct($pid) + $cantidad;

            $query = "INSERT INTO ims_purchase ( supplier_id , product_id, quantity) VALUES (?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveproveedor, $pid, $cantidad]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la categoria: ' . $e->getMessage();
        }
    }

    public function get_stockProduct($pid){
        $query = "SELECT quantity FROM ims_product WHERE pid = ?";
        $statement = $this->acceso->prepare($query);
        $statement->execute([$pid]);
        
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function set_updateStock($pid, $cantidadTotal){
        $query = "UPDATE ims_product SET quantity = ? WHERE pid = ?";
        $statement = $this->acceso->prepare($query);
        $statement->execute([$cantidadTotal, $pid ]);
    }


    public function get_compras(){
        $query = "SELECT compras.purchase_id, proveedor.icveproveedor, proveedor.supplier_name,
                    producto.pid, producto.pname, marca.bname, compras.quantity, compras.purchase_date
                    FROM ims_purchase as compras
                    inner join ims_supplier as proveedor on compras.supplier_id = proveedor.icveproveedor
                    inner join ims_product as producto on compras.product_id = producto.pid
                    inner join ims_brand as marca on producto.brandid = marca.id";
        $statement = $this->acceso->prepare($query);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    //TODO: Determinar con Cabello si se puede eliminar una compra

    // public function eliminarCategoria($idCategoria) {
    //     try {
    //         $query = "DELETE FROM ims_category WHERE categoryid = ?";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$idCategoria]);

    //         echo 'Categoria eliminada correctamente';
    //     } catch (PDOException $e) {
    //         echo 'Error al eliminar la categoria: ' . $e->getMessage();
    //     }
    // }

    //TODO: Del mismo modo si una compra se peude actualizar

    // public function actualizarCategoria($name, $idCategoria) {
    //     try {
            
    //         $query = "UPDATE ims_category SET name = ? WHERE categoryid = ?";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$name, $idCategoria]);

    //         echo 'Categoria actualizada correctamente';
    //     } catch (PDOException $e) {
    //         echo 'Error al actualizar la categoria: ' . $e->getMessage();
    //     }
    // }


}
?>
