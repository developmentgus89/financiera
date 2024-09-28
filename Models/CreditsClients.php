
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
    private static $monit;

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
        self::$monit = $this->monitor;
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
     * 23092024 - G Angulo
     * Método para cambiar el estatus de pago de un plazo de pago
     * @param  array $idPaySetConfirm
     * @return array
     */
    public function setCompletePay(array $dataPaymentCustomer): ?array
    {
        try {
            // Procesar el documento del pago
            $respDocProcess = $this->processDocumentPayment($dataPaymentCustomer['voucherPaySet']);

            if ($respDocProcess['resp']) {
                $this->acceso->beginTransaction();
                $resp = array();

                // Montos de pagos totales y restantes
                $pagoRestante = $dataPaymentCustomer['txtImportePago'];
                $icveCredito = $dataPaymentCustomer['icvecredito'];
                $icveCartera = $dataPaymentCustomer['icvecartera'];

                // Consulta los pagos pendientes del crédito, ordenados por fecha de pago ascendente
                $sqlPagosPendientes = "
                    SELECT icvedetallepago, total, dpaycapital, dpayinteres, crecibospago 
                    FROM catcreditctlpagcust 
                    WHERE icvecredito = ? AND cestatuspago IN (0, 2, 3) 
                    ORDER BY dfechapago ASC";
                $statementPagosPendientes = $this->acceso->prepare($sqlPagosPendientes);
                $statementPagosPendientes->execute([$icveCredito]);
                $pagosPendientes = $statementPagosPendientes->fetchAll(PDO::FETCH_ASSOC);

                $resp['pagos_actualizados'] = [];

                foreach ($pagosPendientes as $pago) {
                    // Recuperar y decodificar los recibos anteriores
                    $recibosPago = $pago['crecibospago'] ? json_decode($pago['crecibospago'], true) : [];

                    // Añadir la nueva entrada de recibo con ruta, monto y descripción
                    $reciboActual = [
                        $respDocProcess['doc'],   // Ruta del archivo
                        min($pagoRestante, $pago['total']),  // Monto pagado (lo máximo que cubre este pago)
                        'Pago por adelantado'      // Descripción
                    ];
                    $recibosPago[] = $reciboActual; // Añadir el nuevo recibo al arreglo

                    // Convertir de nuevo a formato JSON
                    $recibosPagoJson = json_encode($recibosPago);

                    // Si el pago restante cubre completamente este periodo
                    if ($pagoRestante >= $pago['total']) {
                        // Actualiza el pago como completado (cestatuspago = 1)
                        $sqlUpdatePago = "
                            UPDATE catcreditctlpagcust 
                            SET crecibospago = ?, dfecharealpago = NOW(), cestatuspago = 1 
                            WHERE icvedetallepago = ?";
                        $statementUpdate = $this->acceso->prepare($sqlUpdatePago);
                        $statementUpdate->execute([$recibosPagoJson, $pago['icvedetallepago']]);

                        // Resta el monto cubierto por este pago
                        $pagoRestante -= $pago['total'];
                        $resp['pagos_actualizados'][] = $pago['icvedetallepago'];
                    } else {
                        // Si el pago restante es parcial para este periodo
                        $nuevoTotal = $pago['total'] - $pagoRestante; // Actualiza el total restante de este pago
                        $sqlUpdatePago = "
                            UPDATE catcreditctlpagcust 
                            SET crecibospago = ?, dfecharealpago = NOW(), total = ?, cestatuspago = 0 
                            WHERE icvedetallepago = ?";
                        $statementUpdate = $this->acceso->prepare($sqlUpdatePago);
                        $statementUpdate->execute([$recibosPagoJson, $nuevoTotal, $pago['icvedetallepago']]);

                        $resp['pagos_actualizados'][] = $pago['icvedetallepago'];
                        break; // Se ha usado todo el monto, salimos del loop
                    }
                }
                // BUG: No se actualiza correctamente el saldo de la cartera
                // Actualizar el saldo en la tabla catcarteras
                
                $sqlUpdateCartera = "
                        UPDATE catcarteras 
                        SET dsaldo = dsaldo + ? 
                        WHERE icvecartera = ?";
                $statementUpdateCartera = $this->acceso->prepare($sqlUpdateCartera);
                $statementUpdateCartera->execute([$dataPaymentCustomer['txtImportePago'], $icveCartera]);


                // Si se cubren todos los pagos correctamente
                $this->acceso->commit();
                return $resp;
            } else {
                $this->acceso->rollBack(); // Si el procesamiento del documento falla, hacer rollback
            }

            return null;
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }
            $this->monitor->setLog('Clientes', $e);  // Guardar el error en los logs
            return null;
        }
    }




    /**
     * getDataPayCredit
     * Método para obtener solamente los datos del periodo de pago
     * @param  mixed $idPayCredit
     * @return array
     */
    public function getDataPayCredit($idPayCredit): ?array
    {
        try {
            $sql = "SELECT clientes.icvecartera , catcreditos.icvecliente , catcreditos.dmonto, catcreditctlpagcust.* FROM catcreditctlpagcust
	                    INNER JOIN catcreditos on  catcreditctlpagcust.icvecredito = catcreditos.icvecredito
	                    INNER JOIN clientes on catcreditos.icvecliente = clientes.icvecliente 
                    WHERE icvedetallepago = ?";
            $statement = $this->acceso->prepare($sql);
            $resp = $statement->execute([$idPayCredit]);
            $this->monitor->setLog('Clientes', "Obtencion de los datos del pago => $resp");
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->monitor->setLog('Clientes', $e->getMessage());
        }
    }
    
    /**
     * getDataNumberPay
     *
     * @param  int $idNumberPay
     * @return array
     */
    public function getDataNumberPay($idNumberPay): ?array
    {
        try {
            $sql = "SELECT catcreditctlpagcust.icvedetallepago, catcreditctlpagcust.crecibospago  
                    FROM catcreditctlpagcust
                    WHERE catcreditctlpagcust.icvedetallepago = ?";
            $statement = $this->acceso->prepare($sql);
            $resp = $statement->execute([$idNumberPay]);
            $this->monitor->setLog('Clientes', "Obtencion de los datos del pago => $resp");
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->monitor->setLog('Clientes', $e->getMessage());
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
            $resp = $statement->execute();
            if ($resp) {
                CreditsClients::$monit->setLog('Clientes', 'Actualizacion correcta del procedimiento: updatePaysStatusCustomer.');
            }
            return  true;
        } catch (PDOException $e) {
            $err = 'Error al actualizar el proceso de corrida status de pago de los creditos:' . $e->getMessage();
            CreditsClients::$monit->setLog('Clientes', $err);
            return [false, $err];
        }
        return false;
    }


    /**
     * processDocumentPayment
     *
     * @param  Object $file / en si es de tipo Object por el file
     * @return bool
     */
    private function processDocumentPayment($file): ?array
    {
        $randomNumber = str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);

        // Extraer la extensión del archivo original
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);

        // Renombrar el archivo con el nuevo nombre
        $newFileName = "voucherCustomer_" . $randomNumber . "." . $fileExtension;
        $resp = array();
        $targetPath = "../docs/docCustomersPayments/" . $newFileName;
        // Se comprueba en primera instancia si el archivo no viene dañado
        if (!empty($file['tmp_name']) && $file['error'] == 0) {
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                $resp['doc']  = $targetPath;
                $resp['resp'] = true;
            } else {
                $resp['doc']  = null;
                $resp['resp'] = false;
                throw new Exception("Error al mover el archivo: " . $file['name']);
            }
        }

        return $resp;
    }
}
