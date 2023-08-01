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
