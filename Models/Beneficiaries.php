<?php
require_once 'Conexion.php';
require_once 'Investor.php';

/**
 * Beneficiaries
 */
class Beneficiaries 
{
    private $conexion;
    var $acceso;
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
     * getBanksAccounts
     *
     * @param  number $icveinversionista
     * @return array
     */
    public function getBeneficiaries($icveinversionista): array
    {
        try {
            $query = "SELECT * FROM catinvbenefi AS beneficiarios
                WHERE beneficiarios.icveinversionista = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al cargar las cuentas bancarias, verifique estructura.' . $e->getMessage());
        }
    }

}
