<?php
date_default_timezone_set('America/Mexico_City');

class Log
{
    private string $fileName;

    public function __construct()
    {
        $this->fileName = '../Models/Log/financiera.log';
    }

    public function setLog(string $modulo, string $message): void
    {
        try {
            $fileW = fopen($this->fileName, 'a'); // Usa 'a' 
            if ($fileW) {
                $fechaActual = (new DateTime())->format('Y-m-d H:i:s');
                $contenido = $modulo . "|" . $message . "|" . $fechaActual . PHP_EOL;
                fwrite($fileW, $contenido);
                fclose($fileW);
            } else {
                throw new Exception("No se pudo abrir el archivo de log para escritura.");
            }
        } catch (Exception $e) {
            echo "Error en la escritura del log: " . $e->getMessage();
        }
    }
}
