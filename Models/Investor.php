<?php
require_once 'Conexion.php';

class Investor{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    
    public function rowsCount($invnombre, $invapaterno, $invamaterno){
        try {
            $query = "SELECT (
                SELECT COUNT(0) 
                FROM inversionistas 
                WHERE cnombre LIKE ? 
                AND capaterno LIKE ? 
                AND camaterno LIKE ?
            ) AS totalrow, 
            inversionistas.*
            FROM inversionistas 
            WHERE cnombre LIKE ? 
            AND capaterno LIKE ? 
            AND camaterno LIKE ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$invnombre, $invapaterno, $invamaterno, $invnombre, $invapaterno, $invamaterno]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Erro al ejecutar la consulta de existencia del inversionista '. $e->getMessage();
        }
    }

    public function newInvestor(
        $invnombre,
        $invapaterno,
        $invamaterno,
        $invedad,
        $invtelefono,
        $invcantinvertida,
        $invclabe,
        $invemail,
        $invDateRegister
    ) {
        try {
            $query = "INSERT INTO inversionistas (cnombre, capaterno, camaterno, iedad,
                        ctelefono, fcantidadinvertida, cuentabancaria, cemail, dfecha_alta, cantpagadacapital) 
                        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([ $invnombre, $invapaterno, $invamaterno, $invedad,
                                $invtelefono, $invcantinvertida, $invclabe, $invemail, $invDateRegister ]);

            //* Obtenemos el último valor del ultimo inversionista insertado apra la clave
            $icveinversionista = $this->acceso->lastInsertId();

            //* Se genera el Query para la inserción del detalle del inversionista
            $queryInverdetalle = "INSERT INTO inverdetalle (icveinversionista, dfecharegistro, 
                                dmonto, cstatus, invtipooperacion, invdetobservaciones) 
                                VALUES (?, ?, ?, 'A', 'I', 'INVERSION INCIAL')";
            $statementInverdetalle = $this->acceso->prepare($queryInverdetalle);
            $statementInverdetalle->execute([$icveinversionista, $invDateRegister, $invcantinvertida]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el inversionista: ' . $e->getMessage();
        }
    }
    public function getInvestorDetails($icveinvestor){
        try {
            $query = "SELECT * FROM inverdetalle WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error al traer las inversiones del inversionista' . $e->getMessage(); 
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

    public function updateInvestor(
        $udpidcveinvestor,
        $udpinvnombre,
        $udpinvapaterno,
        $udpinvamaterno,
        $udpinvedad,
        $udpinvtelefono,
        $udpinvclabe,
        $udpinvemail,
        $udpinvDateRegister
    ) {
        try {
            
            $query = "UPDATE inversionistas SET cnombre = ?, capaterno = ?, camaterno = ?, iedad = ?, 
                        ctelefono = ?, cuentabancaria = ?, cemail = ?, dfecha_alta = ?
                        WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([ 
                $udpinvnombre,
                $udpinvapaterno,
                $udpinvamaterno,
                $udpinvedad,
                $udpinvtelefono,
                $udpinvclabe,
                $udpinvemail,
                $udpinvDateRegister,
                $udpidcveinvestor
            ]);

            echo 'Inversionista actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar el cliente: ' . $e->getMessage();
        }
    }

    public function getInvestors() {
        try {
            $query = "SELECT * FROM inversionistas";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function getTotalInvestors() {
        try {
            $query = "SELECT count(0) AS total FROM inversionistas";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function getTotalCapital() {
        try {
            $query = "SELECT sum(fcantidadinvertida) AS capital FROM inversionistas";
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

    public function rowInvestor($id){
        try {
            $query = "SELECT * FROM inversionistas 
            WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }
}
