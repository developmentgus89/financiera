<?php
    // session_start();
    require_once '../Models/Login.php';

    // Obtén los valores de usuario y contraseña desde algún formulario o petición
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Crea una instancia de la clase Login
    $login = new Login();

    // Llama al método access_user para verificar el acceso del usuario
    $login->access_user($username, $password);

  
    
