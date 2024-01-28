<?php
require_once 'Conexion.php';
require_once 'Investor.php';

class BanksAccounts extends Investor
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

    public function getBanksAccounts($icveinversionista)
    {
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



    /**
     * newAccountBank
     *
     * @param  int $fieldicveinversionista
     * @param  int $selCatIcveBanco
     * @param  int $typeAccountBank
     * @param  string $numberAccountBank
     * @param  bool $customSwitch3
     * @param  int $statusAccountBank
     * @param  string $observationsAccountBank
     * @return Array[] String
     */
    public function newAccountBank(
        int $fieldicveinversionista,
        int $selCatIcveBanco,
        int $typeAccountBank,
        string $numberAccountBank,
        bool $customSwitch3,
        int $statusAccountBank,
        string $observationsAccountBank
    ) {
        if($customSwitch3 == 0){
            $customSwitch3 = 0;
        }else{
            $customSwitch3 = 1;
        }

        try {
            $query = "INSERT INTO catctasbancoinv (
                    icveinversionista, icvebanco, itipocuenta, 
                    cnumcuenta, orden, cstatus, cobservaciones) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $fieldicveinversionista, $selCatIcveBanco, $typeAccountBank,
                $numberAccountBank, $customSwitch3, $statusAccountBank, $observationsAccountBank    
            ]);
            $resp['msj'] = true;
            $resp['text'] = 'Se insertó la cuenta bancaria correctamente';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
        }
    }
}
