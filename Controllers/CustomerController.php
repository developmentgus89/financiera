<?php
require_once '../Models/Customer.php';
require_once '../Models/CreditsClients.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $operation = $_POST['operation'];
    $customer = new Customer();
    $credits  = new CreditsClients();
    global $clientes;

    switch ($operation) {
        case 'create':
            $customerData = array();
            // Datos Personales del cliente
            $customerData[0]['cnombre']            = $_POST['cnombre'];
            $customerData[0]['capelpat']           = $_POST['capelpat'];
            $customerData[0]['capelmat']           = $_POST['capelmat'];
            $customerData[0]['ctelefono']          = $_POST['ctelefono'];
            $customerData[0]['cedad']              = $_POST['cedad'];
            $customerData[0]['typeClient']         = $_POST['typeClient'];
            $customerData[0]['cdatebirthday']      = $_POST['cdatebirthday'];
            $customerData[0]['clientDateRegister'] = $_POST['clientDateRegister'];
            $customerData[0]['clienteStatus']      = $_POST['clienteStatus'];

            // Datos del prestamo
            $customerData[1]['cantseman']       = $_POST['cantseman'];
            $customerData[1]['barprestamosoli'] = $_POST['barprestamosoli'];
            $customerData[1]['interesCredit']   = $_POST['interesCredit'];
            $customerData[1]['dtFechaLiquid']   = $_POST['dtFechaLiquid'];

            // Datos de la cuenta bancaria
            $customerData[2]['ctabancariacli']     = $_POST['ctabancariacli'];
            $customerData[2]['typeAccountBankCli'] = $_POST['typeAccountBankCli'];
            $customerData[2]['selCatIcveBancoCli'] = $_POST['selCatIcveBancoCli'];

            // Datos del domicilio
            $customerData[3]['ccalle']       = $_POST['ccalle'];
            $customerData[3]['numexterior']  = $_POST['numexterior'];
            $customerData[3]['numinterior']  = $_POST['numinterior'];
            $customerData[3]['pricalle']     = $_POST['pricalle'];
            $customerData[3]['segcalle']     = $_POST['segcalle'];
            $customerData[3]['cp']           = $_POST['cp'];
            $customerData[3]['entidaddir']   = $_POST['entidaddir'];
            $customerData[3]['municipiodir'] = $_POST['municipiodir'];
            $customerData[3]['coloniadir']   = $_POST['coloniadir'];
            $customerData[3]['latitud']      = $_POST['latitud'];
            $customerData[3]['longitud']     = $_POST['longitud'];

            // Datos de la documentación comprobatoria
            $customerData[4]['fileidComprobanteDom'] = $_FILES['fileidComprobanteDom'];
            $customerData[4]['fileidINEidentif']     = $_FILES['fileidINEidentif'];
            $customerData[4]['fileidCompIngresos'] = (
                isset($_FILES['fileidCompIngresos']) && $_FILES['fileidCompIngresos']['error'] == 0)
                ? $_FILES['fileidCompIngresos']
                : null;

            // Datos de la persona que refirió a la persona
            $customerData[5]['nombreReferido']        = $_POST['nombreReferido'];
            $customerData[5]['telefonoReferido']      = $_POST['telefonoReferido'];
            $customerData[5]['observacionesReferido'] = $_POST['observacionesReferido'];

            // Crear cliente
            $resp = $customer->insertarCliente($customerData);
            echo json_encode($resp);
            break;


        case 'read':
            // Leer clientes
            $clientes = $customer->obtenerClientes();
            echo json_encode($clientes);
            break;
        case 'update':
            // Actualizar cliente
            $id        = $_POST['id'];
            $icvegrado = $_POST['icvegrado'];
            $name      = $_POST['name'];
            $address   = $_POST['address'];
            $mobile    = $_POST['mobile'];

            // $customer->actualizarCliente($id, $icvegrado, $name, $address, $mobile);
            break;
        case 'delete':
            // Eliminar cliente
            $id = $_POST['id'];
            // $customer->eliminarCliente($id);
            break;

        case 'row':
            // Eliminar cliente
            $id = $_POST['idCliente'];

            $cliente = $customer->rowReadCustomer($id);
            echo json_encode($cliente);
            break;
        case 'readtypesclients':
            // Leer tipos de cliente
            $tiposCliente = $customer->obtenerTiposClientes();
            echo json_encode($tiposCliente);
            break;

        case 'readRowaAccountsBanks':
            $icvecliente   = $_POST['icvecliente'];
            $accountsBanks = $customer->getAccountsBanksCustomer($icvecliente);
            echo json_encode($accountsBanks);
            break;
        case 'readDoctosCustomer':
            $icvecliente = $_POST['icvecliente'];
            $doctosCustomer = $customer->getFilesCustomer($icvecliente);
            echo json_encode($doctosCustomer);
            break;
        case 'rowCreditsCustomer':
            $icvecliente = $_POST['icvecliente'];
            $rowCredits = $credits->getRowsCreditsByClient($icvecliente);
            echo json_encode($rowCredits);
            break;

        case 'readReferedCustomer':
            $icvecliente = $_POST['icvecliente'];
            $rowsRefered = $credits->getReferedCustomer($icvecliente);
            echo json_encode($rowsRefered);
            break;
        
        case 'readHistoryCreditsCustomer':
            $icvecliente        = $_POST['icvecliente'];
            $rowsHistoryCredits = $credits->getHistoryCreditsCustomer($icvecliente);
            echo json_encode($rowsHistoryCredits);

            break;

        case 'rowCreditCusDetail':
            $idcreditCustomer = $_POST['idcreditCustomer'];
            $rowCreditDetails = $credits->getRowSingleCredit($idcreditCustomer);
            echo json_encode($rowCreditDetails);
            break;
            //Obetener las colonias de acuerdo al codigo postal
        case 'readZipCode':
            $zipcode = $_POST['zipcode'];
            $rowsZipCode = $customer->get_AsentamientosByZipCode($zipcode);
            echo json_encode($rowsZipCode);
            break;

        case 'updatePaysStatusCustomer':
            $resp = $credits->updatePaysStatusCustomer();
            echo json_encode($resp);
            break;

        case 'readPaysPendingCredit':
            $idCredit = $_POST['idCredit'];
            $op       = $_POST['op'];
            $resp     = $credits->readPaysPendingCredit($idCredit, $op);
            echo json_encode($resp);
            break;

        case 'aplyChangeSchemePaysLate':
            $idCustomer       = $_POST['idCustomer'];
            $idCredit         = $_POST['idCredit'];
            $interesAplicadoN = $_POST['interesAplicadoN'];
            $cantseman        = $_POST['cantseman'];
            $amountNewScheme  = $_POST['amountNewScheme'];
            $typeOP           = $_POST['typeOP'];
            $dtFechaLiquid    = $_POST['dtFechaLiquid'];
            
            $resp = $credits->setChangeSchemeLate($idCustomer, $idCredit, $interesAplicadoN, $cantseman, $amountNewScheme, $dtFechaLiquid, $typeOP);
            echo json_encode($resp);
            break;

        case 'aplySetCompletePay':
            $idPaySetConfirm = $_POST['idPaySetConfirm'];
            $resp = $credits->setCompletePay($idPaySetConfirm);
            break;

        case 'getDataPay':
            $idPayCredit = $_POST['idPayCredit'];
            $data = $credits->getDataPayCredit($idPayCredit);
            echo json_encode($data);
            break;

        case 'assingPaymentConfirm':
            $dataSetPayment = array();
            $dataSetPayment['icvedetallepago'] = $_POST['icvedetallepago'];
            $dataSetPayment['icvecredito']     = $_POST['icvecredito'];
            $dataSetPayment['txtmontoPerPago'] = $_POST['txtmontoPerPago'];
            $dataSetPayment['icvecartera']     = $_POST['icvecartera'];
            $dataSetPayment['txtImportePago']  = (float) str_replace(['MXN', ' ', ','], '', $_POST['txtImportePago']);
            $dataSetPayment['voucherPaySet']   = $_FILES['voucherPaySet'];
            $resp = $credits->setCompletePay($dataSetPayment);
            echo json_encode($resp);
            break;

        case 'updateFileCustomer':
            $dataUpdateFile = array();
            $dataUpdateFile['idDocFile']     = $_POST['idDocFile'];
            $dataUpdateFile['routeFile']     = $_POST['routeFile'];
            $dataUpdateFile['fileUploadNew'] = $_FILES['fileUploadNew'];
            $resp = $customer->updateFileCustomer($dataUpdateFile);
            echo json_encode($resp);
            break;
        
        case 'readNumberPay':
            $idNumberPay = $_POST['idNumberPay'];
            $resp = $credits->getDataNumberPay($idNumberPay);
            echo json_encode($resp);
            break;
        default:
            echo 'Operación no válida';
            break;
    }
}
