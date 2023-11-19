//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';

$('#inputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#udpinputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

//Eventos de modales


//Declaracion de variables para los botones y campos globales

const btnAddInversion = document.querySelector("#btnAddInversion");
const btnSaveInvesments = document.querySelector("#btnSaveInvesments");
const btnSaveInvesmentsDetail = document.querySelector('#btnSaveInvesmentsDetail');



//Funciones generales
const descifra = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('cveinvestors')) {
        const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
        var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

        const params = JSON.parse(paramDescript);
        console.log(`Dentro del IF ${queryParams}`);

        // document.getElementById('cveinversionista').innerHTML= `CVE: ${params.icveinvestor}`;
        readPersonInvestor(params.icveinvestor);
        getDetailsInvestor(params.icveinvestor);
        getDetailsInvestorPays(params.icveinvestor);
        countDetailsInvestor(params.icveinvestor);
        document.getElementById('fieldicveinversionista').value = params.icveinvestor;
    }

    console.log(`Parametros son: ${queryParams}`);
    console.log(`Parametros son: ${queryParams.has('cveinvestors')}`);
    console.table(paramDescript);

}

/**
 * 
 * @param {number} icveinvestor 
 */
const readPersonInvestor = (icveinvestor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
            console.table(inversionista);

            document.getElementById('selInvNombre').value = inversionista[0].cnombre;
            document.getElementById('selInvAPaterno').value = inversionista[0].capaterno;
            document.getElementById('selInvAMaterno').value = inversionista[0].camaterno;
            document.getElementById('selInvEdad').value = inversionista[0].iedad;
            document.getElementById('selInvTelefono').value = inversionista[0].ctelefono;
            document.getElementById('selInvCapInv').value = inversionista[0].fcantidadinvertida;

            let cantInversions = document.querySelector('#totalInvertions');
            cantInversions.innerHTML = inversionista[0].totinversiones;


            let cantTotalInvertida = document.querySelector('#cTotalInvertida');
            let cantTotInv = parseFloat(inversionista[0].fcantidadinvertida);
            cantTotInv = cantTotInv.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });

            cantTotalInvertida.innerHTML = `${cantTotInv}`;

            let cantPagCapital = document.querySelector('#cPagCapital');
            let cantPagCapitalF = parseFloat(inversionista[0].cantpagadacapital);
            cantPagCapitalF = cantPagCapitalF.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });
            cantPagCapital.innerHTML = cantPagCapitalF;

            let cantPendCapital = document.querySelector('#cPendCapital');
            let cantPendCapResto = parseFloat(inversionista[0].fcantidadinvertida) - parseFloat(inversionista[0].cantpagadacapital);
            cantPendCapResto = cantPendCapResto.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });

            cantPendCapital.innerHTML = cantPendCapResto;
        } else {
            console.error('Error al leer el Inversionista');
        }
    };
    xhr.send(`operation=row&id=${icveinvestor}`);
}

/**
 * 
 * @param {number} icveinvestor 
 */
const countDetailsInvestor = (icveinvestor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Conteo de las inversiones para determinar si tiene 1 o ninguna');
            console.table(data);
            let count = data[0].totalinversiones;
            if (count >= 1) {
                btnAddInversion.disabled = true;
                btnAddInversion.classList = 'btn btn-dark';
            }
        } else {
            toastr.error(`Error al contar las inversiones del inversionista`);
        }
    };
    xhr.send(`operation=countdetails&icveinvestor=${icveinvestor}`);
}

/**
 * 
 * @param {number} icveinvestor 
 */

