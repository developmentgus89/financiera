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
            
        case 'getBanksCat':
            $detBanks = $banksAccounts->get_banks();
            echo json_encode($detBanks);
            break;

        case 'newAccountBank':
            $selCatIcveBanco = $_POST['selCatIcveBanco'];
            $numberAccountBank = $_POST['numberAccountBank'];
            $typeAccountBank = $_POST['typeAccountBank'];
            $statusAccountBank = $_POST['statusAccountBank'];
            $observationsAccountBank = $_POST['observationsAccountBank'];
            $customSwitch3 = $_POST['customSwitch3'];
            $fieldicveinversionista = $_POST['fieldicveinversionista'];
            $detBanksAccounts = $banksAccounts->newAccountBank(
                    $fieldicveinversionista, $selCatIcveBanco, $typeAccountBank, 
                    $numberAccountBank, $customSwitch3, $statusAccountBank, 
                    $observationsAccountBank
            );
            echo json_encode($detBanksAccounts);
        break;
        default:
            echo "Opción no validad para la clase BanksAccounts";
    }
}
