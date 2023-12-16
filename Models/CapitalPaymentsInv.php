<?php
require_once 'Conexion.php';

class CapitalPaymentsInv
{
    private $conexion;
    var $acceso;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    /**
     * getDataInvestment
     *
     * @param  Number $icvedetinversion
     * @return Array[] String
     */
    public function getDataInvestment($icvedetinversion)
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
    public function getCapitalSum($icvedetalleinver)
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

            $queryUpdate = "UPDATE inverdetalle SET dmonto = dmonto - ? WHERE icvedetalleinver = ?";
            $statement2 = $this->acceso->prepare($queryUpdate);
            $statement2->execute([$amount, $icvedetinversion]);
            
            $resp['msj'] = true;
            $resp['text'] = 'Se insertó el pago a capital correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error: no se puede insertar el pago a capital. ' . $e->getMessage());
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
