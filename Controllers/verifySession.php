<?php
session_start();
// BUG: Cambia el tiempo de sesion ahorita son solo para pruebas
$sessionLifetime = 180000;

if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $sessionLifetime) {
    // Si la sesión ha expirado, destruirla
    session_unset();
    session_destroy();
    session_start(); // Iniciar una nueva sesión si es necesario
} else {
    // Si la sesión está activa, actualizar el tiempo de actividad
    $_SESSION['last_activity'] = time();
}

if (isset($_SESSION['username'])) {
    // El usuario ha iniciado sesión, puedes mostrar el contenido del template
    
} else {
    // El usuario no ha iniciado sesión, puedes redirigirlo a la página de inicio de sesión
    header("Location: ../index.php"); // Reemplaza con la URL de la página de inicio de sesión
    // exit(); // Finaliza el script después de la redirección
}