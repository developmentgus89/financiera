<?php
require_once 'Conexion.php';

class StatisticalGraphs
{
    private $conexion;
    var $acceso;

    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function readRowPaysInterests($icveinversionista) : array{
        try {
            $sql = "SELECT 
                        YEAR(dfecharegistro) AS año, 
                        MONTH(dfecharegistro) AS mes, 
                        SUM(fmonto_pagado) AS totalpaysinterest
                    FROM 
                        paginteresesinv 
                    WHERE 
                        icveinversionista = ? 
                        AND dfecharegistro >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                    GROUP BY 
                        YEAR(dfecharegistro), 
                        MONTH(dfecharegistro)
                    ORDER BY 
                        YEAR(dfecharegistro) DESC, 
                        MONTH(dfecharegistro) DESC
                    LIMIT 12";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se puede leer las cantidades de los pagos de interes. '. $e->getMessage());
        }
    }

    public function readRowInvestments($icveinversionista) : array{
        try {
            $sql = "SELECT 
                        YEAR(dfecharegistro) AS año, 
                        MONTH(dfecharegistro) AS mes, 
                        SUM(dmonto) AS totalinv
                    FROM 
                        inverdetalle 
                    WHERE 
                        icveinversionista = ? 
                    AND dfecharegistro >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                    GROUP BY 
                        YEAR(dfecharegistro), 
                        MONTH(dfecharegistro)
                    ORDER BY 
                        YEAR(dfecharegistro) DESC, 
                        MONTH(dfecharegistro) DESC
                    LIMIT 12";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se puede leer las cantidades de la inversion. '. $e->getMessage());
        }
    }
}