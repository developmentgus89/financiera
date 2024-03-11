<?php
require_once '../Models/StatisticalGraphs.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $investor = new Investor();
    global $investors;

    switch ($operation) {
        case 'rowCount':
            $invnombre   = $_POST['invnombre'];
            $invapaterno = $_POST['invapaterno'];
            $invamaterno = $_POST['invamaterno'];

            $rowCountInv = $investor->rowsCount($invnombre, $invapaterno, $invamaterno);
            echo json_encode($rowCountInv);
            break;

        default:
            echo 'Operación no válida';
            break;
    }
}
