<?php
session_start();
if (isset($_SESSION['username'])) {
    // El usuario ha iniciado sesión, puedes mostrar el contenido del template
    
} else {
    // El usuario no ha iniciado sesión, puedes redirigirlo a la página de inicio de sesión
    header("Location: ../index.php"); // Reemplaza con la URL de la página de inicio de sesión
    exit(); // Finaliza el script después de la redirección
}