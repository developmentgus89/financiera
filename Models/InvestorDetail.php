
<?php

require_once 'Conexion.php';

class InvestorDetail
{
    private $conexion;
    var $acceso;

    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function setInsertInvestmentAdd(){
        
    }
}
?>