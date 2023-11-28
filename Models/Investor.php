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
        $invinteres,
        $invcantinvertida,
        $invtipocuenta,
        $invinstbancaria,
        $invctabancaria,
        $invemail,
        $invDateRegister
    ) {
        try {
            $query = "INSERT INTO inversionistas (icvetasascomisiones, cnombre, capaterno, camaterno, iedad,
                        ctelefono, fcantidadinvertida, itipocuenta, icvebanco, cuentabancaria, cemail, dfecha_alta, cantpagadacapital) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $invinteres, $invnombre, $invapaterno, 
                $invamaterno, $invedad, $invtelefono, 
                $invcantinvertida, $invtipocuenta, $invinstbancaria,
                $invctabancaria, $invemail, $invDateRegister
            ]);

            //* Obtenemos el último valor del ultimo inversionista insertado apra la clave
            $icveinversionista = $this->acceso->lastInsertId();

            //* Se genera el Query para la inserción del detalle del inversionista
            $queryInverdetalle = "INSERT INTO inverdetalle (icveinversionista, icvetasascomisiones, dfecharegistro, 
                                dmonto, cstatus, invtipooperacion, invdetobservaciones) 
                                VALUES (?, ?, ?, ?, 'A', 'I', 'INVERSION INCIAL')";
            $statementInverdetalle = $this->acceso->prepare($queryInverdetalle);
            $statementInverdetalle->execute([$icveinversionista, $invinteres, $invDateRegister, $invcantinvertida]);

            // Devuelve true si todo es correcto
            $resp['msj'] = true;
            return $resp;
        } catch (PDOException $e) {
            echo 'Error al insertar el inversionista: ' . $e->getMessage();
        }
    }

    public function getInvestorDetails($icveinvestor)
    {
        try {
            $query = "SELECT * FROM inverdetalle 
                        INNER JOIN cattasascomisiones 
                        ON inverdetalle.icvetasascomisiones = cattasascomisiones.icvetasascomisiones
                        WHERE icveinversionista = ? ORDER BY inverdetalle.dfecharegistro DESC";
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
            $query = "SELECT * FROM inversionistas 
                        INNER JOIN cattasascomisiones 
                        ON inversionistas.icvetasascomisiones = cattasascomisiones.icvetasascomisiones";
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

    public function get_interest()
    {
        try {
            $query = "SELECT * FROM cattasascomisiones";
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

    public function set_invesmentsdetails($cveinvestor, $inputDateInver, $inputInteres, $inputMontoInver, $inputObsInver)
    {
        try {
            $query = "INSERT INTO inverdetalle (icveinversionista, icvetasascomisiones, dfecharegistro,dmonto, cstatus, invtipooperacion, invdetobservaciones)
                VALUES (?, ?, ?, ?, 'A', 'I', ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinvestor, $inputInteres, $inputDateInver, $inputMontoInver, $inputObsInver]);
            
            $queryUpdate = "UPDATE inversionistas SET fcantidadinvertida = fcantidadinvertida + ? WHERE icveinversionista = ? ";
            $statement2 = $this->acceso->prepare($queryUpdate);
            $statement2->execute([$inputMontoInver, $cveinvestor]);

            return true;
            
        } catch (PDOException $e) {
            echo 'Error'.$e->getMessage();
        }
    }
    
        
    /**
     * get_paysinterests
     *
     * @param  number $cveinvestor
     * @return JSON [paginteresesinv]
     */
    public function get_paysinterests($cveinvestor){
        try {
            $query = "SELECT * FROM vw_paysinterests WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error no se pueden traer el detalle de los pagos'. $e->getMessage();
        }
    }

    
    /**
     * get_investments = Detalle de las inversiones
     *
     * @param  number $cveinvestor
     * @return Array[] String | Error Message PDOException
     */
    public function get_investments($cveinvestor){
        try {
            $query = "SELECT * FROM inverdetalle WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error no se pueden traer el detalle de los pagos'. $e->getMessage();
        }

    }   
    
    /**
     * get_paysinterestbyinver
     *
     * @param  number $icvedetalleinver
     * @return Array[] String
     */
    public function get_paysinterestbyinver($icveinversion){
        try {
            $query = "SELECT * FROM paginteresesinv WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Erro al obetener los pagos de esa inversion'. $e->getMessage());
        }
    }

        
    /**
     * get_countinvesments
     *
     * @param  number $icveinvestor
     * @return json
     */
    public function get_countinvesments($icveinvestor){
        try {
            $query = "SELECT count(0) AS totalinversiones FROM inverdetalle WHERE icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinvestor]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error al contar las inversiones del inversionista'. $e->getMessage();
        }
    }

        
    /**
     * get_paysinvesments
     *
     * @param  number $icvedetalleinver
     * @return json inverdetalle | error String
     */
    public function get_paysinvesments($icvedetalleinver){
        try {
            $query = "SELECT * FROM inverdetalle WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetalleinver]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la captura del detalle del inversionista'. $e->getMessage();
        }
    }

    
    /**
     * set_updateDetailInvesment
     *
     * @param  number $udpcveinverdetalle
     * @param  Date $udpinputDateInver
     * @param  number $udpinputMontoInver
     * @param  String $udpinputObsInver
     * @return JSON 
     */
    public function set_updateDetailInvesment($udpcveinversionista, $udpcveinverdetalle, $udpicveinteres, $udpinputDateInver, $udpinputMontoInver, $udpinputObsInver){
        try {
            $query = "UPDATE inverdetalle SET dfecharegistro = ?, icvetasascomisiones = ?, dmonto = ?, invdetobservaciones = ? WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$udpinputDateInver, $udpicveinteres, $udpinputMontoInver, $udpinputObsInver, $udpcveinverdetalle]);

            $query2 = "UPDATE inversionistas SET icvetasascomisiones = ?, fcantidadinvertida = ? WHERE icveinversionista = ?";
            $statement2 = $this->acceso->prepare($query2);
            $statement2->execute([$udpicveinteres, $udpinputMontoInver, $udpcveinversionista]);

            $resp['msj'] = true;
            $resp['text'] = 'Se actualizo el inversionista correctamente';
            return $resp;
        } catch (PDOException $e) {
            echo 'Error al actualiar la inversion del inversionista'. $e->getMessage();
        }
    }

    
    /**
     * get_paysdetailsinterest
     *
     * @param  number $icveinversionista
     * @return void
     */
    public function get_paysdetailsinterest($icveinversionista){
        try {
            $query = "SELECT * FROM paginteresesinv WHERE icveinversionista = ?
                        ORDER BY dfecharegistro DESC";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al actualiar la inversion del inversionista'. $e->getMessage());
        }
    }

    public function set_paysdetailsinterest($icveinversionista){
        try {
            $query = "INSERT INTO paginteresesinv (icveinversionista, icvedetalleinver, montoinvhist, fmonto_pagado, dfecharegistro, cstatuspago)
                        SELECT 
                            inverdetalle.icveinversionista,
                            inverdetalle.icvedetalleinver,
                            inverdetalle.dmonto,
                            ROUND(inverdetalle.dmonto * (tc.ftasainteres / 100), 2) AS fmonto_pagado,
                            NOW() AS dfecharegistro,
                            'NP' AS cstatuspago
                        FROM 
                            inverdetalle 
                        INNER JOIN inversionistas  ON inverdetalle.icveinversionista = inversionistas.icveinversionista
                        INNER JOIN cattasascomisiones tc ON inversionistas.icvetasascomisiones = tc.icvetasascomisiones
                    WHERE inversionistas.icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            $resp['msj'] = true;
            $resp['text'] = "Se insertó el pago correctamente.";
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al insertar el pago'. $e->getMessage());
        }
    }
    
    /**
     * set_confirmpayment
     *
     * @param  number $icvepayment cve pago
     * @param  String $document name document
     * @return array[] String | String Error
     */
    public function set_confirmpayment($icvepayment, $document) : array {
        try {
            $query = "UPDATE paginteresesinv SET cstatuspago = 'P', comprobantepago = ? WHERE icvepago = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$document, $icvepayment]);
            $resp['msj'] = true;
            $resp['text'] = 'Se confirmó el pago correctamente';
            return $resp; 
        } catch (PDOException $e) {
            throw new Error('No se pudo confirmar el pago correctamente'. $e->getMessage());
        }
    }
}
