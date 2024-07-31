<?php
include_once('Conexion.php');
include_once('Log/Log.php');
date_default_timezone_set('America/Mexico_City');

class Customer
{
    private $conexion;
    private $monitor;
    var $acceso;

    public function __construct()
    {
        $db = new Conexion();
        $this->monitor = new Log();
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

            // Inserción de los datos del cliente
            $personalData = $customerPersonalData[0];
            $query = "INSERT INTO clientes (cclinombre, capaterno, camaterno, iedad,
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

            // Inserta el credito 
            $creditDataCustomer = $customerPersonalData[1];
            $respCredit         = $this->insertCreditCustomer($lastInsertId, $creditDataCustomer);
            $idCredit           = $this->acceso->lastInsertId();

            //Inserta el control de pagos del credito que se inserto
            $respCreditPays = $this->insertCreditPaysCustomer($idCredit, $creditDataCustomer);

            // Se inserta solamente la cuenta bancaaria a depositar
            $ctaBankCustomer = $customerPersonalData[2];
            $respCtaBank     = $this->insertCtaBankCustomer(
                $lastInsertId,
                $ctaBankCustomer['selCatIcveBancoCli'],
                $ctaBankCustomer['ctabancariacli'],
                $ctaBankCustomer['typeAccountBankCli']
            );

            // Se inserta la direccion
            $respDataAddress  = $this->insertAddressCustomer($lastInsertId, $customerPersonalData[3]);

            // Con esto se insertan los documentos
            $respDataDocs     = $this->processDocument($lastInsertId, $customerPersonalData[4]);
            if (empty($customerPersonalData[5])) {
                $respDataReferido = true;
            } else {
                $respDataReferido = $this->insertReferredCustomer($lastInsertId, $customerPersonalData[5]);
            }




            if (!$respCredit) {
                throw new PDOException('Error al insertar los datos del crédito.');
            }



            // Devuelve true si todo es correcto
            $resp = array();
            $resp['idCliente']        = (int) $lastInsertId;
            $resp['opDatPersonales']  = true;
            $resp['opDataCredit']     = $respCredit;
            $resp['opDataCreditPays'] = $respCreditPays;
            $resp['opDataCtaBank']    = $respCtaBank;
            $resp['opDataAddress']    = $respDataAddress;
            $resp['opDataDocsCli']    = $respDataDocs;
            $resp['opDataReferred']   = $respDataDocs;

            function verifRespBool($arr)
            {
                foreach ($arr as $key => $val) {
                    if ($key !== 'idCliente' && !$val) {
                        return false;
                    }
                }
                return true;
            }

            if (verifRespBool($resp)) {
                $this->acceso->commit();
                $this->monitor->setLog('Clientes', 'Datos generales del cliente insertados correctamenete');
            }


            return $resp;
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }

