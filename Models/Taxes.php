<?php
require_once 'Conexion.php';

class Taxes{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarInteres( $descripcion, $pinteres, $observaciones) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO cattasascomisiones ( cdescripciontascom, ftasainteres, cattasacomobs) VALUES (?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$descripcion, $pinteres, $observaciones]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el cliente: ' . $e->getMessage();
        }
    }

    public function eliminarTasaInteres($id) {
        try {
            $query = "DELETE FROM cattasascomisiones WHERE icvetasascomisiones = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);

            echo 'Tasa de interes eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la tasa de interes: ' . $e->getMessage();
        }
    }

    public function actualizarTasaInteres($id, $udpcdescripciontascom, $udpftasainteresame, $udpcattasacomobs) {
        try {
            
            $query = "UPDATE cattasascomisiones SET cdescripciontascom = ?, ftasainteres = ?, cattasacomobs = ? WHERE icvetasascomisiones = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$udpcdescripciontascom, $udpftasainteresame, $udpcattasacomobs, $id]);

            echo 'Tasa de interes actualizada correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la tasa de interes: ' . $e->getMessage();
        }
    }

    public function obtenerImpuestos() {
        try {
            $query = "SELECT * FROM cattasascomisiones";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    
    public function rowTaxInteres($id){
        try {
            $query = "SELECT * FROM cattasascomisiones WHERE icvetasascomisiones = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta del impuesto' . $e->getMessage();
        }
    }

    // public function rowCustomer($id){
    //     try {
    //         $query = "SELECT elemento.id, grado.cgradoabrevia, grado.icvegrado, elemento.name, elemento.address, elemento.mobile 
    //         FROM ims_customer as elemento
    //         inner join cat_grados as grado on elemento.icvegrado = grado.icvegrado
    //         WHERE id = ?";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$id]);

    //         return $statement->fetchAll(PDO::FETCH_ASSOC);
    //     } catch (PDOException $e) {
    //         echo 'Error en la consulta: ' . $e->getMessage();
    //     }
    // }
}
?>
