<?php
require_once '../Models/BanksAccounts.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $banksAccounts = new BanksAccounts();

    switch ($operation) {
        case 'getBanksAccounts':
            $icveinversionista = $_POST['icveinversionista'];
            $detBancksAccounts = $banksAccounts->getBanksAccounts($icveinversionista);
            echo json_encode($detBancksAccounts);
            break;
        default:
            echo "Opción no validad para la clase BanksAccounts";
    }
}
