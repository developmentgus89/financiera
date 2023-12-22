
const btnIniciarSesion = document.querySelector('#btnLoginStart');

/*Eventos de teclado*/

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Realizar alguna acción cuando se presione Enter en cualquier lugar de la página
        validInputs();
    }
});


const access_login = async (username, password) => {
    const params = `username=${username}&password=${password}`;

    try {
        const response = await fetch('Controllers/LoginController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud para obtener los pagos`);
        }

        const data = await response.json();
        console.warn('Total de Intereses Pagados de esa inversion');
        console.table(data);
        data.msj === 'SUCCESS' ? window.location.href = 'Views/dashboard.php'
            : toastr.error('Error al iniciar sesion, verifique su usuario y contraseña.');// Mostrar la respuesta en un cuadro de diálogo
    } catch (error) {
        throw new Error(`No se puede obtener la suma total de intereses ${error.message}`);
    }
}


const validInputs = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username == null || username == '') {

        toastr.error('No ha capturado el usuario o correo de acceso.');
        // toastr.error('Esta pasando algo.');
    } else if (password == null || password == '') {
        toastr.error('No ha capturado la contrase&ntilde;a de acceso.');
    } else {
        access_login(username, password);
    }

}

//Funcion del boton para accesar a la sesion

btnIniciarSesion.addEventListener('click', () => {
    validInputs();
});