const getDetailsInvestor = (icveinvestor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Detalle de inversionistas');
            console.table(data);
            var tableInvestors = document.querySelector('#tableInvestorsDetails');
            var table = new DataTable(tableInvestors, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['Fecha Inversion', 'Monto', 'Estatus', 'Tipo de Operación', 'Observaciones', 'Modificar'],
                    data: data.map(function (item) {
                        // return Object.values(item);
                        // let count = 1;
                        // count ++;
                        var id = item['icvedetalleinver'];
                        let cantidadInvertida = parseFloat(item['dmonto']);
                        let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                        });
                        return [
                            item['dfecharegistro'],
                            cantidadFormateada,
                            item['cstatus'] == 'A' ? 'ACTIVO' : 'INACTIVO',
                            item['invtipooperacion'] == 'I' ? 'INGRESO' : 'EGRESO',
                            item['invdetobservaciones'],
                            `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="openEditionInvesment(${id})"><i class="fas fa-money-check"></i>&nbsp;EDITAR </button>`
                            // `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                        ]
                    })
                }
            });

            table.row.add(['Total', '','$ 40,000.00']).draw();
        } else {
            console.error('Error al leer los Inversionistas');
        }
    };
    xhr.send(`operation=readdetails&icveinves=${icveinvestor}`);
};

/**
 * 
 * @param {number} icveinvestor 
 */
const getDetailsInvestorPays = (icveinvestor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Detalle de pagos de interes a inversionistas');
            console.table(data);
            var tblPaysInterests = document.querySelector('#tableInvestorsDetailsPays');
            new DataTable(tblPaysInterests, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['CVE PAGO', 'Importe', 'Fecha Hora Generado', 'Estatus Pago', 'Fecha Confirmación', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Confirmar Pago'],
                    data: data.map(function (item) {

                        var id = item['icvepago'];
                        let cantPago = parseFloat(item['importe']);
                        let cantPagoFormateada = cantPago.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                        });
                        return [
                            id,
                            cantPagoFormateada,
                            item['fecha'],
                            item['statuspago'],
                            item['dtfechapagconfirmado'],
                            item['cnombre'],
                            item['capaterno'],
                            item['camaterno'],
                            `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick=""><i class="fas fa-money-check"></i></button>`
                            // `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                        ]
                    })
                }
            });
        } else {
            toastr.error(`Error al leer los pagos del imversionista`);
        }
    };
    xhr.send(`operation=readPaysInterests&icveinves=${icveinvestor}`);
}


/**
 * 
 * @param {Date} inputDateInver 
 * @param {number} inputMontoInver 
 * @param {String} inputObsInver 
 */
const fncInsertInvesments = (inputDateInver, inputMontoInver, inputObsInver) => {
    let cveinvestor = document.getElementById('fieldicveinversionista').value;

    inputMontoInver = inputMontoInver.substring(4);
    inputMontoInver = inputMontoInver.replace(/,/g, '');

    let params =
        'operation=createInvesment' +
        '&cveinvestor=' + cveinvestor +
        '&inputDateInver=' + inputDateInver +
        '&inputMontoInver=' + inputMontoInver +
        '&inputObsInver=' + inputObsInver;

    console.warn('Holiiiiii');
    // //! Petición HTTP
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.stringify(xhr.responseText);
            console.table(data);
            toastr.success('Registro actualizado correctamente');
            setTimeout(() => {
                $("#modalAddInversion").modal("hide");
            }, 350);

            setTimeout(() => {
                location.reload();
            }, 650);

        } else {
            console.error('Error al insertar la inversion del Inversionista');
        }

    };
    xhr.send(params);
}

/**
 * 
 * @param {number} udpcveinverdetalle 
 * @param {Date} udpinputDateInver 
 * @param {number} udpinputMontoInver 
 * @param {String} udpinputObsInver 
 */
