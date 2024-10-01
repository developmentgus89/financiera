<?php
include_once('Conexion.php');

class DashBoard {
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    // Conteo de clientes para el DashBoard
    public function countClients(){
        $sql = 'SELECT COUNT(0) AS total FROM clientes';
        $statement = $this->acceso->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    // Conteo de inversionistas
    public function countInvestors(){
        $sql = 'SELECT COUNT(0) AS total FROM inversionistas';
        $statement = $this->acceso->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

     // Conteo de inversionistas
     public function getWallets(){
        $sql = 'SELECT * FROM catcarteras';
        $statement = $this->acceso->prepare($sql);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

}

?>