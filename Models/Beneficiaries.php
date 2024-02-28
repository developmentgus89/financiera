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

    public function getAmountPorcent($icveinversionista): array
    {
        try {
            $query = "SELECT SUM(porcentaje) as total, 
                    100 - SUM(porcentaje) as restante,
                    SUM(porcentaje) + 100 - SUM(porcentaje) as por
                    FROM catinvbenefi 
                where icveinversionista  = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al cargar las cuentas bancarias, verifique estructura.' . $e->getMessage());
        }
    }

        
    /**
     * setNewBeneficiaries
     *
     * @param  mixed $fieldicveinversionista
     * @param  mixed $nameBenefi
     * @param  mixed $teleBenefi
     * @param  mixed $direcciBenefi
     * @param  mixed $porcentaje
     * @return array
     */
    public function setNewBeneficiaries(int $fieldicveinversionista, string $nameBenefi,string $teleBenefi, string $direcciBenefi, float $porcentaje): array
    {
        try {
            $sql = "INSERT INTO catinvbenefi (
                    icveinversionista,
                    cnombrebenef,
                    ctelefonobenef,
                    cdireccionbenef) VALUES (?, ?, ?, ?)";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$fieldicveinversionista, $nameBenefi, $teleBenefi, $direcciBenefi]);
            $resp['msj'] = true;
            $resp['text'] = 'Se insertó los datos del beneficiario correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al insertar el beneficiario.' . $e->getMessage());
        }
    }
    
    /**
     * getStatics
     *
     * @param  mixed $icveinversionista
     * @return array
     */
    public function getStatics(int $icveinversionista) : array{
        try {
            $sql = "select SUM(porcentaje) as asignado,
            100 - SUM(porcentaje) as noasignado
            from catinvbenefi where icveinversionista = ?";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al insertar el beneficiario.' . $e->getMessage());
        }
    }
}
