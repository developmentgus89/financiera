
const barprestamo     = document.getElementById('barprestamos');
const vcantprestamo   = document.getElementById('vcantprestamo');
const montoSolicitado = document.getElementById('montoSolicitado');
const montoIntereses  = document.getElementById('montoIntereses');
const pagoSemanal     = document.getElementById('pagoSemanal');
const montoTotal      = document.getElementById('montoTotal');
const cantsemanSelect = document.getElementById('cantseman');

// Intl es un API para el formateo de numeros
const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
});

barprestamo.value = 0;

barprestamo.addEventListener('input', () => {
    let cantseman = document.getElementById("cantseman").value;
    if(cantseman != 0){
        let preinteres = (barprestamo.value * 8) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamo.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        vcantprestamo.textContent   = `${formatter.format(barprestamo.value)} MXN`;
        montoSolicitado.textContent = `${formatter.format(barprestamo.value)} MXN`;
        montoIntereses.textContent  = `${formatter.format(totalInteres)} MXN`;
        pagoSemanal.textContent     = `${formatter.format(pagoPeriodo)} MXN`;
        montoTotal.textContent      = `${formatter.format(granTotal)} MXN`;
    }else{
        barprestamo.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
          });
    }
});

cantsemanSelect.addEventListener('change', () => {
    let cantseman = document.getElementById("cantseman").value;
    if(cantseman != 0){
        let preinteres = (barprestamo.value * 8) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamo.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        vcantprestamo.textContent   = `${formatter.format(barprestamo.value)} MXN`;
        montoSolicitado.textContent = `${formatter.format(barprestamo.value)} MXN`;
        montoIntereses.textContent  = `${formatter.format(totalInteres)} MXN`;
        pagoSemanal.textContent     = `${formatter.format(pagoPeriodo)} MXN`;
        montoTotal.textContent      = `${formatter.format(granTotal)} MXN`;
    }else{
        barprestamo.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
          });
    }
});