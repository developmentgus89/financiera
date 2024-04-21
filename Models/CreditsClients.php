
<?php
include_once('Abstracts/OperationsPaysClient.php');
include_once('Conexion.php');

class CreditsClients extends OperationsPaysClient{

    private $conexion;
    var $acceso;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    
    /**
     * getRowsCreditsByClient
     *
     * @param  int $icvecliente
     * @return array
     */
    public function getRowsCreditsByClient(int $icvecliente): array {
        try{
            $sql = "SELECT * FROM catcreditos WHERE icvecliente = ?";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$icvecliente]);
    
            return $statement->fetchAll(PDO::FETCH_ASSOC);
            
        }catch(PDOException $e){
            throw new Error('Error al consultar los creditos del cliente.' . $e->getMessage());
        }
        
    }
    
    /**
     * getRowCredit
     *
     * @param  int $id
     * @return array
     */
    public function getRowSingleCredit(int $id, int $icvecliente): ?array {
        try{
            $sql = "SELECT * FROM catcreditos WHERE icvecredito = ? AND icvecliente = ?";
            $statement = $this->acceso->prepare($sql);
            $statement->execute([$id, $icvecliente]);
    
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }catch(PDOException $e){
            throw new Error('Error al insertar la cuenta bancaria nueva.' . $e->getMessage());
        }
       
    }

    /**
     * insertRow
     *
     * @param  array $data
     * @return array
     */
    public function insertRow(array $data): ?array{
        try{
            $sql = "INSERT INTO catcreditos
                    (icvecliente, dmonto, dtfechasolicitud, dtfechafiniquito, estatus)
                    VALUES(?, ?, ?, ?, ?)";

            $statement = $this->acceso->prepare($sql);
            for ($i = 0; $i < count($data); $i++) {
                $statement->bindParam($i + 1, $data[$i]);
            }
            $statement->execute();

            $resp['msj'] = true;
            $resp['text'] = 'Se creó de manera correcta el crédito.';
            return $resp;

        }catch(PDOException $e){
            throw new Error('Error al crear la nueva solicitud de crédito.' . $e->getMessage());
        }

    }

    /**
     * updateRowByClients
     *
     * @param  int $id
     * @param  array $data
     * @return array
     */
    public function updateRowByClients(int $id, array $data): ?array{
        try {
            $sql = "UPDATE catcreditos
                SET icvecliente = ? , dmonto = ?, dtfechasolicitud = ?, dtfechafiniquito = ?, estatus = ?
                WHERE icvecredito = $id";

            $statement = $this->acceso->prepare($sql);
            for ($i = 0; $i < count($data); $i++) {
                $statement->bindParam($i + 1, $data[$i]);
            }
            $statement->execute();

            $resp['msj'] = true;
            $resp['text'] = 'Se actualizó de manera correcta el crédito.';
            return $resp;
        } catch(PDOException $e){
            throw new Error('Error al actualizar los datos del credito.' . $e->getMessage());
        }
    }
    
    /**
     * delete
     *  Este metodo sirve para cambiar el estatus del credito
     *  no nos sirve para eliminar este credito.
     * @param  int $id
     * @param  int $icvecliente
     * @return array
     */
    public function delete(int $id, int $icvecliente): ?array{
        try {
            $sql = "UPDATE catcreditos SET estatus = 3
                WHERE icvecredito = ? AND icvecliente = ?";

            $statement = $this->acceso->prepare($sql);
            $statement->execute([$id, $icvecliente]);

            $resp['msj'] = true;
            $resp['text'] = 'Se eliminó de manera correcta el crédito.';
            return $resp;
        } catch(PDOException $e){
            throw new Error('Error al actualizar los datos del credito.' . $e->getMessage());
        }
    }

    

}