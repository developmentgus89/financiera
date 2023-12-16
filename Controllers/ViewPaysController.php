<?php
require_once '../Models/PaysInvestments.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $pays = new PaysInvestments();

    switch ($operation) {
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

        case 'uploadimage':
            $idpay = $_POST['idpay']; //Cve de pago para agregar al documento
            $dir = "../docs/";
            $resp = false;

            $imageFileType = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
            //Cambio de nombre del documento add id
            $originalFileName = pathinfo($_FILES["file"]["name"], PATHINFO_FILENAME);
            $newFileName = $originalFileName ."-". $idpay .  "." . $imageFileType;
            $target_file = $dir . $newFileName;

            if (isset($_FILES["file"])) {
                $check = getimagesize($_FILES["file"]["tmp_name"]);
                if ($check !== false) {
                    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                        echo "El archivo " . htmlspecialchars($newFileName) . " ha sido subido.";
                        $resp = true;
                    } else {
                        echo "Hubo un error al subir al archivo";
                    }
                } else {
                    echo "El archivo no es una imagen";
                }
            }

            if($resp){
                $confirmpay = $pays->confirmPay($idpay, $newFileName);
                echo json_encode($confirmpay);
            }
            break;

        case 'getVoucherPay':
            $idpay = $_POST['idpay'];
            $getVoucher = $pays->getVoucher($idpay);
            echo json_encode($getVoucher);
            break;

        default:
            echo 'Operación no válida en la Vista de Pagos de Interes';
            break;
    }
}
