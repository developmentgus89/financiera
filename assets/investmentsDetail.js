//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';

// document.addEventListener('',);

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
$("#m-confirm-pay").on('hidden.bs.modal', function () {
    // location.reload();
});

//Declaracion de variables para los botones y campos globales

const btnAddInversion = document.querySelector("#btnAddInversion");
const btnSaveInvesments = document.querySelector("#btnSaveInvesments");
const btnSaveInvesmentsDetail = document.querySelector('#btnSaveInvesmentsDetail');
const btnSaveDocument = document.querySelector('#btnSaveDocument');

//Declaracion de las pestagnas

const panelPagos = document.getElementById('custom-tabs-pays');

//Declaracion para los selects
const selectInterest = document.getElementById('udpicveinteres');
const sInpuInterest  = document.getElementById('inputInteres');



//Funciones generales
const descifra = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('cveinvestors')) {
        const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
        var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

        const params = JSON.parse(paramDescript);

        // document.getElementById('cveinversionista').innerHTML= `CVE: ${params.icveinvestor}`;
        readPersonInvestor(params.icveinvestor);
        getDetailsInvestor(params.icveinvestor);
        getDetailsInvestorPays(params.icveinvestor);
        countDetailsInvestor(params.icveinvestor);
        getDetailsPaysInvesment(params.icveinvestor);
        getInterests();
        document.getElementById('fieldicveinversionista').value = params.icveinvestor;
    }

    console.log(`Parametros son: ${queryParams}`);
    console.log(`Parametros son: ${queryParams.has('cveinvestors')}`);
    console.table(paramDescript);

}

//Eventos de componentes dentro de la pantalla
panelPagos.addEventListener('DOMContentLoaded', function(){
    let cve = document.getElementById('fieldicveinversionista').value;
    getDetailsInvestorPays(cve);
});

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
                // btnAddInversion.disabled = true;
                // btnAddInversion.classList = 'btn btn-dark';
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
            // document.getElementById('icvedetalleinvinput').value = data[0].icvedetalleinver;
            var tableInvestors = document.querySelector('#tableInvestorsDetails');
            var table = new DataTable(tableInvestors, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['CVE Inv.', 'Fecha Inversion', 'Monto', 'Interes', 'Estatus', 'Tipo de Operación', 'Observaciones', 'Modificar'],
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
                            id,
                            item['dfecharegistro'],
                            cantidadFormateada,
                            `${item['ftasainteres']} %`,
                            item['cstatus'] == 'A' ? 'ACTIVO' : 'INACTIVO',
                            item['invtipooperacion'] == 'I' ? 'INGRESO' : 'EGRESO',
                            item['invdetobservaciones'],
                            `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="openEditionInvesment(${id})"><i class="fas fa-money-check"></i>&nbsp;EDITAR </button>`
                            // `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                        ]
                    })
                }
            });
        } else {
            console.error('Error al leer los Inversionistas');
        }
    };
    xhr.send(`operation=readdetails&icveinves=${icveinvestor}`);
};

/**
 * 
 * @param {number} icveinvestor 
 * @param {boolean} op 
 */
const getDetailsInvestorPays = (icveinvestor, op) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Detalle de pagos de interes a inversionistas');
            console.table(data);
            var tblPaysInterests = document.querySelector('#tableInvestorsDetailsPays');
            // tblPaysInterests.innerHTML = '';
            new DataTable(tblPaysInterests, {
                perPage: 3,
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['CVE PAGO', 'CVE Inv.', 'Importe Inversion', 'Importe Interes', 'Fecha Hora Generado', 'Estatus Pago', 'Fecha Confirmación', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Confirmar Pago'],
                    data: data.map(function (item) {

                        var id = item['icvepago'];
                        let cantImpInv = parseFloat(item['montoinvehist']);
                        let cantImpInvFormateada = cantImpInv.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                        });
                        let cantPago = parseFloat(item['importe']);
                        let cantPagoFormateada = cantPago.toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                        });
                        return [
                            id,
                            item['icvedetalleinver'],
                            cantImpInvFormateada,
                            cantPagoFormateada,
                            item['fecha'],
                            item['statuspago'] === 'NP' ? `<span class="badge badge-danger">PENDIENTE</span>` : `<span class="badge badge-info">PAGADO</span>`,
                            item['dtfechapagconfirmado'],
                            item['cnombre'],
                            item['capaterno'],
                            item['camaterno'],
                            item['statuspago'] === 'NP' ?
                                `<button class="btn bg-gradient-info btn-sm" id="btnConfirmPay" data-toggle="tooltip" data-placement="top" title="Confirmar Pago" onclick="openModalconfirmPayment(${id})"><i class="fas fa-money-check"></i></button>` :
                                `<button class="btn bg-gradient-secondary btn-sm" id="btnConfirmPay" data-toggle="tooltip" data-placement="top" title="Confirmar Pago" onclick="openModalconfirmPayment(${id})" disabled><i class="fas fa-money-check"></i></button>`
                            // `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                        ]
                    })
                },
                options: {
                    rowCallback: function (data, tr) {
                        var statusPago = data[4];
                        if (statusPago) {
                            tr.style.backgroundColor = 'red';
                        } else {
                            tr.style.backgroundColor = 'green';
                        }
                    }
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
 * @param {Bolean} op 
 */
const getInterests = async (op) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getInterests`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud `);
        }

        const interests = await response.json();
        console.table(interests);

        selectInterest.innerHTML = ``;
        sInpuInterest.innerHTML = ``;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'SELECCIONE INTERES';
        selectInterest.appendChild(defaultOption);

        const defaultOption2 = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'SELECCIONE INTERES';
        sInpuInterest.appendChild(defaultOption);

        interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.icvetasascomisiones;
            option.textContent = `${interest.ftasainteres} % --> ${interest.cdescripciontascom}`;
            selectInterest.append(option);

        });

        interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.icvetasascomisiones;
            option.textContent = `${interest.ftasainteres} % --> ${interest.cdescripciontascom}`;
            sInpuInterest.append(option);

        });


    } catch (error) {
        throw new Error(`Error en la solicitud par obtener los interes del catalogo ${error.message}`);
    }
}


