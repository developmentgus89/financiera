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

/**
 * 
 * @param {HTMLElement} input 
 * @param {String} message 
 */
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

const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
});

// Clasificacion de rangos de interes para los creditos
const  rangosInteres = [
    { min: 1, max: 8, interes: 5.12 },
    { min: 9, max: 10, interes: 5.76 },
    { min: 11, max: 12, interes: 6.38 },
    { min: 13, max: 14, interes: 7.04 },
    { min: 15, max: 16, interes: 7.76 },
    { min: 17, max: 18, interes: 8.4 },
    { min: 19, max: 20, interes: 9.04 },
    { min: 21, max: 22, interes: 9.68 },
    { min: 23, max: 24, interes: 10.32 }
];

function formatDateBirthday(dateString) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
}
