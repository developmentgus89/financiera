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

        case 'newBeneficiaries':
            $nameBenefi = $_POST['nameBenefi'];
            $teleBenefi = $_POST['teleBenefi'];
            if(is_null($_POST['direcciBenefi'] || $_POST['direcciBenefi'] == null)){
                $direcciBenefi = '';
            }else{
                $direcciBenefi = $_POST['direcciBenefi'];
            }
            $fieldicveinversionista = $_POST['fieldicveinversionista'];
            $detbeneficiaries = $beneficiaries->setNewBeneficiaries(
                $fieldicveinversionista, $nameBenefi, $teleBenefi, $direcciBenefi, $porcentaje
            );
            echo json_encode($detbeneficiaries);
            break;
        case 'getBeneficiariesStatics':
            $icveinversionista = $_POST['icveinversionista'];
            $detbeneficiaries = $beneficiaries->getStatics($icveinversionista);
            echo json_encode($detbeneficiaries);
            break;
        default:
            echo "Opción no valida para la C Beneficiaries";
    }
}
