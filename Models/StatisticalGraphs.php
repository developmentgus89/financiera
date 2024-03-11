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
}