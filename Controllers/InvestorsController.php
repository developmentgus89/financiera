<?php
require_once '../Models/Investor.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $investor = new Investor();
    global $investors;

    switch ($operation) {
        case 'create':
            // Crear inversionista
            $invnombre        = $_POST['invnombre'];
            $invapaterno      = $_POST['invapaterno'];
            $invamaterno      = $_POST['invamaterno'];
            $invedad          = $_POST['invedad'];
            $invtelefono      = $_POST['invtelefono'];
            $invinteres       = $_POST['invinteres'];
            $invcantinvertida = $_POST['invcantinvertida'];
            $invtipocuenta    = $_POST['invtipocuenta'];
            $invinstbancaria  = $_POST['invinstbancaria'];
            $invctabancaria   = $_POST['invctabancaria'];
            $invemail         = $_POST['invemail'];
            $invDateRegister  = $_POST['invDateRegister'];

            $createInvestor = $investor->newInvestor(
                $invnombre,
                $invapaterno,
                $invamaterno,
                $invedad,
                $invtelefono,
                $invinteres,
                $invcantinvertida,
                $invtipocuenta,
                $invinstbancaria,
                $invctabancaria,
                $invemail,
                $invDateRegister
            );
            echo json_encode($createInvestor);
            break;
        case 'rowCount':
            $invnombre = $_POST['invnombre'];
            $invapaterno = $_POST['invapaterno'];
            $invamaterno = $_POST['invamaterno'];

            $rowCountInv = $investor->rowsCount($invnombre, $invapaterno, $invamaterno);
            echo json_encode($rowCountInv);

            break;
        case 'read':
            // Leer clientes
            $investors = $investor->getInvestors();
            echo json_encode($investors);
            break;
        case 'readdetails':
            $icveinvestor = $_POST['icveinves'];
            $investorsDetails = $investor->getInvestorDetails($icveinvestor);
            echo json_encode($investorsDetails);
            break;

        case 'update':
            // Actualizar inversionista
            $udpidcveinvestor    = $_POST['udpidcveinvestor'];
            $udpinvnombre        = $_POST['udpinvnombre'];
            $udpinvapaterno      = $_POST['udpinvapaterno'];
            $udpinvamaterno      = $_POST['udpinvamaterno'];
            $udpinvedad          = $_POST['udpinvedad'];
            $udpinvtelefono      = $_POST['udpinvtelefono'];
            $udpinvtipocuenta    = $_POST['udpinvtipocuenta'];
            $udpinvinstbancaria  = $_POST['udpinvinstbancaria'];
            $udpinvctabancaria   = $_POST['udpinvctabancaria'];
            $udpinvemail         = $_POST['udpinvemail'];
            $udpinvDateRegister  = $_POST['udpinvDateRegister'];

            // echo json_encode($investor->rowsCount($invnombre,$invapaterno,$invamaterno));

            $investor->updateInvestor(
                $udpidcveinvestor,
                $udpinvnombre,
                $udpinvapaterno,
                $udpinvamaterno,
                $udpinvedad,
                $udpinvtelefono,
                $udpinvtipocuenta,
                $udpinvinstbancaria,
                $udpinvctabancaria,
                $udpinvemail,
                $udpinvDateRegister
            );
            break;
        case 'delete':
            // Eliminar cliente
            $id = $_POST['id'];

            // $customer->eliminarCliente($id);
            break;

        case 'row':
            // Eliminar cliente
            $id = $_POST['id'];

            $inver = $investor->rowInvestor($id);
            echo json_encode($inver);
            break;

        case 'total':
            $tInvestors = $investor->getTotalInvestors();
            echo json_encode($tInvestors);
            break;

        case 'totalCapital':
            $totalCapital = $investor->getTotalCapital();
            echo json_encode($totalCapital);
            break;

        case 'readtypesclients':
            // Leer tipos de cliente
            $tiposCliente = $customer->obtenerTiposClientes();
            echo json_encode($tiposCliente);
            break;
        case 'readbanks':
            $catbanks = $investor->get_banks();
            echo json_encode($catbanks);
            break;
        case 'createInvesment':
            $cveinvestor     = $_POST['cveinvestor'];
            $inputDateInver  = $_POST['inputDateInver'];
            $inputInteres    = $_POST['inputInteres'];
            $inputMontoInver = $_POST['inputMontoInver'];
            $inputObsInver   = $_POST['inputObsInver'];

            $createInvestorDetails = $investor->set_invesmentsdetails($cveinvestor, $inputDateInver, $inputInteres, $inputMontoInver, $inputObsInver);
            break;
        case 'readPaysInterests':
            $icveinvestor = $_POST['icveinves'];
            $pagos = $investor->get_paysinterests($icveinvestor);
            echo json_encode($pagos);
            break;
        case 'countdetails':
            $icveinvestor = $_POST['icveinvestor'];
            $invesments = $investor->get_countinvesments($icveinvestor);
            echo json_encode($invesments);
            break;
        case 'readUDPPago':
            $icvedetalleinver = $_POST['icvedetalleinver'];
            $invesmentsPays = $investor->get_paysinvesments($icvedetalleinver);
            echo json_encode($invesmentsPays);
            break;
        case 'UpdateDetailInvesment':
            $udpcveinversionista = $_POST['udpcveinversionista'];
            $udpcveinverdetalle  = $_POST['udpcveinverdetalle'];
            $udpinputDateInver   = $_POST['udpinputDateInver'];
            $udpicveinteres      = $_POST['udpicveinteres'];
            $udpinputMontoInver  = $_POST['udpinputMontoInver'];
            $udpinputObsInver    = $_POST['udpinputObsInver'];
            $invesmentsDetail    = $investor->set_updateDetailInvesment(
                                                $udpcveinversionista,
                                                $udpcveinverdetalle,
                                                $udpicveinteres,
                                                $udpinputDateInver,
                                                $udpinputMontoInver,
                                                $udpinputObsInver 
                                            );
            echo json_encode($invesmentsDetail);
            break;

        case 'readdetailsinverpays':
            $icveinversionista    = $_POST['icveinversionista'];
            $invesmentsDetailPays = $investor->get_paysdetailsinterest($icveinversionista);
            echo json_encode($invesmentsDetailPays);
            break;

        case 'insertDetailsPaysInvesment':
            $icveinversionista = $_POST['icveinversionista'];
            $insertPaysInterest = $investor->set_paysdetailsinterest($icveinversionista);
            echo json_encode($insertPaysInterest);
            break;

        case 'getInterests':
            $getInterests = $investor->get_interest();
            echo json_encode($getInterests);
            break;

        case 'confirmpay':
            $icvepago = $_POST['icvepago'];
            $comprobante = $_POST['comprobante'];
            $icvepaymentconfirm = $investor->set_confirmpayment($icvepago, $comprobante);
            echo json_encode($icvepaymentconfirm);
            break;

        case 'upload':
            $fileName = $_FILES['voucher']['name'];
            $carac['resp'] = true;
            $carc['fileN'] = $fileName;
            echo json_encode($carac);
            break;

        default:
            echo 'Operación no válida';
            break;
    }
}
