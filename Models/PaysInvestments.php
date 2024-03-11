<?php
require_once 'Conexion.php';

class PaysInvestments
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
     * getPaysInvestment
     *
     * @param  number $icveinversionista
     * @param  number $icvedetinversion
     * @return Array[] String
     */
    public function getPaysInvestment($icveinversionista, $icvedetinversion)
    {
        try {
            $query = "SELECT * FROM paginteresesinv WHERE icveinversionista = ? AND icvedetalleinver = ?
                        ORDER BY dfecharegistro DESC";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista, $icvedetinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se pudo completar la instruccion' . $e->getMessage());
        }
    }


    /**
     * setInsertPays
     *
     * @param  number $icveinversionista
     * @param  number $icvedetalleinver
     * @param  double $interes
     * @param  double $dmonto
     * @return Array[] String
     */
    // public function setInsertPays($icveinversionista, $icvedetalleinver, $interes, $dmonto)
    // {
    //     $payInterest = round(($dmonto * $interes) / 100, 2);
    //     try {
    //         $query = "INSERT INTO paginteresesinv (icveinversionista, icvedetalleinver, montoinvhist, 
    //                                             fmonto_pagado, dfecharegistro, cstatuspago, 
    //                                             dtfechapagconfirmado, comprobantepago) 
    //                                 VALUES(?, ?, ?, ?,NOW(),'NP', null, null)";
    //         $statement = $this->acceso->prepare($query);
    //         $statement->execute([$icveinversionista, $icvedetalleinver, $dmonto, $payInterest]);
    //         $resp['msj'] = 'success';
    //         $resp['text'] = 'Se inserto el pago correctamente';
    //         return $resp;
    //     } catch (PDOException $e) {
    //         throw new Error('Error en la insercion del pago' . $e->getMessage());
    //     }
    // }

    public function setInsertPays($icveinversionista, $icvedetalleinver, $interes, $dmonto)
    {
        $payInterest = round(($dmonto * $interes) / 100, 2);
        try {
            // Obtener el primer registro existente para el inversionista
            $queryFirstRecord = "SELECT MIN(MONTH(dfecharegistro)) AS first_month 
                             FROM paginteresesinv 
                             WHERE icveinversionista = ?";
            $statementFirstRecord = $this->acceso->prepare($queryFirstRecord);
            $statementFirstRecord->execute([$icveinversionista]);
            $firstRecord = $statementFirstRecord->fetch(PDO::FETCH_ASSOC);
            $firstMonth = intval($firstRecord['first_month']);

            // Obtener el mes y año actual
            $currentMonth = date('n');
            $currentYear = date('Y');

            // Insertar pagos faltantes por mes desde el primer registro hasta el mes actual
            for ($i = $firstMonth; $i <= $currentMonth; $i++) {
                $queryCheck = "SELECT COUNT(*) as count 
                           FROM paginteresesinv 
                           WHERE icveinversionista = ? 
                           AND MONTH(dfecharegistro) = ? 
                           AND YEAR(dfecharegistro) = ?";
                $statementCheck = $this->acceso->prepare($queryCheck);
                $statementCheck->execute([$icveinversionista, $i, $currentYear]);
                $resultCheck = $statementCheck->fetch(PDO::FETCH_ASSOC);

                if ($resultCheck['count'] == 0) { // Si no existe un registro para este mes
                    $query = "INSERT INTO paginteresesinv (icveinversionista, icvedetalleinver, montoinvhist, 
                                                        fmonto_pagado, dfecharegistro, cstatuspago, 
                                                        dtfechapagconfirmado, comprobantepago) 
                                            VALUES (?, ?, ?, ?, ?, 'NP', null, null)";
                    $statement = $this->acceso->prepare($query);
                    $statement->execute([
                        $icveinversionista, $icvedetalleinver, $dmonto, $payInterest,
                        "$currentYear-$i-01"
                    ]); // Fecha en formato 'YYYY-MM-DD'
                }
            }

            $resp['msg'] = 'success';
            $resp['text'] = 'Se insertaron los pagos correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error en la inserción de pagos: ' . $e->getMessage());
        }
    }


    /**
     * confirmPay
     *
     * @param  number $idpay
     * @param  String $comprobante
     * @return Array[] String
     */
    public function confirmPay($idpay, $comprobante)
    {
        try {
            $query = "UPDATE paginteresesinv SET cstatuspago = 'P', dtfechapagconfirmado = NOW(), comprobantepago = CONCAT('../docs/',?) 
                    WHERE icvepago = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$comprobante, $idpay]);
            $resp['msj'] = 'success';
            $resp['text'] = 'Se confirmo el pago correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error en la insercion del pago' . $e->getMessage());
        }
    }


    /**
     * getVoucher
     *
     * @param  number $idpay
     * @return Array[] String
     */
    public function getVoucher($idpay)
    {
        try {
            $query = "SELECT * FROM paginteresesinv WHERE icvepago = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idpay]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error en la insercion del pago' . $e->getMessage());
        }
    }


    /**
     * getSumInterest
     *
     * @param  number $icvedetinversion
     * @return Array[] JSON | PDOException
     */
    public function getSumInterest($icvedetinversion)
    {
        try {
            $query = "SELECT SUM(fmonto_pagado) AS totalpaginv FROM paginteresesinv WHERE icvedetalleinver = ? AND cstatuspago = 'P'";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se pudo completar la instruccion' . $e->getMessage());
        }
    }
}
