<?php

class Log
{
    private string $fileName;

    public function __construct()
    {
        $this->fileName = 'financiera.log';
    }

    public function setLog(string $modulo, string $error): void
    {
        try {
            $fileW = fopen($this->fileName, 'a+'); // Use 'a' to append to the file
            if ($fileW) {
                $fechaActual = (new DateTime())->format('Y-m-d H:i:s');
                $contenido = $modulo . " --- " . $error . " === " . $fechaActual . PHP_EOL;
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
