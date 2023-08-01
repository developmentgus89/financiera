<?php

// Incluir la librería FPDF
require('../../utils/libs/fpdf/fpdf.php');
require_once '../../Models/Products.php';

$products = new Products();

// Crear una nueva instancia de FPDF con orientación paisaje (L)
$pdf = new FPDF('L', 'mm', 'Letter');
$pdf->AddPage();

// Definir la fuente y el tamaño para los encabezados centrados
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 5, 'OFICIALIA MAYOR', 0, 1, 'C');
$pdf->Cell(0, 5, 'DIRECCION GENERAL DE ADMINISTRACION Y FINANZAS', 0, 1, 'C');
$pdf->Cell(0, 5, 'DIRECCION GENERAL ADJUNTA DE ABASTECIMIENTO', 0, 1, 'C');
$pdf->Cell(0, 5, 'DIRECCION DE TRANSPORTES', 0, 1, 'C');
$pdf->Cell(0, 5, 'SUBDIRECCION DE MANTENIMIENTO', 0, 1, 'C');
$pdf->Cell(0, 5, 'REFACCIONARIA', 0, 1, 'C');

$pdf->Ln();
$pdf->SetFillColor(255, 255, 0);
$pdf->Cell(0, 5, 'INVENTARIO DE EFECTOS EN LA REEFACIONARIA DE LA FECHA ? A LA FECHA ? DE 2023', 0, 1, 'C', true);
$pdf->Ln();
// Encabezados de la tabla centrados
$pdf->SetFillColor(128, 0, 0);
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(10, 5, 'NP', 1, 0, 'C',true);
$pdf->Cell(20, 5, 'UBICACION', 1, 0, 'C',true);
$pdf->Cell(12, 5, 'EXIST', 1, 0, 'C',true);
$pdf->Cell(20, 5, 'ENTRADAS', 1, 0, 'C',true);
$pdf->Cell(20, 5, 'SALIDAS', 1, 0, 'C',true);
$pdf->Cell(25, 5, 'EXISTENCIA', 1, 0, 'C',true);
$pdf->Cell(15, 5, 'UNIDAD', 1, 0, 'C',true);
$pdf->Cell(90, 5, 'PRODUCTO', 1, 0, 'C',true);
$pdf->Cell(23, 5, 'MARCA', 1, 0, 'C',true);
$pdf->Cell(20, 5, 'MODELO', 1, 1, 'C',true);

// // Datos de ejemplo para la tabla
//     for ($i = 1; $i <= 150; $i++) {
//         $registro = array(
//             'np' => $i,
//             'ubicacion' => 'Ubicacion ' . $i,
//             'exist' => rand(1, 100),
//             'entradas' => rand(1, 50),
//             'salidas' => rand(1, 30),
//             'existencia' => rand(1, 100),
//             'unidad' => 'Unidad ' . $i,
//             'producto' => 'Producto ' . $i,
//             'marca' => 'Marca ' . $i,
//             'modelo' => 'Modelo ' . $i,
//         );
//     }

// Contador para el número de registros por página
$contadorRegistros = 0;

// Recorrer los datos y mostrar los registros en la tabla
$pdf->SetFont('Arial', '', 10);
$pdf->SetFillColor(0, 0, 0);
$pdf->SetTextColor(0, 0, 0);

$productos = $products->obtenerInventario();

foreach ($productos as $registro) {
    $existencia = 0;
    $pdf->Cell(10, 5, $registro['pid'], 1, 0, 'C');
    $pdf->Cell(20, 5, $registro['inumeroanaquel']. '' . $registro['cestante'].''.$registro['crejilla'] , 1, 0, 'C');
    $pdf->Cell(12, 5, $registro['quantity'], 1, 0, 'C');
    $pdf->Cell(20, 5, $registro['total_entradas'], 1, 0, 'C');
    $pdf->Cell(20, 5, $registro['total_salidas'], 1, 0, 'C');
    $existencia = ($registro['quantity'] + $registro['total_entradas']) - $registro['total_salidas'];
    $pdf->Cell(25, 5, $existencia, 1, 0, 'C');
    $pdf->Cell(15, 5, $registro['cabrevia'], 1, 0, 'C');
    $pdf->Cell(90, 5, $registro['description'], 1, 0, 'L');
    $pdf->Cell(23, 5, $registro['brand_name'], 1, 0, 'C');
    $pdf->Cell(20, 5, $registro['model'], 1, 1, 'C');

    $contadorRegistros++;

    // Verificar si ya se mostraron 30 registros en esta página
    if ($contadorRegistros >= 30) {
        $pdf->AddPage(); // Agregar una nueva página
        $contadorRegistros = 0; // Reiniciar el contador de registros
        // Mostrar nuevamente los encabezados de la tabla
        $pdf->SetFillColor(128, 0, 0);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(20, 5, 'NP', 1, 0, 'C');
        $pdf->Cell(30, 5, 'UBICACION', 1, 0, 'C');
        $pdf->Cell(25, 5, 'EXIST', 1, 0, 'C');
        $pdf->Cell(25, 5, 'ENTRADAS', 1, 0, 'C');
        $pdf->Cell(25, 5, 'SALIDAS', 1, 0, 'C');
        $pdf->Cell(25, 5, 'EXISTENCIA', 1, 0, 'C');
        $pdf->Cell(30, 5, 'UNIDAD', 1, 0, 'C');
        $pdf->Cell(50, 5, 'PRODUCTO', 1, 0, 'C');
        $pdf->Cell(30, 5, 'MARCA', 1, 0, 'C');
        $pdf->Cell(30, 5, 'MODELO', 1, 1, 'C');
        $pdf->SetTextColor(0, 0, 0);
    }
}

// Salida del PDF
$pdf->Output();

?>
