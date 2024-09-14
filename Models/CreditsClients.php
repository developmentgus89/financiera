
<?php
include_once('Abstracts/OperationsPaysClient.php');
include_once('Conexion.php');
include_once('Log/Log.php');
date_default_timezone_set('America/Mexico_City');

class CreditsClients extends OperationsPaysClient
{

    private $conexion;
    var $acceso;
    private static $conn;
    private $monitor;

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
        $this->monitor = new Log();
    }

    /**
     * getRowsCreditsByClient
     *
     * @param  int $icvecliente
     * @return array
     */
    public function getRowsCreditsByClient(int $icvecliente): array
    {
        try {
            $sql = "SELECT 
                        creditos.*, 
                        SUM(CASE WHEN pagos.cestatuspago = 2 OR pagos.cestatuspago = 3 THEN 1 ELSE 0 END) AS status_2
                    FROM 
                        catcreditos AS creditos
                    INNER JOIN 
                        catcreditctlpagcust AS pagos 
                        ON creditos.icvecredito = pagos.icvecredito
                    WHERE 
                    creditos.icvecliente = ? AND creditos.estatus = 1";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icvecliente]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al consultar los creditos del cliente.' . $e->getMessage());
        }
    }

    /**
     * getRowCredit
     *
     * @param  int $id
     * @return array
     */
    public function getRowSingleCredit(int $idcreditCustomer): ?array
    {
        try {
            $sql = "SELECT *,
                        (SELECT SUM(dpaycapital) FROM catcreditctlpagcust WHERE icvecredito = ?) as tprestamo,
                        (SELECT SUM(dpayinteres) FROM catcreditctlpagcust WHERE icvecredito = ?) as tintereses,
                        (SELECT SUM(total) FROM catcreditctlpagcust WHERE icvecredito = ?) as ttotal
                    FROM catcreditctlpagcust
                    WHERE icvecredito = ? ";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$idcreditCustomer, $idcreditCustomer, $idcreditCustomer, $idcreditCustomer]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
        }
    }


    public function getReferedCustomer(int $icvecliente): ?array
    {
        try {
            $sql = "SELECT * FROM catclireferidos WHERE icvecliente = ?";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icvecliente]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al buscar los referidos del cliente.' . $e->getMessage());
        }
    }

    /**
     * insertRow
     *
     * @param  array $data
     * @return array
     */
    public function insertRow(array $data): ?array
    {
        try {
            $sql = "INSERT INTO catcreditos
                    (icvecliente, dmonto, dtfechasolicitud, dtfechafiniquito, estatus)
                    VALUES(?, ?, ?, ?, ?)";

            $statement = $this->acceso->prepare($sql);
            for ($i = 0; $i < count($data); $i++) {
                $statement->bindParam($i + 1, $data[$i]);
            }
            $statement->execute();

            $resp['msj'] = true;
            $resp['text'] = 'Se creó de manera correcta el crédito.';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al crear la nueva solicitud de crédito.' . $e->getMessage());
        }
    }

    /**
     * updateRowByClients
     *
     * @param  int $id
     * @param  array $data
     * @return array
     */
    public function updateRowByClients(int $id, array $data): ?array
    {
        try {
            $sql = "UPDATE catcreditos
                SET icvecliente = ? , dmonto = ?, dtfechasolicitud = ?, dtfechafiniquito = ?, estatus = ?
                WHERE icvecredito = $id";

            $statement = $this->acceso->prepare($sql);
            for ($i = 0; $i < count($data); $i++) {
                $statement->bindParam($i + 1, $data[$i]);
            }
            $statement->execute();

            $resp['msj'] = true;
            $resp['text'] = 'Se actualizó de manera correcta el crédito.';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al actualizar los datos del credito.' . $e->getMessage());
        }
    }

    /**
     * delete
     *  Este metodo sirve para cambiar el estatus del credito
     *  no nos sirve para eliminar este credito.
     * @param  int $id
     * @param  int $icvecliente
     * @return array
     */
    public function delete(int $id, int $icvecliente): ?array
    {
        try {
            $sql = "UPDATE catcreditos SET estatus = 3
                WHERE icvecredito = ? AND icvecliente = ?";

            $statement = $this->acceso->prepare($sql);
            $statement->execute([$id, $icvecliente]);

            $resp['msj'] = true;
            $resp['text'] = 'Se eliminó de manera correcta el crédito.';
            return $resp;
        } catch (PDOException $e) {
            throw new Error('Error al actualizar los datos del credito.' . $e->getMessage());
        }
    }


    public function updatePaysStatusCustomer(): ?array
    {
        try {
            $dataOPSql = CreditsClients::searchProcessSQL();
            $fechaEjecucion = $dataOPSql[0]['dtfechaejec'];
            $fechaEjec = new DateTime($fechaEjecucion);
            $fechaActual = new DateTime();

            $diferenciaDias = $fechaEjec->diff($fechaActual);
            $difDays = $diferenciaDias->days;
            if ($difDays >= 1) {
                $sql = "UPDATE catcreditctlpagcust
                SET total = CASE
                                WHEN DATEDIFF(current_date, dfechapago) = 3 THEN total + (total * 0.005)
                                WHEN DATEDIFF(current_date, dfechapago) = 4 THEN total + (total * 0.01)
                                WHEN DATEDIFF(current_date, dfechapago) = 5 THEN total + (total * 0.015)
                                WHEN DATEDIFF(current_date, dfechapago) = 6 THEN total + (total * 0.02)
                                WHEN DATEDIFF(current_date, dfechapago) >= 7 THEN total + (total * 0.025)
                            ELSE total
                            END,
                    cestatuspago = CASE
                                WHEN DATEDIFF(current_date, dfechapago) >= 7 THEN '3'
                                WHEN DATEDIFF(current_date, dfechapago) <= 6 AND DATEDIFF(current_date, dfechapago) >= 1  THEN '2'
                            ELSE cestatuspago
                            END
                WHERE cestatuspago != '3' AND cestatuspago != '1'";

                $statement = $this->acceso->prepare($sql);
                $resp['resp'] = $statement->execute();
                if ($resp['resp']) {
                    $resp['resp2'] = CreditsClients::updateProcessSQL();
                }
                return $resp;
            } else {
                $resp['resp'] = false;
                return $resp;
            }
        } catch (PDOException $e) {
            throw new Error('Error al actualizar los status de pago de los creditos.' . $e->getMessage());
        }
    }

    /**
     * readPaysPendingCredit 
     * Se leen cada uno de los pagos pendientes.
     * 
     * @param  mixed $idCredit
     * @return array
     */
    public function readPaysPendingCredit(int $idCredit, int $op): ?array
    {
        try {
            $sql = "SELECT * FROM catcreditctlpagcust 
                WHERE icvecredito = ? AND cestatuspago != 1 AND cestatuspago != 4";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$idCredit]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al leer los pagos pendientes del créditos. ' . $e->getMessage());
        }
    }


    /**
     * setChangeSchemeLate
     *
     * @param  int $idCustomrer
     * @param  int $idCredit
     * @param  int $interesAplicadoN
     * @param  int $cantseman
     * @param  float $amountNewScheme
     * @param  string $dtFechaLiquid
     * @param  int $typeOP
     * @return bool
     */
    public function setChangeSchemeLate(int $idCustomer, int $idCredit, float $interesAplicadoN, int $cantseman, float $amountNewScheme, string $dtFechaLiquid, int $typeOP = null): ?bool
    {
        $typeOP = (int) $typeOP;
        $resp = false;  // Establecemos por defecto en false
        $interesBase  = ($amountNewScheme * $interesAplicadoN) / 100;
        $prestamoBase = $amountNewScheme / $cantseman;
        $totalBase    = $prestamoBase + $interesBase;

        $fechaActual = new DateTime();
        $fechasPago = [];

        $this->acceso->beginTransaction();

        try {
            // Cambiar estatus del crédito
            $creditStatus = CreditsClients::setStatusCreditCustomer($idCredit, $typeOP);

            // Insertar el nuevo crédito
            $ctrlPaysNewCredit = CreditsClients::setCreditNewScheme($idCustomer, $cantseman, $amountNewScheme, $interesAplicadoN, $dtFechaLiquid);

            // Se cambia el estatus de los pagos del credito del cliente
            $exeSQL = CreditsClients::setStatusChangePaysLate($idCredit);
            

            if ($creditStatus && $exeSQL && !is_null($ctrlPaysNewCredit)) {

                for ($i = 1; $i <= $cantseman; $i++) {
                    $fechaPago = clone $fechaActual;
                    $fechaPago->modify('+' . $i . ' weeks');
                    $fechasPago[] = $fechaPago->format('Y-m-d');

                    // Intentar ejecutar la transacción de pago    
                    $sql = "INSERT INTO catcreditctlpagcust
                                (icvecredito, dpaycapital, dpayinteres, total, dfechapago, cestatuspago, statusop) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)";
                    $statement = $this->acceso->prepare($sql);
                    // var_dump($sql);
                    // exit('Estructura del SQL');
                    $statement->execute([
                        $ctrlPaysNewCredit,
                        $prestamoBase,
                        $interesBase,
                        $totalBase,
                        $fechasPago[$i - 1], // Uso correcto del índice
                        0,
                        0
                    ]);
                }


                $this->acceso->commit();
                $resp = true;
            }
        } catch (PDOException $e) {

            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }
            $this->monitor->setLog('Clientes', $e);  // Guardar el error en los logs
            return null;
        }

        return $resp;
    }

    
    /**
     * setCompletePay
     * Método para cambiar el estatus de pago de un plazo de pago
     * @param  mixed $idPaySetConfirm
     * @return array
     */
    public function setCompletePay(int $idPaySetConfirm): ?array{
        try{
            $this->acceso->beginTransaction();
            $resp         = array();
            $sql          = "UPDATE catcreditctlpagcust SET dfecharealpago = NOW(), cestatuspago = 1 WHERE icvedetallepago = ?";
            $statement    = $this->acceso->prepare($sql);
            $resp['resp'] = $statement->execute([$idPaySetConfirm]);
            $this->acceso->commit();
            return $resp;
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }
            $this->monitor->setLog('Clientes', $e);  // Guardar el error en los logs
            return null;
        }    
    }


    /**
     * setCreditNewScheme
     *
     * @param  int $idCustomer
     * @param  int $cantseman
     * @param  float $amount
     * @param  float $interesAplicado
     * @param  string $dtFechaLiquid
     * @return int
     */
    private function setCreditNewScheme(int $idCustomer, int $cantseman, float $amount, float $interesAplicado, string $dtFechaLiquid): ?int
    {
        try {
            $sqlCredit = "INSERT INTO catcreditos
                          (icvecliente, inumpagos, dmonto, dinteres, dtfechasolicitud, dtfechafiniquito, estatus)
                          VALUES(?, ?, ?, ?, NOW(), ?, 1)";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([
                $idCustomer,
                $cantseman,
                $amount,
                $interesAplicado,
                $dtFechaLiquid
            ]);

            return (int) $this->acceso->lastInsertId();  // Retorna el ID del nuevo crédito
        } catch (PDOException $e) {
            $this->monitor->setLog('Clientes', $e);
            return null;  // Retorna null en caso de error
        }
    }

    /**
     * setStatusCreditCustomer
     *
     * @param  int $idCredit Este es el ID del crédito que se está manejando
     * @param  int $typeOP Este es el tipo de operacion 
     * @return bool
     */
    private function setStatusCreditCustomer(int $idCredit, int $typeOP): ?bool
    {
        try {
            $sql = "UPDATE catcreditos SET estatus = ? WHERE icvecredito = ?";
            $statement = $this->acceso->prepare($sql);
            $resp = $statement->execute([$typeOP, $idCredit]);

            return $resp;  // Devuelve true si se ejecuta correctamente, false si falla
        } catch (PDOException $e) {
            $this->monitor->setLog('Clientes', $e);
            return null;  // Retorna null en caso de error
        }
    }

    /**
     * setStatusChangePaysLate
     * Se cambia el estatus de la tabla de control de pagos
     * donde 3 => retraso en pago, 2 => Está atrasado pero no se ha aplicado interés
     * donde 4 => Ya se negoció un esquema de pago por presentar un estaus de atraso
     * @param  int $idCredit
     * @return bool
     */
    private static function setStatusChangePaysLate(int $idCredit): ?bool
    {
        try {
            $sql = "UPDATE catcreditctlpagcust SET cestatuspago = 4, statusop = 1, dfecharealpago = NOW() WHERE icvecredito = ? AND cestatuspago in(0,1,2,3)";
            $statement = CreditsClients::$conn->prepare($sql);
            $resp = $statement->execute([$idCredit]);

            return $resp ? true : false;  // Retorna true si fue exitoso, false si no
        } catch (PDOException $e) {
            throw new Error('Error al actualizar los estatus de pagos del crédito: ' . $e->getMessage());
        }
    }


    /**
     * searchProcessSQL
     * Se busca el proceso para indentificar la ultima fecha de actualizacion
     * @return array
     */
    private static function searchProcessSQL(): ?array
    {
        try {
            $query = "SELECT * FROM bit_ctrlsql WHERE cnombreproceso = 'updatePaysStatusCustomer'";
            $statement = CreditsClients::$conn->prepare($query);
            $statement->execute();
            return  $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al actualizar el proceso de corrida status de pago de los creditos.' . $e->getMessage());
        }
    }

    /**
     * updateProcessSQL
     * Proceso por el cual se actualiza la bitacora de Procesos SQL.
     * @return bool
     */
    private static function updateProcessSQL(): ?bool
    {
        try {
            $query = "UPDATE bit_ctrlsql SET dtfechaejec = NOW() 
                    WHERE cnombreproceso = 'updatePaysStatusCustomer'";
            $statement = CreditsClients::$conn->prepare($query);
            $statement->execute();
            return  true;
        } catch (PDOException $e) {
            throw new Error('Error al actualizar el proceso de corrida status de pago de los creditos.' . $e->getMessage());
        }
        return false;
    }
}
