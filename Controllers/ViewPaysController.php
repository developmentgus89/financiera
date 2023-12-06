<?php
require_once '../Models/PaysInvestments.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $pays = new PaysInvestments();

    switch($operation){
        case 'getDataInvestment':
            $icvedetinversion  = $_POST['icvedetalleinver'];
            $detinvestment = $pays->getDataInvestment($icvedetinversion);
            echo json_encode($detinvestment);
            break;
        case 'getRowsInvestments':
            $icveinversionista = $_POST['icveinversionista'];
            $icvedetinversion  = $_POST['icvedetalleinver'];

            $paysInvestment = $pays->getPaysInvestment($icveinversionista, $icvedetinversion);
            echo json_encode($paysInvestment);
            break;
        case 'insertPaysInsterests':
            $icveinversionista = $_POST['icveinversionista'];
            $icvedetalleinver  = $_POST['icvedetalleinver'];
            $interes           = $_POST['interes'];
            $dmonto            = $_POST['dmonto'];
            $insertPays = $pays->setInsertPays($icveinversionista, $icvedetalleinver, $interes, $dmonto);
            echo json_encode($insertPays);
            break;
        default:
        echo 'Operación no válida en la Vista de Pagos de Interes';
        break;

    }
}
