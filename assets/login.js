

const btnIniciarSesion = document.querySelector('#btnLoginStart');

const access_login = (username, password) => {
    const xhr = new XMLHttpRequest();
    
    // Configurar la solicitud AJAX
    xhr.open('POST', 'Controllers/LoginController.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Manejar la respuesta del servidor
            const response = JSON.parse(xhr.responseText);
            console.table(response);
            // console.log('Respuesta desde el servidor' + response.msj);

            response.msj === 'SUCCESS' ? window.location.href = 'Views/dashboard.php' 
            :  toastr.error('Error al iniciar sesion, verifique su usuario y contraseña.');// Mostrar la respuesta en un cuadro de diálogo
        }
    };

    // Enviar los datos de usuario y contraseña en la solicitud
    const params = `username=${username}&password=${password}`;
    xhr.send(params);
}

//Funcion del boton para accesar a la sesion

btnIniciarSesion.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username == null || username == '') {
    
        toastr.error('No ha capturado el usuario o correo de acceso.');
        // toastr.error('Esta pasando algo.');
    } else if (password == null || password == '') {
        toastr.error('No ha capturado la contrase&ntilde;a de acceso.');
    } else{
        access_login(username, password);
    }
    
    
});

