<?php
require_once 'Conexion.php';

class Grados {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarGrado($cgradoabrevia) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO cat_grados (cgradoabrevia) VALUES (?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cgradoabrevia]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el grado: ' . $e->getMessage();
        }
    }

    public function eliminarGrado($icvegrado) {
        try {
            $query = "DELETE FROM cat_grados WHERE icvegrado = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvegrado]);

            echo 'Grado eliminado correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar el grado: ' . $e->getMessage();
        }
    }

    public function actualizarGrado($icvegrado, $cgradoabrevia) {
        try {
            
            $query = "UPDATE cat_grados SET cgradoabrevia = ? WHERE icvegrado = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cgradoabrevia, $icvegrado]);

            echo 'Grado actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar el grado: ' . $e->getMessage();
        }
    }

    public function obtenerGrados() {
        try {
            $query = "SELECT * FROM cat_grados";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowGrado($icvegrado){
        try {
            $query = "SELECT * FROM cat_grados WHERE icvegrado = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvegrado]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }
}
?>