/**
 * 
 * @param {Date} inputDateInver 
 * @param {number} inputMontoInver 
 * @param {String} inputObsInver 
 */
const fncInsertInvesments = (inputDateInver, inputInteres, inputMontoInver, inputObsInver) => {
    let cveinvestor = document.getElementById('fieldicveinversionista').value;

    inputMontoInver = inputMontoInver.substring(4);
    inputMontoInver = inputMontoInver.replace(/,/g, '');

    let params =
        'operation=createInvesment' +
        '&cveinvestor=' + cveinvestor +
        '&inputDateInver=' + inputDateInver +
        '&inputInteres=' + inputInteres +
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
                // location.reload();
            }, 1050);

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
    udpcveinversionista,
    udpcveinverdetalle,
    udpinputDateInver,
    udpicveinteres,
    udpinputMontoInver,
    udpinputObsInver) => {

    udpinputMontoInver = udpinputMontoInver.substring(4);
    udpinputMontoInver = udpinputMontoInver.replace(/,/g, '');

    let params =
        'operation=UpdateDetailInvesment' +
        '&udpcveinversionista=' + udpcveinversionista +
        '&udpcveinverdetalle=' + udpcveinverdetalle +
        '&udpinputDateInver=' + udpinputDateInver +
        '&udpicveinteres=' + udpicveinteres +
        '&udpinputMontoInver=' + udpinputMontoInver +
        '&udpinputObsInver=' + udpinputObsInver;

    // //! Petición HTTP
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            if (data.msj) {
                setTimeout(() => {
                    $("#modalEditionInvesment").modal("hide");
                    toastr.info('Se actualizo correctamente la cantidad de la insersion.');
                }, 350);

                setTimeout(() => {
                    location.reload();
                }, 1150);
            }
        } else {
            throw new Error('Error al insertar la inversion del Inversionista');
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
            document.getElementById('udpicveinteres').value     = data[0].icvetasascomisiones;
            document.getElementById('udpinputMontoInver').value = data[0].dmonto;
            document.getElementById('udpinputObsInver').value   = data[0].invdetobservaciones;
            $('#modalEditionInvesment').modal('show');
        }
    };
    xhr.send(`operation=readUDPPago&icvedetalleinver=${icvedetalleinver}`);
};

/**
 * 
 * @param {number} icvedetalleinver 
 * @returns String JSON
 */
const getDetailsPaysInvesment = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=readdetailsinverpays&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud `);
        }

        const data = await response.json();
        console.table(data);
        if (Object.keys(data).length === 0) {
            insertPaysInvesments(icveinversionista);
            getDetailsInvestorPays(icveinversionista);
        } else {
            const fechaAnterior = new Date(data[0].dfecharegistro);
            const fechaActual = new Date();
            console.table(data);
            console.warn(`Fecha Actual => ${fechaActual}`);
            console.warn(`Fecha Anterior => ${fechaAnterior}`);

            const difFechasMiliSegundos = fechaActual - fechaAnterior;
            const diferenciasDias = Math.trunc(difFechasMiliSegundos / (1000 * 60 * 60 * 24));
            console.warn(`Diferencia en dias => ${diferenciasDias}`);
            diferenciasDias >= 30 ? insertPaysInvesments(icveinversionista) : console.warn(`No hacemos nada`);
            getDetailsInvestorPays(icveinversionista);
        }


        // return data;
    } catch (error) {
        console.error(`Error al leer los pagos de los inversionistas ${error.message}`);
    }
}


const insertPaysInvesments = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=insertDetailsPaysInvesment&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud, no se pueden consultar el pago ${icvedetalleinver}`);
        }

        const data = await response.json();
        if (data.msj) {
            setTimeout(() => {
                toastr.info('Se insertó el registro de pago de interes correctamente');
            }, 350);

            setTimeout(() => {
                // getDetailsInvestorPays(icveinversionista);
            }, 1050);
        }

    } catch (error) {
        throw new Error(`Error al generar el pago de interes ${error.message}`);
    }
}

