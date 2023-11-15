<?php
require_once 'Conexion.php';

class Investor
{
    private $conexion;
    var $acceso;

    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function rowsCount($invnombre, $invapaterno, $invamaterno)
    {
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
            echo 'Erro al ejecutar la consulta de existencia del inversionista ' . $e->getMessage();
        }
    }

    public function newInvestor(
        $invnombre,
        $invapaterno,
        $invamaterno,
        $invedad,
        $invtelefono,
        $invcantinvertida,
        $invtipocuenta,
        $invinstbancaria,
        $invctabancaria,
        $invemail,
        $invDateRegister
    ) {
        try {
            $query = "INSERT INTO inversionistas (cnombre, capaterno, camaterno, iedad,
                        ctelefono, fcantidadinvertida, itipocuenta, icvebanco, cuentabancaria, cemail, dfecha_alta, cantpagadacapital) 
                        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $invnombre, $invapaterno, $invamaterno, $invedad,
                $invtelefono, $invcantinvertida, $invtipocuenta, $invinstbancaria,
                $invctabancaria, $invemail, $invDateRegister
            ]);

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
    public function getInvestorDetails($icveinvestor)
    {
        try {
            $query = "SELECT * FROM inverdetalle WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error al traer las inversiones del inversionista' . $e->getMessage();
        }
    }

    /**
     * updateInvestor
     *
     * @return void
     */
    public function updateInvestor(
        $udpidcveinvestor,
        $udpinvnombre,
        $udpinvapaterno,
        $udpinvamaterno,
        $udpinvedad,
        $udpinvtelefono,
        $udpinvtipocuenta,
        $udpinvinstbancaria,
        $udpinvctabancaria,
        $udpinvemail,
        $udpinvDateRegister
    ) {
        try {

            $query = "UPDATE inversionistas SET cnombre = ?, capaterno = ?, camaterno = ?, iedad = ?, 
                        ctelefono = ?, itipocuenta = ?, icvebanco = ?, cuentabancaria = ?, cemail = ?, dfecha_alta = ?
                        WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $udpinvnombre, $udpinvapaterno, $udpinvamaterno,
                $udpinvedad, $udpinvtelefono, $udpinvtipocuenta,
                $udpinvinstbancaria, $udpinvctabancaria,
                $udpinvemail, $udpinvDateRegister, $udpidcveinvestor
            ]);
            echo 'Inversionista actualizado correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar el cliente: ' . $e->getMessage();
        }
    }

    public function getInvestors()
    {
        try {
            $query = "SELECT * FROM inversionistas";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function getTotalInvestors()
    {
        try {
            $query = "SELECT count(0) AS total FROM inversionistas";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function getTotalCapital()
    {
        try {
            $query = "SELECT sum(fcantidadinvertida) AS capital FROM inversionistas";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }


    public function get_banks()
    {
        try {
            $query = "SELECT * FROM catbancos";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function obtenerTiposClientes()
    {
        try {
            $query = "SELECT * FROM cattipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    /**
     * rowInvestor
     *
     * @param $id 
     * @return void
     */
    public function rowInvestor($id)
    {
        try {
            $query = "SELECT *,
                        (SELECT COUNT(*) FROM inverdetalle WHERE icveinversionista = inversionistas.icveinversionista) AS totinversiones
                    FROM inversionistas
                    INNER JOIN catbancos ON inversionistas.icvebanco = catbancos.icvebanco
                    WHERE icveinversionista =  ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }


    //? para que era este método
    public function get_investmentDetails()
    {
    }

    //! Insercion de inversion

    public function set_invesmentsdetails($cveinvestor, $inputDateInver, $inputMontoInver, $inputObsInver)
    {
        try {
            $query = "INSERT INTO inverdetalle (icveinversionista,dfecharegistro,dmonto, cstatus, invtipooperacion, invdetobservaciones)
                VALUES (?, ?, ?, 'A', 'I', ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinvestor, $inputDateInver, $inputMontoInver, $inputObsInver]);
            
            $queryUpdate = "UPDATE inversionistas SET fcantidadinvertida = fcantidadinvertida + ? WHERE icveinversionista = ? ";
            $statement2 = $this->acceso->prepare($queryUpdate);
            $statement2->execute([$inputMontoInver, $cveinvestor]);

            return true;
            
        } catch (PDOException $e) {
            echo 'Error'.$e->getMessage();
        }
    }

    public function get_paysinterests($cveinvestor){
        try {
            $query = "SELECT pagos.icvepago, pagos.fmonto_pagado AS importe, pagos.dfecharegistro AS fecha,
                        pagos.cstatuspago AS statuspago, pagos.dtfechapagconfirmado, inversionistas.cnombre, 
                        inversionistas.capaterno, inversionistas.camaterno
                        FROM paginteresesinv AS pagos 
                        INNER JOIN inversionistas 
                        on pagos.icveinversionista = inversionistas.icveinversionista
                        where pagos.icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error no se pueden traer el detalle de los pagos'. $e->getMessage();
        }
    }
}
