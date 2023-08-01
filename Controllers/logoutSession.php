<?php
    session_start();

    // Limpiar todas las variables de sesión
    session_unset();

    // Destruir la sesión
    session_destroy();

    return true;
?>