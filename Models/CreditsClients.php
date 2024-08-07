
<?php
include_once('Abstracts/OperationsPaysClient.php');
include_once('Conexion.php');

class CreditsClients extends OperationsPaysClient
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
                        SUM(CASE WHEN pagos.cestatuspago = 2 THEN 1 ELSE 0 END) AS status_2
                    FROM 
                        catcreditos AS creditos
                    INNER JOIN 
                        catcreditctlpagcust AS pagos 
                        ON creditos.icvecredito = pagos.icvecredito
                    WHERE 
                    creditos.icvecliente = ?";
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
                    WHERE icvecredito = ?";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$idcreditCustomer, $idcreditCustomer, $idcreditCustomer, $idcreditCustomer]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
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
                if($resp['resp']){
                    $resp['resp2'] = CreditsClients::updateProcessSQL();
                }
                return $resp;
            }else{
                $resp['resp'] = false;
                return $resp;
            }
           
        } catch (PDOException $e) {
            throw new Error('Error al actualizar los status de pago de los creditos.' . $e->getMessage());
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

    private static function updateProcessSQL(): ?bool{
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
