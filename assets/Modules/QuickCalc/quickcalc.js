
const barprestamo         = document.getElementById('barprestamos');
const vcantprestamo       = document.getElementById('vcantprestamo');
const montoSolicitado     = document.getElementById('montoSolicitado');
const montoIntereses      = document.getElementById('montoIntereses');
const pagoSemanal         = document.getElementById('pagoSemanal');
const montoTotal          = document.getElementById('montoTotal');
const cantsemanSelect     = document.getElementById('cantseman');
const porcentajePrestamos = document.getElementById('vcantporcentaje');

barprestamo.value = 0;

barprestamo.addEventListener('input', () => {
    let cantseman = document.getElementById("cantseman").value;

    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if(cantseman != 0){
        let preinteres = (barprestamo.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamo.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        vcantprestamo.textContent            = `${formatter.format(barprestamo.value)} MXN`;
        montoSolicitado.textContent          = `${formatter.format(barprestamo.value)} MXN`;
        montoIntereses.textContent           = `${formatter.format(totalInteres)} MXN`;
        pagoSemanal.textContent              = `${formatter.format(pagoPeriodo)} MXN`;
        montoTotal.textContent               = `${formatter.format(granTotal)} MXN`;
        porcentajePrestamos.textContent      = `${interesCalculado} %`;
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
    
    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if(cantseman != 0){
        let preinteres = (barprestamo.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamo.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        vcantprestamo.textContent   = `${formatter.format(barprestamo.value)} MXN`;
        montoSolicitado.textContent = `${formatter.format(barprestamo.value)} MXN`;
        montoIntereses.textContent  = `${formatter.format(totalInteres)} MXN`;
        pagoSemanal.textContent     = `${formatter.format(pagoPeriodo)} MXN`;
        montoTotal.textContent      = `${formatter.format(granTotal)} MXN`;
        porcentajePrestamos.textContent      = `${interesCalculado} %`;
    }else{
        barprestamo.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
          });
    }
});