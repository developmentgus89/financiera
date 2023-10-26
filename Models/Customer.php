<?php
require_once 'Conexion.php';

class Customer{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarCliente(
        $cnombre,
        $capelpat,
        $capelmat,
        $cedad,
        $typeClient,
        $cdatebirthday,
        $clientDateRegister,
        $clienteStatus,
        $ctelefono
    ) {
        try {
            $query = "INSERT INTO clientes (cnombre, capaterno, camaterno, iedad,
                        icvetipocliente, dfechanaciemiento, dfechaalta, cestatus, ctelefono) 
                        VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?, ?
                        )";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $cnombre,
                $capelpat,
                $capelmat,
                $cedad,
                $typeClient,
                $cdatebirthday,
                $clientDateRegister,
                $clienteStatus,
                $ctelefono
            ]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el cliente: ' . $e->getMessage();
        }
    }

    // public function eliminarCliente($id) {
    //     try {
    //         $query = "DELETE FROM ims_customer WHERE id = ?";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$id]);

    //         echo 'Cliente eliminado correctamente';
    //     } catch (PDOException $e) {
    //         echo 'Error al eliminar el cliente: ' . $e->getMessage();
    //     }
    // }

    // public function actualizarCliente($id, $icvegrado, $name, $address, $mobile) {
    //     try {
            
    //         $query = "UPDATE ims_customer SET icvegrado = ?, name = ?, address = ?, mobile = ? WHERE id = ?";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$icvegrado, $name, $address, $mobile, $id]);

    //         echo 'Cliente actualizado correctamente';
    //     } catch (PDOException $e) {
    //         echo 'Error al actualizar el cliente: ' . $e->getMessage();
    //     }
    // }

    public function obtenerClientes() {
        try {
            $query = "SELECT * FROM clientes 
                    inner join cattipocliente 
                    on clientes.icvetipocliente = cattipocliente.icvetipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function obtenerTiposClientes(){
        try {
            $query = "SELECT * FROM cattipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
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
