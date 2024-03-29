<?php
require_once 'Conexion.php';
require_once 'Investor.php';

class BanksAccounts extends Investor
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
    public function getBanksAccounts($icveinversionista): array
    {
        try {
            $query = "SELECT * FROM catctasbancoinv AS cuenta
                INNER JOIN catbancos AS banco ON cuenta.icvebanco = banco.icvebanco
                WHERE cuenta.icveinversionista = ? AND cuenta.cstatus = '1' order by cuenta.orden desc";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icveinversionista]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al cargar las cuentas bancarias, verifique estructura.' . $e->getMessage());
        }
    }


    public function getDataAccountBank($icvecuentabancaria): array
    {
        try {
            $query = "SELECT * FROM catctasbancoinv AS cuenta
                INNER JOIN catbancos AS banco ON cuenta.icvebanco = banco.icvebanco
                WHERE cuenta.icvecatctasbancoinv = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvecuentabancaria]);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al cargar las cuentas bancarias, verifique estructura.' . $e->getMessage());
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
        if ($customSwitch3 == 0) {
            $customSwitch3 = 0;
        } else {
            $customSwitch3 = 1;
            BanksAccounts::priorityAccountBank($fieldicveinversionista);
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


    public function updateAccountBank(
        int $udpselCatIcveBanco,
        string $udpnumberAccountBank,
        int $udptypeAccountBank,
        int $udpstatusAccountBank,
        string $udpobservationsAccountBank,
        bool $udpcustomSwitch3,
        int $udpicvecuentacveinver,
        int $udpcveinversionista
    ) {
        if ($udpcustomSwitch3 == 1) {
            $udpcustomSwitch3 = 1;
            BanksAccounts::priorityAccountBank($udpcveinversionista);
        } else {
            $udpcustomSwitch3 = 0;
        }

        try {
            $query = "UPDATE catctasbancoinv 
                SET icvebanco = ?, itipocuenta = ?, 
                cnumcuenta= ?, orden = ?, cstatus = ?, 
                cobservaciones = ? WHERE icvecatctasbancoinv = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $udpselCatIcveBanco,
                $udptypeAccountBank,
                $udpnumberAccountBank,
                $udpcustomSwitch3,
                $udpstatusAccountBank,
                $udpobservationsAccountBank,
                $udpicvecuentacveinver
            ]);
            $resp['msj'] = true;
            $resp['text'] = 'Se actualizó la cuenta bancaria correctamente';
            return $resp;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    /**
     * priorityAccountBank
     *
     * @param  int $icveinversionista
     * @return array | String msg error
     */
    private static function priorityAccountBank(int $icveinversionista)
    {
        try {
            $query = "UPDATE catctasbancoinv SET orden = 0 WHERE icveinversionista = ?";
            $statement = self::$conn->prepare($query);
            $statement->execute([$icveinversionista]);
            $resp['msg'] = 'success';
            $resp['text'] = 'Se reorganizaron correctamente las cuentas bancarias';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
        }
    }


    public function deleteAccountBank($icvecuentabancaria)
    {
        try {
            $query = "UPDATE catctasbancoinv SET cstatus = '0' WHERE icvecatctasbancoinv = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$icvecuentabancaria]);
            $affectRows = $statement->rowCount();
            if ($affectRows >= 1) {
                $resp['msg'] = 'success';
                $resp['text'] = 'Se eliminó la cuenta bancaria exitosamente.';
            } else {
                $resp['msg'] = 'error';
                $resp['text'] = 'Problemas con la solicitud, no con el servidor.';
            }

            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
        }
    }
}
