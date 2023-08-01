<?php
require_once 'Conexion.php';

class Provider {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarProveedor($nameProveedor, $telProveedor, $direProveedor) {
        try {
            // $conexion = $this->conexion->obtenerConexion();
            $query = "INSERT INTO ims_supplier (supplier_name, mobile, address, status) VALUES (?, ?, ?, 'active')";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$nameProveedor, $telProveedor, $direProveedor]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar la proveedor: ' . $e->getMessage();
        }
    }

    public function eliminarProveedor($idProveedor) {
        try {
            $query = "DELETE FROM ims_supplier WHERE icveproveedor = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idProveedor]);

            echo 'Proveedor eliminada correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar la proveedor: ' . $e->getMessage();
        }
    }

    public function actualizarProveedor($nameProveedor, $telProveedor, $direProveedor, $idProveedor) {
        try {
            
            $query = "UPDATE ims_supplier SET supplier_name = ?, mobile = ?, address = ?   WHERE icveproveedor = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$nameProveedor, $telProveedor,  $direProveedor, $idProveedor]);

            echo 'Proveedor actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar la proveedor: ' . $e->getMessage();
        }
    }

    public function obtenerProveedores() {
        try {
            $query = "SELECT * FROM ims_supplier";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowProveedor($idProveedor){
        try {
            $query = "SELECT * FROM ims_supplier WHERE icveproveedor = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idProveedor]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    // public function categoryDropdownList()
	// {
	// 	$query = "SELECT * FROM ims_category WHERE status = 'active' ORDER BY name ASC";
	// 	$statement = $this->acceso->prepare($query);
    //     $statement->execute();
	// 	$categoryHTML = '';
	// 	while ($category = $statement->fetchAll(PDO::FETCH_ASSOC)) {
	// 		$categoryHTML .= '<option value="' . $category["categoryid"] . '">' . $category["name"] . '</option>';
	// 	}
	// 	return $categoryHTML;
	// }
}
?>
