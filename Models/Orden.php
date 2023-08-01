<?php
require_once 'Conexion.php';

class Orden {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarSalida( $pid, $icveproveedor, $cantidad) {
        try {
            
            // $stock = $this->get_stockProduct($pid) + $cantidad;

            $query = "INSERT INTO ims_order ( product_id , total_shipped, customer_id) VALUES (?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$pid, $icveproveedor, $cantidad]);

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


    public function get_salidas(){
        $query = "SELECT salidas.order_id,  producto.pid, producto.pname, 
		            marca.bname, salidas.total_shipped, salidas.order_date
                    FROM ims_order as salidas
                    inner join ims_product as producto on salidas.product_id = producto.pid
                    inner join ims_brand as marca on producto.brandid = marca.id";
        $statement = $this->acceso->prepare($query);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    //TODO: Determinar con Cabello si se puede eliminar una salida

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

    //TODO: Del mismo modo si una salida se peude actualizar

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
