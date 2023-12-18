<?php
session_start();
include_once "Conexion.php";
class Login {
    var $acceso;
    var $login;

    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    public function access_user($username, $cpassword) {
        // Llamamos al método para verificar la autenticidad de la contraseña
        $authenticated = $this->verifyPassword($username, $cpassword);
        
        if ($authenticated) {
            $resp['msj'] = "SUCCESS";
            $resp['text'] = "Entraste muy bien chico";
            echo json_encode($resp);
        } else {
            $resp['msj'] = "ERROR";
            echo json_encode($resp);
        }
    }
    
    private function verifyPassword($username, $cpassword) {
        
        $stored_password = $this->getPasswordFromDatabase($username);
        
        // Verificamos la autenticidad de la contraseña utilizando password_verify()
        return password_verify($cpassword, $stored_password);
    }
    
    private function getPasswordFromDatabase($username) {
           
            $query = "SELECT * FROM usuarios WHERE cusername = :username";
            $statement = $this->acceso->prepare($query);
            $statement->bindParam(':username', $username);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
        
        // Suponemos que la contraseña almacenada para el usuario "usuario1" es: "hashed_password"
        if ($result['cusername'] === $username) {
            $_SESSION['username']  = $result['cusername'];
            $_SESSION['cnombre']   = $result['cnombre'];
            $_SESSION['capellido'] = $result['capellido'];
            return $result['cpassword'];
        } else {
            return null; // Si el usuario no existe en la base de datos, retornamos null (cambiar a la lógica real)
        }
    }
}
?>

