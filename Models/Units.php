<?php
require_once 'Conexion.php';

class Units {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarUnidad($nameunidad, $abreviaunidad) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO cat_unidades_med (cdescripcion, cabrevia) VALUES (?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$nameunidad, $abreviaunidad]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la Unidad de Medida: ' . $e->getMessage();
        }
    }

    public function eliminarUnidad($icveunidad) {
        try {
            $query = "DELETE FROM cat_unidades_med WHERE icveunidad = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveunidad]);

            echo 'Unidad de medida eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la Unidad de Medida: ' . $e->getMessage();
        }
    }

    public function actualizarUnidad($udpnameunidadmedida, $udpabreviaunidadmedida ,$icveunidad) {
        try {
            
            $query = "UPDATE cat_unidades_med SET cdescripcion = ?, cabrevia = ? WHERE icveunidad = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$udpnameunidadmedida, $udpabreviaunidadmedida, $icveunidad]);

            echo 'Unidad de Medida actualizada correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la Unidad de Meedida: ' . $e->getMessage();
        }
    }

    public function obtenerUnidadMedidas() {
        try {
            $query = "SELECT * FROM cat_unidades_med";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowUnidadMedida($icveunidad){
        try {
            $query = "SELECT * FROM cat_unidades_med WHERE icveunidad = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveunidad]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }
}
?>