            $err = 'Error al insertar el cliente: ' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return [false, $err];
        }
    }

    /**
     * insertCreditCustomer
     *
     * @param  int $idCliente
     * @param  int $inumpagos
     * @param  float $importeCred
     * @param  float $interes
     * @param  string $fechaLiquid
     * @return bool
     */
    private function insertCreditCustomer(int $idCliente, array $creditDataCustomer): bool
    {
        try {
            $sqlCredit = "INSERT INTO catcreditos
                        (icvecliente, inumpagos, dmonto, dinteres, dtfechasolicitud, dtfechafiniquito, estatus)
                        VALUES(?, ?, ?, ?, NOW(), ?, 1)";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([
                $idCliente,
                $creditDataCustomer['cantseman'],
                $creditDataCustomer['barprestamosoli'],
                $creditDataCustomer['interesCredit'],
                $creditDataCustomer['dtFechaLiquid']
            ]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar el credito del cliente:' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return false;
        }
    }


    public function insertCreditPaysCustomer(int $idCredit, array $creditDataPaysCustomer)
    {
        $prestamo = $creditDataPaysCustomer['barprestamosoli'];
        $interesBase = ($prestamo * $creditDataPaysCustomer['interesCredit']) / 100;
        $prestamoBase = $creditDataPaysCustomer['barprestamosoli'] / $creditDataPaysCustomer['cantseman'];
        $interes = $interesBase * $creditDataPaysCustomer['cantseman'];

        $fechaActual = new DateTime();
        $fechasPago = []; // Array para almacenar fechas como strings

        for ($i = 1; $i <= $creditDataPaysCustomer['cantseman']; $i++) {
            $fechaPago = clone $fechaActual;
            $fechaPago->modify('+' . $i . ' weeks');
            $fechasPago[] = $fechaPago->format('Y-m-d'); // Almacena la fecha como string en el array

            try {
                $sqlDetCredit = "INSERT INTO catcreditctlpagcust
                        (icvecredito, dpaycapital, dpayinteres, dfechapago, cestatuspago) 
                        VALUES (?, ?, ?, ?, ?)";
                $statement = $this->acceso->prepare($sqlDetCredit);
                $statement->execute([
                    $idCredit,
                    $prestamoBase,
                    $interesBase,
                    $fechasPago[$i - 1], // Uso correcto del array
                    '0'
                ]);
            } catch (PDOException $e) {
                $err = 'Error al insertar el detalle de pagos del prestamo del cliente: ' . $e->getMessage();
                echo $err;
                $this->monitor->setLog('Clientes', $err);
                return false; // Sale del bucle en caso de error
            }
        }
        return true; // Devuelve true si todas las inserciones son exitosas
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
    private function insertCtaBankCustomer($idCliente, $icvebanco, $cnumcuenta, $tipocuenta): bool
    {
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
            $this->monitor->setLog('Clientes', $err);
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
    private function insertAddressCustomer(int $idCliente, array $dataAddressCustomer): bool
    {
        try {
            $sqlCredit = "INSERT INTO domicilio
                                    (icvecliente, ccalle, cnuminterior, cnumexterior,
                                    pricalle, segcalle, ccolonia, cdelegmunicipio, 
                                    centfederativa, cpais, ccodpostal, cfotofrente, 
                                    longitud, latitud)
                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $statement = $this->acceso->prepare($sqlCredit);
            $statement->execute([
                $idCliente,
                $dataAddressCustomer['ccalle'],
                $dataAddressCustomer['numinterior'],
                $dataAddressCustomer['numexterior'],
                $dataAddressCustomer['pricalle'],
                $dataAddressCustomer['segcalle'],
                $dataAddressCustomer['coloniadir'],
                $dataAddressCustomer['municipiodir'],
                $dataAddressCustomer['entidaddir'],
                'MÉXICO',
                $dataAddressCustomer['cp'],
                'fotodomicilio/' . $idCliente,
                $dataAddressCustomer['longitud'],
                $dataAddressCustomer['latitud']
            ]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar la direccion del cliente:' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return false;
        }
    }

    private function processDocument(int $idCliente, $documents)
    {
        $paths = [
            'fileidComprobanteDom' => "../docs/docCliAddress/",
            'fileidINEidentif'     => "../docs/docCliINE/",
            'fileidCompIngresos'   => "../docs/docCliCompIng/" // Archivo opcional
        ];

        $types = [
            'fileidComprobanteDom' => 1,
            'fileidINEidentif'     => 2,
            'fileidCompIngresos'   => 3 // Archivo opcional
        ];

        try {
            foreach ($documents as $key => $fileInfo) {
                if (!empty($fileInfo['tmp_name']) && $fileInfo['error'] == 0) {
                    $documentName = basename($fileInfo['name']);
                    $documentExtension = pathinfo($fileInfo['name'], PATHINFO_EXTENSION);

                    if (array_key_exists($key, $paths) && array_key_exists($key, $types)) {
                        $documentType = $types[$key];
                        $documentPath = $paths[$key];

                        // Construct the full path with customer ID
                        $fullDocumentName = $idCliente . '_' . $documentName;
                        $fullPath = $documentPath . $fullDocumentName;

                        // Ensure the directory exists
                        if (!is_dir($documentPath)) {
                            mkdir($documentPath, 0777, true);
                        }

                        // Move the uploaded file to the desired directory
                        if (move_uploaded_file($fileInfo['tmp_name'], $fullPath)) {
                            // Si el movimiento del archivo es satisfactorio se inserta el registro
                            $this->insertDocument($idCliente, $documentType, $fullPath, $fullDocumentName, $documentExtension);
                        } else {
                            // Handle the error if the file couldn't be moved
                            throw new Exception("Error moving the file: " . $fileInfo['name']);
                        }
                    } else {
                        throw new Exception("Invalid file key or optional file missing: " . $key);
                    }
                }
            }
        } catch (Exception $e) {
            $err = 'Error al insertar los documentos de comprobacion del cliente: ' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes - Documentos', $err);
            return false;
        }

        return true;
    }



    /**
     * insertDocument
     *
     * @param  int $customerId
     * @param  int $tipoDocumento
     * @param  mixed $rutaDocumento
     * @param  mixed $cnombreDocto
     * @param  mixed $documentExtension
     * @return bool
     */
    private function insertDocument($customerId, $tipoDocumento, $rutaDocumento, $cnombreDocto, $documentExtension): bool
    {
        try {
            $query = "INSERT INTO cli_documents (icvecliente, itipodocto, crutadocto, cnombredocto, cextensiondocto) 
                        VALUES (?, ?, ?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$customerId, $tipoDocumento, $rutaDocumento, $cnombreDocto, $documentExtension]);
            return true;
        } catch (PDOException $e) {
            $err = 'Error al insertar los registros de los documentos del cliente:' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return false;
        }
    }


    private function insertReferredCustomer($idCliente, array $dataCustomerReferred) : bool
    {
        try {
            $query = "INSERT INTO catclireferidos (icvecliente, cnombreref, ctelefonoref, cobsnotref) 
            VALUES (?, ?, ?, ?)";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $idCliente, 
                $dataCustomerReferred['nombreReferido'], 
                $dataCustomerReferred['telefonoReferido'], 
                $dataCustomerReferred['observacionesReferido']
            ]);
            return true;
        } catch (PDOException $e) {
            $err = 'Error al insertar el registro del referido del cliente:' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return false;
        }
    }

    /**
     * obtenerClientes
     *
     * @return array
     */
    public function obtenerClientes(): array
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

    public function rowReadCustomer($id): array
    {
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
