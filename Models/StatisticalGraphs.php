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
            $sql = "SELECT month(dfecharegistro) as mes, 
                    SUM(fmonto_pagado) as totalinv
                    FROM paginteresesinv 
                    WHERE icveinversionista = ? 
                    AND dfecharegistro >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
                    GROUP BY mes DESC LIMIT 12;";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se puede leer las cantidades de los pagos de interes. '. $e->getMessage());
        }
    }

    public function readRowInvestments($icveinversionista) : array{
        try {
            $sql = "SELECT month(dfecharegistro) as mes, 
                        SUM(dmonto) as totalinv
                        FROM inverdetalle 
                    where icveinversionista = ?
                    AND dfecharegistro >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH) 
                    GROUP BY mes DESC LIMIT 12;";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('No se puede leer las cantidades de la inversion. '. $e->getMessage());
        }
    }
}