<?php
include_once('Conexion.php');

class Customer{
    private $conexion;
    var $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function insertarCliente(
        $cnombre,
        $capelpat,
        $capelmat,
        $cedad,
        $typeClient,
        $cdatebirthday,
        $clientDateRegister,
        $clienteStatus,
        $ctelefono
    ) {
        try {
            $query = "INSERT INTO clientes (cnombre, capaterno, camaterno, iedad,
                        icvetipocliente, dfechanaciemiento, dfechaalta, cestatus, ctelefono) 
                        VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?, ?
                        )";
            $statement = $this->acceso->prepare($query);
            $statement->execute([
                $cnombre,
                $capelpat,
                $capelmat,
                $cedad,
                $typeClient,
                $cdatebirthday,
                $clientDateRegister,
                $clienteStatus,
                $ctelefono
            ]);

            // Devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo 'Error al insertar el cliente: ' . $e->getMessage();
        }
    }

    public function obtenerClientes() {
        try {
            $query = "SELECT * FROM clientes 
                    inner join cattipocliente 
                    on clientes.icvetipocliente = cattipocliente.icvetipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function obtenerTiposClientes(){
        try {
            $query = "SELECT * FROM cattipocliente";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error en la consulta: ' . $e->getMessage();
        }
    }
    
    /**
     * get_AsentamientosByZipCode
     *
     * @param  string $zipCode
     * @return void
     */
    public function get_AsentamientosByZipCode($zipCode):string{
        try{
            $query = "SELECT * FROM dir_catcolasen 
                        INNER JOIN dir_catlocmun ON dir_catlocmun.icvecatlocmun = dir_catcolasen.icvecatlocmun
                        INNER JOIN dir_catestados ON dir_catlocmun.icvecatestprovincia = dir_catestados.icvecatestprovincia
                        INNER JOIN dir_catpaises ON dir_catestados.iddircatpais = dir_catpaises.iddircatpais 
                        where codpostal like '$zipCode'";
            $statement = $this->acceso->prepare($query);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }catch(PDOException $e) {
            echo 'Error en la consulta para códigos postales: ' . $e->getMessage();
        }
    }
}
