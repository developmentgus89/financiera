<?php
require_once 'Conexion.php';

class Category {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarCategoria($nameCategoria) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO ims_category (name, status) VALUES (?, 'active')";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$nameCategoria]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la categoria: ' . $e->getMessage();
        }
    }

    public function eliminarCategoria($idCategoria) {
        try {
            $query = "DELETE FROM ims_category WHERE categoryid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idCategoria]);

            echo 'Categoria eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la categoria: ' . $e->getMessage();
        }
    }

    public function actualizarCategoria($name, $idCategoria) {
        try {
            
            $query = "UPDATE ims_category SET name = ? WHERE categoryid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$name, $idCategoria]);

            echo 'Categoria actualizada correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la categoria: ' . $e->getMessage();
        }
    }

    public function obtenerCategorias() {
        try {
            $query = "SELECT * FROM ims_category";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowCategoria($idCategoria){
        try {
            $query = "SELECT * FROM ims_category WHERE categoryid = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idCategoria]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function categoryDropdownList()
	{
		$query = "SELECT * FROM ims_category WHERE status = 'active' ORDER BY name ASC";
		$statement = $this->acceso->prepare($query);
        $statement->execute();
		$categoryHTML = '';
		while ($category = $statement->fetchAll(PDO::FETCH_ASSOC)) {
			$categoryHTML .= '<option value="' . $category["categoryid"] . '">' . $category["name"] . '</option>';
		}
		return $categoryHTML;
	}
}
?>
