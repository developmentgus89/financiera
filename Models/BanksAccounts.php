<?php
require_once 'Conexion.php';

class BanksAccounts
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

    public function getBanksAccounts($icveinversionista){
        try {
            $query = "SELECT * FROM catctasbancoinv AS cuenta
                INNER JOIN catbancos AS banco ON cuenta.icvebanco = banco.icvebanco
                WHERE cuenta.icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al cargar las cuentas bancarias, verifique estructura.');
        }
    }

}
