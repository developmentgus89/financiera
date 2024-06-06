
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
    let interesCalculado = 0;

    if(cantseman > 0 && cantseman <= 8){
        interesCalculado = 5.12;
    }
    if(cantseman >= 9 && cantseman <= 10){
        interesCalculado = 5.76;
    }
    if(cantseman >= 11 && cantseman <= 12){
        interesCalculado = 6.38;
    }
    if(cantseman >= 13 && cantseman <= 14){
        interesCalculado = 7.04;
    }
    if(cantseman >= 14 && cantseman <= 16){
        interesCalculado = 7.76;
    }
    if(cantseman >= 16 && cantseman <= 18){
        interesCalculado = 8.4;
    }
    if(cantseman >= 18 && cantseman <= 20){
        interesCalculado = 9.04;
    }
    if(cantseman >= 20 && cantseman <= 22){
        interesCalculado = 9.68;
    }
    if(cantseman >= 22 && cantseman <= 24){
        interesCalculado = 10.32;
    }

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
    let interesCalculado = 0;

    if(cantseman > 0 && cantseman <= 8){
        interesCalculado = 5.12;
    }
    if(cantseman >= 9 && cantseman <= 10){
        interesCalculado = 5.76;
    }
    if(cantseman >= 11 && cantseman <= 12){
        interesCalculado = 6.38;
    }
    if(cantseman >= 13 && cantseman <= 14){
        interesCalculado = 7.04;
    }
    if(cantseman >= 14 && cantseman <= 16){
        interesCalculado = 7.76;
    }
    if(cantseman >= 16 && cantseman <= 18){
        interesCalculado = 8.4;
    }
    if(cantseman >= 18 && cantseman <= 20){
        interesCalculado = 9.04;
    }
    if(cantseman >= 20 && cantseman <= 22){
        interesCalculado = 9.68;
    }
    if(cantseman >= 22 && cantseman <= 24){
        interesCalculado = 10.32;
    }

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