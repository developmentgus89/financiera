<?php
require_once 'Conexion.php';

class TypeClient{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarTipoCliente($typeclientdescripcion, $abreTipoClient, $typeClientTax) {
        try {

            $query = "INSERT INTO cattipocliente ( cdescriptipocliente, cabreviiatipo, icvetasascomisiones) VALUES (?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$typeclientdescripcion, $abreTipoClient, $typeClientTax]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el tipo de cliente: ' . $e->getMessage();
        }
    }

    public function eliminarTipoCliente($id) {
        try {
            $query = "DELETE FROM cattipocliente WHERE icvetipocliente = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);

            echo 'Tipo cliente eliminado correctamente';
        } catch (PDOException $e) {
            echo 'Error al eliminar el tipo de cliente: ' . $e->getMessage();
        }
    }

    public function actualizarTipoCliente($id, $udpcdescriptipocliente, $udpcabreviiatipo, $udptasainteres) {
        try {
            
            $query = "UPDATE cattipocliente SET cdescriptipocliente = ?, cabreviiatipo = ?, icvetasascomisiones = ? WHERE icvetipocliente = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$udpcdescriptipocliente, $udpcabreviiatipo, $udptasainteres, $id]);

            echo 'Tipo cliente actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar el tipo de cliente: ' . $e->getMessage();
        }
    }

    public function obtenerTipoCliente() {
        try {
            $query = "SELECT * FROM cattipocliente AS tcliente
                    INNER JOIN cattasascomisiones AS tasa 
                    ON tcliente.icvetasascomisiones = tasa.icvetasascomisiones";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    
    public function rowTipoCliente($id){
        try {
            $query = "SELECT * FROM financiera.cattipocliente AS tipocliente
                        INNER JOIN cattasascomisiones AS tasas 
                        ON tipocliente.icvetasascomisiones = tasas.icvetasascomisiones
                        WHERE tipocliente.icvetipocliente = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta del tipo cliente' . $e->getMessage();
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

    public function obtenerTaxes(){
        try {
            $query = "SELECT * FROM cattasascomisiones";
            $statement = $this->acceso->prepare($query);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta de tasas de interes' . $e->getMessage();
        }
    }
}
?>
