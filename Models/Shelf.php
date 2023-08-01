<?php
require_once 'Conexion.php';

class Shelf {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarAnaquel($numeroanaquel, $numestanteanaquel, $numrejillaanaquel, $disponible) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO cat_anaqueles (inumeroanaquel, cestante, crejilla,  bocupado) VALUES (?, ?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$numeroanaquel, $numestanteanaquel, $numrejillaanaquel, $disponible]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la Anaquel : ' . $e->getMessage();
        }
    }

    public function eliminarAnaquel($icveanaquel) {
        try {
            $query = "DELETE FROM cat_anaqueles WHERE icveanaqueles = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveanaquel]);

            echo 'Anaquel  eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la Anaquel : ' . $e->getMessage();
        }
    }

    public function actualizarAnaquel($udpnumeroanaquel, $udpnumestanteanaquel, $udpnumrejillaanaquel, $udpdisponible, $udpicveanaquel) {
        try {
            
            $query = "UPDATE cat_anaqueles SET inumeroanaquel = ?, cestante = ?, crejilla = ?, bocupado = ? WHERE icveanaqueles = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$udpnumeroanaquel, $udpnumestanteanaquel, $udpnumrejillaanaquel, $udpdisponible, $udpicveanaquel]);

            echo 'Anaquel  actualizada correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la Anaquel de Meedida: ' . $e->getMessage();
        }
    }

    public function obtenerAnaqueles() {
        try {
            $query = "SELECT * FROM cat_anaqueles";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowAnaquel($icveanaquel){
        try {
            $query = "SELECT * FROM cat_anaqueles WHERE icveanaqueles = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveanaquel]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }
}
?>
