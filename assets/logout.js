
const btnCerrarSesion = document.querySelector('#logout');

btnCerrarSesion.addEventListener('click', () => {
    
    const xhr = new XMLHttpRequest();
    let respuesta = false;

    xhr.open('POST', '../Controllers/logoutSession.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Manejar la respuesta del servidor
            const response = xhr.responseText;
            response ? toastr.success('Hola Hola')
            :  window.location.href = '../index.php';// Mostrar la respuesta en un cuadro de diálogo
        }
    };

    const params = xhr.responseText;
    xhr.send(params);
});