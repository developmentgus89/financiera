function formatoDecimal(input) {
    // Eliminar todos los caracteres que no sean números o el separador decimal
    input.value = input.value.replace(/[^0-9.]/g, '');

    // Dividir el número en parte entera y parte decimal
    let partes = input.value.split('.');
    let parteEntera = partes[0];
    let parteDecimal = partes[1];

    // Agregar separador de miles (',') a la parte entera
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Reunir la parte entera y la parte decimal con el símbolo decimal ('.')
    let valorFormateado = parteEntera;
    if (parteDecimal) {
        valorFormateado += '.' + parteDecimal;
    }

    // Mostrar el valor formateado en el campo de entrada
    input.value = valorFormateado;
}

const showError = (input, message) => {
    console.log('Valor de la variable input' + input);
    console.log('Valor de la variable message' + message);
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = message;
    errorSpan.style.color = 'red';
    errorSpan.style.fontSize = '14px';

    const parent = input.parentElement;
    parent.appendChild(errorSpan);
    input.style.border = '2px solid red';
}

/**
 * 
 * @param {HTMLInputElement} input 
 */
const removeError = (input) => {
    console.log('El valor del input es: ' + input);
    const parent = input.parentElement;
    const errorSpan = parent.querySelector('.error-message');
    if (errorSpan) {
        parent.removeChild(errorSpan);
    }

    input.style.border = '2px solid #ccc';
}

const textInputs = document.querySelectorAll('input[type="text"]');

textInputs.forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});