const fncUpdateInvesments = (
    udpcveinverdetalle, 
    udpinputDateInver,
    udpinputMontoInver,
    udpinputObsInver) => {

    udpinputMontoInver = udpinputMontoInver.substring(4);
    udpinputMontoInver = udpinputMontoInver.replace(/,/g, '');

    let params =
        'operation=UpdateDetailInvesment' +
        '&udpcveinverdetalle=' + udpcveinverdetalle +
        '&udpinputDateInver=' + udpinputDateInver +
        '&udpinputMontoInver=' + udpinputMontoInver +
        '&udpinputObsInver=' + udpinputObsInver;

    // //! Petición HTTP
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.stringify(xhr.responseText);
            console.table(data);
            toastr.success('Registro actualizado correctamente');
            setTimeout(() => {
                $("#modalEditionInvesment").modal("hide");
                alert(`CVE detalle Inversionista ${udpcveinverdetalle}`)
            }, 350);

            setTimeout(() => {
                location.reload();
            }, 650);

        } else {
            console.error('Error al insertar la inversion del Inversionista');
        }

    };
    xhr.send(params);
}

/**
 * 
 * @param {number} icveinvestor 
 */
const openEditionInvesment = (icvedetalleinver) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Detalle de la confirmación del pago a inversionista');
            console.table(data);
            document.getElementById('udpcveinverdetalle').value = data[0].icvedetalleinver;
            document.getElementById('udpinputDateInver').value  = data[0].dfecharegistro;
            document.getElementById('udpinputMontoInver').value = data[0].dmonto;
            document.getElementById('udpinputObsInver').value   = data[0].invdetobservaciones;
            $('#modalEditionInvesment').modal('show');
        }
    };
    xhr.send(`operation=readUDPPago&icvedetalleinver=${icvedetalleinver}`);
};

//Funciones para botones generalmente reciben el event => click con un función anónima

btnSaveInvesments.addEventListener('click', () => {
    let inputDateInver = document.getElementById('inputDateInver');
    let inputMontoInver = document.getElementById('inputMontoInver');
    let inputObsInver = document.getElementById('inputObsInver');

    const fieldsInvesments = [
        { element: inputDateInver, message: 'SELECCIONE LA FECHA DE INVERSI' },
        { element: inputMontoInver, message: 'DEBE INGRESAR EL MONTO A INVERTIR' },
        { element: inputObsInver, message: 'INGRESE LAS OBSERVACIONES' }
    ];

    let hasError = false;

    for (field of fieldsInvesments) {
        removeError(field.element);
        if (field.element.value === '' || field.element.value === null) {
            showError(field.element, field.message);
            field.element.focus();
            hasError = true;
            break;
        }
    }

    if (!hasError) {
        reportError(inputObsInver);
        fncInsertInvesments(
            inputDateInver.value,
            inputMontoInver.value,
            inputObsInver.value
        );
    }
});

btnAddInversion.addEventListener('click', function () {
    $('#modalAddInversion').modal('show');
});

btnSaveInvesmentsDetail.addEventListener('click', function(){
    let udpcveinverdetalle = document.getElementById('udpcveinverdetalle').value;
    let udpinputDateInver  = document.getElementById('udpinputDateInver');
    let udpinputMontoInver = document.getElementById('udpinputMontoInver');
    let udpinputObsInver   = document.getElementById('udpinputObsInver');
    
    const fieldsUDP = [
        {element: udpinputDateInver, message: 'La fecha de inversion no puede estar vacia.'},
        {element: udpinputMontoInver, message: 'El monto de la inversion no puede estar vacio.'},
        {element: udpinputObsInver, message: 'Capture las observaciones, este campo no puede estar vacio.'}
    ];

    let hasError = false;

    for (fields of fieldsUDP) {
        removeError(fields.element);
        if (fields.element.value === '' || fields.element.value === null) {
            showError(fields.element, fields.message);
            fields.element.focus();
            hasError = true;
            break;
        }
    }

    if (!hasError) {
        reportError(udpinputObsInver);
        fncUpdateInvesments(
            udpcveinverdetalle,
            udpinputDateInver.value,
            udpinputMontoInver.value,
            udpinputObsInver.value
        );
    }
});


window.addEventListener('load', descifra);