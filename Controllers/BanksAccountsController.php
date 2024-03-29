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

        case 'getSeeDataAccountBank':
            $icvecuentabancaria = $_POST['icvecuentabancaria'];
            $detAccountBank = $banksAccounts->getDataAccountBank($icvecuentabancaria);
            echo json_encode($detAccountBank);
            break;

        case 'newAccountBank':
            $selCatIcveBanco         = $_POST['selCatIcveBanco'];
            $numberAccountBank       = $_POST['numberAccountBank'];
            $typeAccountBank         = $_POST['typeAccountBank'];
            $statusAccountBank       = $_POST['statusAccountBank'];
            $observationsAccountBank = $_POST['observationsAccountBank'];
            $customSwitch3           = $_POST['customSwitch3'];
            $fieldicveinversionista  = $_POST['fieldicveinversionista'];
            $detBanksAccounts = $banksAccounts->newAccountBank(
                    $fieldicveinversionista, $selCatIcveBanco, $typeAccountBank, 
                    $numberAccountBank, $customSwitch3, $statusAccountBank, 
                    $observationsAccountBank
            );
            echo json_encode($detBanksAccounts);
        break;

        case 'deleteAccountBank':
            $icvecuentabancaria = $_POST['icvecuentabancaria'];
            $detBancksAccounts = $banksAccounts->deleteAccountBank($icvecuentabancaria);
            echo json_encode($detBancksAccounts);
        break;

        case 'updateAccountBank':
            $udpselCatIcveBanco         = $_POST['udp-selCatIcveBanco'];
            $udpnumberAccountBank       = $_POST['udp-numberAccountBank'];
            $udptypeAccountBank         = $_POST['udp-typeAccountBank'];
            $udpstatusAccountBank       = $_POST['udp-statusAccountBank'];
            $udpobservationsAccountBank = $_POST['udp-observationsAccountBank'];
            $udpcustomSwitch3           = $_POST['udp-customSwitch3'];
            $icvecuentacveinver         = $_POST['icvecuentacveinver'];
            $udpcveinversionista        = $_POST['fieldicveinversionista'];
            $detBancksAccounts = $banksAccounts->updateAccountBank(
                $udpselCatIcveBanco,
                $udpnumberAccountBank,
                $udptypeAccountBank,
                $udpstatusAccountBank,
                $udpobservationsAccountBank,
                $udpcustomSwitch3,
                $icvecuentacveinver,
                $udpcveinversionista
            );
            echo json_encode($detBancksAccounts);
            break;
        default:
            echo "Opción no validad para la clase BanksAccounts";
    }
}
