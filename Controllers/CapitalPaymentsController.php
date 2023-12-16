<?php
require_once '../Models/CapitalPaymentsInv.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'];
    $CapitalPays = new CapitalPaymentsInv();

    switch ($operation) {
        case 'getDataPaymentsCapital':
            $icvedetinversion  = $_POST['icvedetalleinver'];
            $detinvestment = $CapitalPays->getDataInvestment($icvedetinversion);
            echo json_encode($detinvestment);
            break;
        case 'getDataInvestment':
            $icvedetinversion  = $_POST['icvedetalleinver'];
            $detinvestment = $CapitalPays->getDataInvestment($icvedetinversion);
            echo json_encode($detinvestment);
            break;
        case 'getAmountInvestment':
            $cveinversion = $_POST['cveinversion'];
            $amount = $CapitalPays->getAmountInvestment($cveinversion);
            echo json_encode($amount);
            break;
        case 'uploadvoucher':
            $cveinversion = $_POST['cveinversion']; //Cve de Inversion
            $amountCapitalPayment = $_POST['amountCapPay']; //Monto de la inversion
            $dir = "../docs/CapitalPayments/";
            $resp = false;

            $imageFileType = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
            //Cambio de nombre del documento add id
            $originalFileName = pathinfo($_FILES["file"]["name"], PATHINFO_FILENAME);
            $newFileName = $originalFileName . "-" . $cveinversion .  "." . $imageFileType;
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

            if ($resp) {
                $confirmpay = $CapitalPays->setCapitalPayment($cveinversion, $amountCapitalPayment, $newFileName);
                echo json_encode($confirmpay);
            }

            break;
        case 'getCapitalSum':
            $icvedetalleinver = $_POST['icvedetalleinver'];
            $sum = $CapitalPays->getCapitalSum($icvedetalleinver);
            echo json_encode($sum);
            break;
        case 'getCapitalPayments':
            $icvedetalleinver = $_POST['icvedetalleinver'];
            $capitalPayments = $CapitalPays->getCapitalPayments($icvedetalleinver);
            echo json_encode($capitalPayments);
            break;
        case 'getVoucherCapitalPayment':
            $idcapitalpayment = $_POST['idcapitalpayment'];
            $voucherCapitalPayment = $CapitalPays->getVoucherCapitalPayment($idcapitalpayment);
            echo json_encode($voucherCapitalPayment);
            break;
        default:
            echo 'Operación no válida en la Vista de Pagos a Capital';
            break;
    }
}
