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
    public function insertarCliente(array $customerPersonalData): bool
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
                return true;
            }


            // return $resp;
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }

            $err = 'Error al insertar el cliente: ' . $e->getMessage();
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
                        VALUES(?, ?, ?, ?, NOW(), ?, 0)";
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
        // var_dump($creditDataPaysCustomer);
        // exit('Datos del control de pagos del prestamo del cliente');
        $prestamo     = $creditDataPaysCustomer['barprestamosoli'];
        $interesBase  = ($prestamo * $creditDataPaysCustomer['interesCredit']) / 100;
        $prestamoBase = $creditDataPaysCustomer['barprestamosoli'] / $creditDataPaysCustomer['cantseman'];
        $interes      = $interesBase * $creditDataPaysCustomer['cantseman'];
        $totalBase    = $prestamoBase + $interesBase;

        $fechaActual = new DateTime();
        $fechasPago = []; // Array para almacenar fechas como strings

        for ($i = 1; $i <= $creditDataPaysCustomer['cantseman']; $i++) {
            $fechaPago = clone $fechaActual;
            $fechaPago->modify('+' . $i . ' weeks');
            $fechasPago[] = $fechaPago->format('Y-m-d'); // Almacena la fecha como string en el array

            try {
                $sqlDetCredit = "INSERT INTO catcreditctlpagcust
                        (icvecredito, dpaycapital, dpayinteres, total, dfechapago, cestatuspago, statusop) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)";
                $statement = $this->acceso->prepare($sqlDetCredit);
                $statement->execute([
                    $idCredit,
                    $prestamoBase,
                    $interesBase,
                    $totalBase,
                    $fechasPago[$i - 1], // Uso correcto del array
                    0,
                    0
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
                                    longitud, latitud, creferencia)
                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
                $dataAddressCustomer['latitud'],
                $dataAddressCustomer['creferencia'],
            ]);
            return true;
        } catch (PDOException $e) {

            $err = 'Error al insertar la direccion del cliente:' . $e->getMessage();
            echo $err;
            $this->monitor->setLog('Clientes', $err);
            return false;
        }
    }

    /**
     * processDocument
     *
     * @param  int $idCliente
     * @param  Object $documents
     * @return void
     */
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
                            throw new Exception("Error al mover el archivo: " . $fileInfo['name']);
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


    private function insertReferredCustomer($idCliente, array $dataCustomerReferred): bool
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
            $query = "SELECT clientes.*, cattipocliente.*, catcreditos.*, pagos.*, 
                        IFNULL(pendientes.pagos_pendientes, 0) as pagos_pendientes
                    FROM clientes
                    LEFT JOIN cattipocliente ON clientes.icvetipocliente = cattipocliente.icvetipocliente
                    LEFT JOIN catcreditos ON catcreditos.icvecliente = clientes.icvecliente
                    LEFT JOIN (
                        SELECT icvecredito, MIN(dfechapago) as prox_vencimiento
                        FROM catcreditctlpagcust
                        WHERE cestatuspago IN(0,2,3 )
                        GROUP BY icvecredito
                    ) as prox_pagos ON catcreditos.icvecredito = prox_pagos.icvecredito
                    LEFT JOIN catcreditctlpagcust as pagos
                    ON prox_pagos.icvecredito = pagos.icvecredito 
                    AND prox_pagos.prox_vencimiento = pagos.dfechapago
                    LEFT JOIN (
                        SELECT icvecredito, COUNT(*) as pagos_pendientes
                        FROM catcreditctlpagcust
                        WHERE cestatuspago IN (2, 3)
                        GROUP BY icvecredito
                    ) as pendientes ON catcreditos.icvecredito = pendientes.icvecredito
                    WHERE catcreditos.estatus NOT IN (4, 5) 
                    ORDER BY pagos.total = 0 DESC, prox_pagos.prox_vencimiento ASC";
            $statement = $this->acceso->prepare($query);
            $resp = $statement->execute();

            if ($resp) {
                $this->monitor->setLog('Clientes', 'Lectura de clientes con todos sus datos se hizo de manera satisfactoria.');
            }



            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $err = 'Error al insertar el cliente: ' . $e->getMessage();
            $this->monitor->setLog('Clientes', $err);
            return [false, $err];
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

    public function getAccountsBanksCustomer(int $idcliente): array
    {
        try {
            $query = "SELECT 
                            ctascus.*, 
                            banco.*, 
                            CASE 
                                WHEN ctascus.itipocuenta = 1 THEN 'Cuenta de CLABE'
                            WHEN ctascus.itipocuenta = 2 THEN 'Tarjeta de Débito'
                                WHEN ctascus.itipocuenta = 3 THEN 'Cuenta Bancaria'
                                ELSE 'Tipo de cuenta desconocido'
                            END AS tipo_cuenta_desc
                        FROM 
                            catctasbankscli AS ctascus
                        INNER JOIN 
                            catbancos AS banco ON ctascus.icvebanco = banco.icvebanco
                        WHERE 
                            ctascus.icvecliente = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idcliente]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta de las cuentas bancarias: ' . $e->getMessage();
        }
    }

    /**
     * getFilesCustomer
     *
     * @param int $idcliente
     * @return array
     */
    public function getFilesCustomer(int $idcliente): array
    {
        try {
            $query = "SELECT cli_documents.icvedoctoscli, cli_documents.icvecliente, cli_documents.crutadocto,
                        cattipodocto.ctipodocto, cli_documents.cextensiondocto 
                        FROM cli_documents 
                        INNER JOIN cattipodocto on cli_documents.itipodocto = cattipodocto.idcattipodocto
                        WHERE cli_documents.icvecliente  = ?";
            $statement = $this->acceso->prepare($query);
            $statement->execute([$idcliente]);

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta de los documentos del cliente: ' . $e->getMessage();
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
     * updateFileCustomer
     * Método que sirve para actualizar el archivo cargado por parte del cliente
     * @param  mixed $dataFile
     * @return array
     */
    public function updateFileCustomer(array $dataFile): ?array
    {
        try {
            $ruta = dirname($dataFile['routeFile']);
            // Genera un nuevo nombre único para el archivo, conservando la extensión original
            $extension = pathinfo($dataFile['fileUploadNew']['name'], PATHINFO_EXTENSION);
            $nuevoNombre = 'cliente_' . date('Ymd_His') . '.' . $extension;  

            // Construye la ruta completa con el nuevo nombre del archivo
            $rutaCompleta = $ruta . '/' . $nuevoNombre;
            $respProcessFUpload = $this->processFileCustomer($dataFile['fileUploadNew']['tmp_name'], $rutaCompleta);
            $respProcessFDelete = $this->deleteFileCustomer($dataFile['routeFile']);
            if ($respProcessFUpload && $respProcessFDelete) {
                $this->acceso->beginTransaction();
                $sqlSTM = "UPDATE cli_documents SET crutadocto = ? WHERE icvedoctoscli = ?";
                $statement = $this->acceso->prepare($sqlSTM);
                $answer = $statement->execute([$rutaCompleta, $dataFile['idDocFile']]);
                if($answer){
                    $this->acceso->commit();
                    $resp['respuesta'] = true;
                }else{
                    $this->acceso->rollBack();
                    $resp['respuesta'] = false;
                }
                return $resp;
            }
            $this->monitor->setLog('Clientes - Eliminación y carga de archivo nuevo', 'Se quita el archivo y se sube el nuevo');  // Guardar el log de operacion en los logs
        } catch (PDOException $e) {
            if ($this->acceso->inTransaction()) {
                $this->acceso->rollBack();
            }
            $this->monitor->setLog('Clientes', $e);  // Guardar el error en los logs
            return null;
        }
    }

    /**
     * get_AsentamientosByZipCode
     *
     * @param  string $zipCode
     * @return array
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

    /**
     * deleteFileCustomer
     * Se elimina el archivo indicado son los de la documentación comprobatoria
     * @param  string $routeFile
     * @return bool
     */
    private function deleteFileCustomer(string $routeFile): ?bool
    {
        try {
            $processFile = unlink($routeFile);
            return $processFile;
        } catch (Exception $e) {
            $this->monitor->setLog('Clientes - Eliminación documentos', $e);  // Guardar el error en los logs
            return null;
        }
    }

    /**
     * processFileCustomer
     * Método paa subir archivo
     * @param  string $file
     * @param  string $ruta
     * @return bool
     */
    private function processFileCustomer(string $file, string $ruta): ?bool
    {
        try {
            $processFile = move_uploaded_file($file, $ruta);
            return $processFile;
        } catch (Exception $e) {
            $this->monitor->setLog('Clientes - Eliminación documentos', $e);  // Guardar el error en los logs
            return null;
        }
    }
}
