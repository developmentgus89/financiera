<?php
require_once 'Conexion.php';

class CapitalPaymentsInv
{
    private $conexion;
    private $acceso;
    private static $conn;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
        self::$conn = $this->acceso;
    }

    /**
     * getDataInvestment
     *
     * @param  Number $icvedetinversion
     * @return Array[] String
     */
    public function getDataInvestment($icvedetinversion) : array
    {
        try {
            $query = "SELECT * FROM inverdetalle 
                        INNER JOIN cattasascomisiones ON
                        inverdetalle.icvetasascomisiones = cattasascomisiones.icvetasascomisiones
                        WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Erro en la consulta de los datos de la inversion' . $e->getMessage());
        }
    }

    /**
     * getAmountInvestment
     *
     * @param  number $cveinversion
     * @return Array[] String | PDOException Message
     */
    public function getAmountInvestment($cveinversion)
    {
        try {
            $query = "SELECT * FROM inverdetalle WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$cveinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error: no se puede obtener el monto de la inversion' . $e->getMessage());
        }
    }


    /**
     * getCapitalSum
     *
     * @param  number $icvedetalleinver
     * @return Array[] String | PDOException Message
     */
    public function getCapitalSum($icvedetalleinver) : string
    {
        try {
            $query = "SELECT SUM(fmontopagado) AS totalcapital FROM pagcapitalinv WHERE icveinverdetalle = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetalleinver]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error: no se puede obtener el total del capital pagado' . $e->getMessage());
        }
    }

    
    /**
     * setCapitalPayment
     *
     * @param  number $icvedetinversion
     * @param  number $amount
     * @param  String $voucher
     * @return Array[] String | PDOException
     */
    public function setCapitalPayment($icvedetinversion, $amount, $voucher)
    {
        try {
            $query = "INSERT INTO pagcapitalinv (icveinverdetalle, fmontopagado, dfecha_pago, 
                                    comprobante, statuspago) 
                     VALUES (?, ?, NOW(), CONCAT('../docs/CapitalPayments/', ?), 'P')";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetinversion, $amount, $voucher]);

            $cveinversionista = $this->acceso->lastInsertId();

            
            $queryUpdate = "UPDATE inverdetalle SET dmonto = dmonto - ? WHERE icvedetalleinver = ?";
            $statement2 = $this->acceso->prepare($queryUpdate);
            $statement2->execute([$amount, $icvedetinversion]);

            $querySelect = "SELECT icveinversionista FROM inverdetalle WHERE icvedetalleinver = ?";
            $statementSelect = $this->acceso->prepare($querySelect);
            $statementSelect->execute([$icvedetinversion]);
            $result = $statementSelect->fetch(PDO::FETCH_ASSOC);

            if($result){
                $icveinversionista = $result['icveinversionista'];
                //Iserción del métoodo estatico
                $resp['static'] = CapitalPaymentsInv::updateSumCapitalInv($icveinversionista);
            } else {
                $resp['static'] = 'Metodo statico con errores';
            }

            $resp['msj'] = true;
            $resp['text'] = 'Se insertó el pago a capital correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error: no se puede insertar el pago a capital. ' . $e->getMessage());
        }
    }

    
    /**
     * updateSumCapitalInv
     *
     * @param  number $cveinversionista
     * @return Array[] Object
     */
    public static function updateSumCapitalInv($cveinversionista) : array {
        try {
            $query = "UPDATE inversionistas SET fcantidadinvertida = (
                            SELECT SUM(dmonto) FROM inverdetalle WHERE icveinversionista = ?
                        )
                      WHERE icveinversionista = ?";
            $statement = self::$conn->prepare($query); //Se usa self para referenciar la clase misma
            $statement->execute([$cveinversionista, $cveinversionista]);
            $resp['msj'] = true;
            $resp['text'] = 'Se insertó el pago a capital correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error: no se puede actualizar el total del monto invertido. ' . $e->getMessage());
        }
    }


    
    /**
     * getCapitalPayments
     *
     * @param  number $icvedetalleinver
     * @return Array[] JSON | PDOException
     */
    public function getCapitalPayments($icvedetalleinver){
        try {
            $query = "SELECT * FROM pagcapitalinv WHERE icveinverdetalle = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetalleinver]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error: No se pueden obtener los pagos a capital. ' . $e->getMessage());
        }
    }


    public function getVoucherCapitalPayment($icvepagocapitalinv){
        try {
            $query = "SELECT * FROM pagcapitalinv WHERE icvepagocapitalinv = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvepagocapitalinv]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error: No se puede obtener el voucher de pago a Capital. ' . $e->getMessage());
        }
    }
}