const openModalconfirmPayment = async (icvepago) => {
    document.getElementById('icvepayment').value = icvepago;
    let text = document.getElementById('text-msj');
    text.innerHTML = `¿Desea confirmar el pago de interés con número de clave: ${icvepago} ?`;
    $("#m-confirm-pay").modal("show");
}

const confirmPay = async () => {
    let icvepago = document.getElementById('icvepayment').value;
    let docaddpay = document.getElementById('paycompfile');
    let file = docaddpay.files[0];
    try {
        if (!file) {
            toastr.error('Debe de seleccionar un archivo');
            throw new Error('debe de seleccionar un archivo');
        } else if (!file.type.startsWith('image/')) {
            toastr.error('El archivo es una imagen');
            throw new Error('El archivo es una imagen');
        } else {
            // const fileName2 = `${icvepago}_${file.name}`;
            const fileName = `/docs/${file.name}`;
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `operation=confirmpay&icvepago=${icvepago}&comprobante=${fileName}`
            });

            if (!response.ok) {
                toastr.error(`Error en la solicitud, no se pueden consultar el pago ${icvepago}`);
                throw new Error(`Error en la solicitud, no se pueden consultar el pago ${icvepago}`);
            }

            const data = await response.json();
            if (data.msj) {
                uploadFile(file);

                setTimeout(() => {
                    // location.reload();
                }, 1050);
            }
        }


    } catch (error) {
        throw new Error(`Error en la confirmacion del pago ${error.message}`);
    }
}

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('voucher', file);

    console.log(`Características del voucher ${formData}`);
    console.table(formData);

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=upload&${formData}`
        });

        if (!response.ok) {
            toastr.error(`Error en la carga del Voucher de pago.`);
            throw new Error(`Error en la carga del Voucher de pago.`);
        }

        const data = await response.json();
        console.table(data);

    } catch (error) {
        toastr.error(`Error al subir la carga del voucher ${error.message}`);
        console.log(error);
    }

}

//Funciones para botones generalmente reciben el event => click con un función anónima
btnSaveInvesments.addEventListener('click', () => {
    let inputDateInver = document.getElementById('inputDateInver');
    let inputInteres = document.getElementById('inputInteres');
    let inputMontoInver = document.getElementById('inputMontoInver');
    let inputObsInver = document.getElementById('inputObsInver');

    const fieldsInvesments = [
        { element: inputDateInver, message: 'SELECCIONE LA FECHA DE INVERSI' },
        { element: inputInteres, message: 'SELECCIONE LE PORCENTAJE DE INTERES' },
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
            inputInteres.value,
            inputMontoInver.value,
            inputObsInver.value
        );
    }
});

btnAddInversion.addEventListener('click', function () {
    $('#modalAddInversion').modal('show');
});

btnSaveInvesmentsDetail.addEventListener('click', function () {
    let udpcveinversionista = document.getElementById('fieldicveinversionista').value;
    let udpcveinverdetalle  = document.getElementById('udpcveinverdetalle').value;
    let udpicveinteres      = document.getElementById('udpicveinteres');
    let udpinputDateInver   = document.getElementById('udpinputDateInver');
    let udpinputMontoInver  = document.getElementById('udpinputMontoInver');
    let udpinputObsInver    = document.getElementById('udpinputObsInver');

    const fieldsUDP = [
        { element: udpinputDateInver, message: 'La fecha de inversion no puede estar vacia.' },
        { element: udpicveinteres, message: 'Debe de Seleccionar el tipo de interes.' },
        { element: udpinputMontoInver, message: 'El monto de la inversion no puede estar vacio.' },
        { element: udpinputObsInver, message: 'Capture las observaciones, este campo no puede estar vacio.' }
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
            udpcveinversionista,
            udpcveinverdetalle,
            udpinputDateInver.value,
            udpicveinteres.value,
            udpinputMontoInver.value,
            udpinputObsInver.value
        );
    }
});

btnIrAInv.addEventListener('click', function () {
    let icvepago = document.getElementById('icvepayment').value;
    $("#m-confirm-pay").modal("hide");
    let textnopaydoc = document.getElementById('cvepagodoc');
    textnopaydoc.innerHTML = icvepago;
    $("#m-adddocument-pay").modal("show");
});

btnSaveDocument.addEventListener('click', function () {
    confirmPay();
});


window.addEventListener('load', descifra);