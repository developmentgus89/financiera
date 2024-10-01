<?php
require_once '../Models/DashBoard.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $operation = $_POST['operation'];

        $dashBoard = new DashBoard();

        switch ($operation) {
            case 'countClients':
                $cclients = $dashBoard->countClients();
                echo json_encode($cclients);
                break;
            
            case 'countInvestors':
                $cinvestors = $dashBoard->countInvestors();
                echo json_encode($cinvestors);
                break;

            case 'getWallets':
                $wallets = $dashBoard->getWallets();
                echo json_encode($wallets);
                break;
            
            default:
                echo "Esta opción no se encuentra dentro del controlador del DashBoard";
            break;
        }
    }

?>