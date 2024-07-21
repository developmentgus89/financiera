<?php
include_once('Conexion.php');
include_once('Log/Log.php');

class Customer
{
    private $conexion;
    private $error;
    var $acceso;

    public function __construct()
    {
        $db = new Conexion();
        $this->error = new Log();
        $this->acceso = $db->pdo;
    }

    /**
     * insertarCliente
     *
     * @param  array[] $customerPersonalData
     * @return array
     */
    public function insertarCliente(array $customerPersonalData): array
    {

        try {
            
            $this->acceso->beginTransaction();
            $personalData = $customerPersonalData[0];
            $query = "INSERT INTO clientes (cnombre, capaterno, camaterno, iedad,
                        icvetipocliente, dfechanaciemiento, dfechaalta, cestatus, ctelefono) 
                        VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?, ?
                        )";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $personalData['cnombre'],
                $personalData['capelpat'],
                $personalData['capelmat'],
                $personalData['cedad'],
                $personalData['typeClient'],
                $personalData['cdatebirthday'],
                $personalData['clientDateRegister'],
                $personalData['clienteStatus'],
                $personalData['ctelefono']
            ]);

            // Se extrae el ID del último registro
            $lastInsertId = $this->acceso->lastInsertId();
            if (empty($lastInsertId)) {
                throw new PDOException('No se pudo obtener el ID del último registro insertado.');
            }

            $creditDataCustomer = $customerPersonalData[1];
            $respCredit = $this->insertCreditCustomer(
                $lastInsertId,
                $creditDataCustomer['barprestamosoli'],
                $creditDataCustomer['interesCredit'],
                $creditDataCustomer['dtFechaLiquid']
            );

            $ctaBankCustomer = $customerPersonalData[2];
            $respCtaBank = $this->insertCtaBankCustomer(
                                    $lastInsertId,
                                    $ctaBankCustomer['selCatIcveBancoCli'],
                                    $ctaBankCustomer['ctabancariacli'],
                                    $ctaBankCustomer['typeAccountBankCli']
            );

            $dataAddress = $customerPersonalData[3];
            $respDataAddress = $this->insertAddressCustomer($lastInsertId, $dataAddress);


            if (!$respCredit) {
                throw new PDOException('Error al insertar los datos del crédito.');
            }

            $this->acceso->commit();


            // Devuelve true si todo es correcto
            $resp = array();
            $resp['idCliente']       = (int) $lastInsertId;
            $resp['opDatPersonales'] = true;
            $resp['opDataCredit']    = $respCredit;
            $resp['opDataCtaBank']   = $respCtaBank;
            $resp['opDataAddress']   = $respDataAddress;
            return $resp;
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }

            $err = 'Error al insertar el cliente: ' . $e->getMessage();
            echo $err;
            $this->error->setLog('Clientes', $err);
            return [false, $err];
        }
    }
    
    /**
     * insertCreditCustomer
     *
     * @param  int $idCliente
     * @param  float $importeCred
     * @param  float $interes
     * @param  string $fechaLiquid
     * @return bool
     */
    private function insertCreditCustomer($idCliente, $importeCred, $interes, $fechaLiquid): bool
    {
        try {
            $sqlCredit = "INSERT INTO catcreditos
                        (icvecliente, dmonto, dinteres, dtfechasolicitud, dtfechafiniquito, estatus)
                        VALUES(?, ?, ?, NOW(), ?, 1)";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([$idCliente, $importeCred, $interes, $fechaLiquid]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar el credito del cliente:' . $e->getMessage();
            echo $err;
            $this->error->setLog('Clientes', $err);
            return false;
        }
    }
    
    /**
     * insertCtaBankCustomer
     *
     * @param  int $idCliente
     * @param  int $icvebanco
     * @param  string $cnumcuenta
     * @param  int $tipocuenta
     * @return bool
     */
    private function insertCtaBankCustomer($idCliente, $icvebanco, $cnumcuenta, $tipocuenta): bool{
        try {
            $sqlCredit = "INSERT INTO catctasbankscli
                            (icvecliente, icvebanco, cnumctabancaria, itipocuenta)
                            VALUES(?, ?, ?, ?)";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([$idCliente, $icvebanco, $cnumcuenta, $tipocuenta]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar la cuenta bancaria del cliente:' . $e->getMessage();
            echo $err;
            $this->error->setLog('Clientes', $err);
            return false;
        }
    }
    
    /**
     * insertAddressCustomer
     *
     * @param  int $idCliente
     * @param  array $dataAddressCustomer
     * @return bool
     */
    private function insertAddressCustomer(int $idCliente, array $dataAddressCustomer) : bool{
        try {
            $sqlCredit = "INSERT INTO financiera.domicilio
                                    (icvecliente, ccalle, cnuminterior, cnumexterior, 
                                    ccolonia, cdelegmunicipio, centfederativa, cpais, 
                                    ccodpostal, cfotofrente, longitud, latitud)
                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([
                            $idCliente, 
                            $dataAddressCustomer['ccalle'],
                            $dataAddressCustomer['numinterior'],
                            $dataAddressCustomer['numexterior'],
                            $dataAddressCustomer['coloniadir'],
                            $dataAddressCustomer['municipiodir'],
                            $dataAddressCustomer['entidaddir'],
                            'MÉXICO',
                            $dataAddressCustomer['cp'],
                            'fotodomicilio/'.$idCliente,
                            $dataAddressCustomer['longitud'],
                            $dataAddressCustomer['latitud']
                        ]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar la direccion del cliente:' . $e->getMessage();
            echo $err;
            $this->error->setLog('Clientes', $err);
            return false;
        }
    }


    //
    private function insertDocumentsCustomer() : bool{
        return false;
    }
    
    /**
     * obtenerClientes
     *
     * @return array
     */
    public function obtenerClientes() : array
    {
        try {
            $query = "SELECT * FROM clientes 
                    inner join cattipocliente 
                    on clientes.icvetipocliente = cattipocliente.icvetipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function rowReadCustomer($id) : array{
        try {
            $query = "SELECT * FROM clientes 
                        LEFT JOIN cattipocliente on clientes.icvetipocliente = cattipocliente.icvetipocliente
                        LEFT JOIN domicilio on clientes.icvecliente = domicilio.icvecliente
                        LEFT JOIN dir_catcolasen on domicilio.ccolonia = dir_catcolasen.icvecatcolonia 
                        WHERE clientes.icvecliente = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$id]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function obtenerTiposClientes()
    {
        try {
            $query = "SELECT * FROM cattipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    /**
     * get_AsentamientosByZipCode
     *
     * @param  string $zipCode
     * @return void
     */
    public function get_AsentamientosByZipCode($zipCode): array
    {
        try {
            $query = "SELECT * FROM dir_catcolasen 
                        INNER JOIN dir_catlocmun ON dir_catlocmun.icvecatlocmun = dir_catcolasen.icvecatlocmun
                        INNER JOIN dir_catestados ON dir_catlocmun.icvecatestprovincia = dir_catestados.icvecatestprovincia
                        INNER JOIN dir_catpaises ON dir_catestados.iddircatpais = dir_catpaises.iddircatpais 
                        WHERE codpostal like '%$zipCode%'";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta para códigos postales: ' . $e->getMessage();
        }
    }
}
