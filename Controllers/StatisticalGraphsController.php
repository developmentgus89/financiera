<?php
require_once '../Models/StatisticalGraphs.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $statics = new StatisticalGraphs();
    global $investors;

    switch ($operation) {
        case 'readInterests':
            $icveinversionista = $_POST['icveinversionista'];
            $rowSatitiscsPays  = $statics->readRowPaysInterests($icveinversionista);
            echo json_encode($rowSatitiscsPays);
            break;

        case 'readInvesments':
                $icveinversionista = $_POST['icveinversionista'];
                $rowStatisticsInv  = $statics->readRowInvestments($icveinversionista);
                echo json_encode($rowStatisticsInv);
                break;

        default:
            echo 'Operación no válida StatisticalGraphs';
            break;
    }
}
