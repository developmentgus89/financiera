<?php
require_once '../Models/Beneficiaries.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $beneficiaries = new Beneficiaries();

    switch ($operation) {
        case 'getBeneficiaries':
            $icveinversionista = $_POST['icveinversionista'];
            $detbeneficiaries = $beneficiaries->getBeneficiaries($icveinversionista);
            echo json_encode($detbeneficiaries);
            break;
            
        default:
            echo "Opción no validad para la clase BanksAccounts";
    }
}
