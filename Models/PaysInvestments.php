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
    public function getDataInvestment($icvedetinversion){
        try {
            $query = "SELECT * FROM inverdetalle 
                        INNER JOIN cattasascomisiones ON
                        inverdetalle.icvetasascomisiones = cattasascomisiones.icvetasascomisiones
                        WHERE icvedetalleinver = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvedetinversion]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Erro en la consulta de los datos de la inversion'. $e->getMessage());
        }
    }
    
    /**
     * getPaysInvestment
     *
     * @param  number $icveinversionista
     * @param  number $icvedetinversion
     * @return Array[] String
     */
    public function getPaysInvestment($icveinversionista, $icvedetinversion){
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
    public function setInsertPays($icveinversionista, $icvedetalleinver, $interes, $dmonto){
        $payInterest = round(($dmonto * $interes)/100,2);
        try {
            $query = "INSERT INTO paginteresesinv (icveinversionista, icvedetalleinver, montoinvhist, 
                                                fmonto_pagado, dfecharegistro, cstatuspago, 
                                                dtfechapagconfirmado, comprobantepago) 
                                    VALUES(?, ?, ?, ?,NOW(),'NP', null, null)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista, $icvedetalleinver, $dmonto, $payInterest]);
            $resp['msj'] = 'success';
            $resp['text'] = 'Se inserto el pago correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error en la insercion del pago'. $e->getMessage());
    }
    }
}
