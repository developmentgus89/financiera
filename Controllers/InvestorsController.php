<?php
require_once '../Models/Investor.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $investor = new Investor();
    global $investors;

    switch ($operation) {
        case 'create':
            // Crear inversionista
            $invnombre = $_POST['invnombre'];
            $invapaterno = $_POST['invapaterno'];
            $invamaterno = $_POST['invamaterno'];
            $invedad = $_POST['invedad'];
            $invtelefono = $_POST['invtelefono'];
            $invcantinvertida = $_POST['invcantinvertida'];
            $invtipocuenta = $_POST['invtipocuenta'];
            $invinstbancaria = $_POST['invinstbancaria'];
            $invctabancaria = $_POST['invctabancaria'];
            $invemail = $_POST['invemail'];
            $invDateRegister = $_POST['invDateRegister'];

            $createInvestor = $investor->newInvestor(
                $invnombre,
                $invapaterno,
                $invamaterno,
                $invedad,
                $invtelefono,
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
            $udpinvclabe         = $_POST['udpinvclabe'];
            $udpinvemail         = $_POST['udpinvemail'];
            $udpinvDateRegister  = $_POST['udpinvDateRegister'];

            echo json_encode($investor->rowsCount($invnombre,$invapaterno,$invamaterno));
            
            // $investor->updateInvestor(
            //     $udpidcveinvestor,
            //     $udpinvnombre,
            //     $udpinvapaterno,
            //     $udpinvamaterno,
            //     $udpinvedad,
            //     $udpinvtelefono,
            //     $udpinvclabe,
            //     $udpinvemail,
            //     $udpinvDateRegister
            // );
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
        default:
            echo 'Operación no válida';
            break;
    }
}
