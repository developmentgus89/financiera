<?php
require_once 'Conexion.php';
require_once 'Category.php';

class Brands extends Category{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarMarca($category, $nameMarca) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO ims_brand ( categoryid, bname, status) VALUES (?, ?, 'active')";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$category, $nameMarca]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la marca: ' . $e->getMessage();
        }
    }

    public function eliminarMarca($idMarca) {
        try {
            $query = "DELETE FROM ims_brand WHERE id = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idMarca]);

            echo 'Marca eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la marca: ' . $e->getMessage();
        }
    }

    public function actualizarMarca($id, $idCategoriaMarca, $name) {
        try {
            
            $query = "UPDATE ims_brand SET categoryid = ?, bname = ? WHERE id = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idCategoriaMarca, $name, $id]);

            echo 'Marca actualizada correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la marca: ' . $e->getMessage();
        }
    }

    public function existeMarca($bname){
        try {
            //code...
            $bname = '%'.$bname.'%';
            $query = 'SELECT count(0) AS rowmarca FROM ims_brand where bname like "'.$bname.'"';
            echo $query;
            $statement = $this->acceso->prepare($query);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            //throw $th;
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function obtenerMarcas() {
        try {
            $query = "SELECT marca.id, categoria.name, marca.bname, marca.status FROM ims_brand as marca
            inner join ims_category as categoria on marca.categoryid = categoria.categoryid";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowMarca($idMarca){
        try {
            $query = "SELECT marca.id, categoria.categoryid, categoria.name, marca.bname, marca.status FROM ims_brand as marca
            inner join ims_category as categoria on marca.categoryid = categoria.categoryid WHERE marca.id = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idMarca]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }


}
?>
