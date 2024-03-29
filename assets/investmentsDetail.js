import * as banks from "./bankAccounts.js";


//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';
const URL_g = '../Controllers/StatisticalGraphsController.php'; // Graficas URL Controller

// document.addEventListener('',);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

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

$('#setInputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

//Eventos de modales
$("#modalAddDataBank").on('hidden.bs.modal', function () {
    descifra();
    $('#modalSeeDataBank').modal('show');
});

//Declaracion de variables para los botones y campos globales
const btnAddInversion = document.querySelector("#btnAddInversion");
const btnSaveInvesments = document.querySelector("#btnSaveInvesments");
const btnSaveUpdateInvesmentsDetail = document.querySelector('#btnSaveUpdateInvesmentsDetail');
const btnSaveDocument = document.querySelector('#btnSaveDocument');
const btnSeeBankData = document.querySelector('#seeBankData');
const btnSeeBeneficiaries = document.querySelector('#seeBeneficiaries');
const btnBackInvestments = document.querySelector('#btnBackInvestments');

//Declaracion de las pestagnas

const panelPagos = document.getElementById('custom-tabs-pays');

//Declaracion para los selects
const selectInterest = document.getElementById('udpicveinteres');
const sInpuInterest = document.getElementById('setIinputInteres');
const selInversiones = document.getElementById('selInversiones');
const selDetailsPaysInterest = document.getElementById('selInversionesPays');


//Funciones generales
const descifra = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('cveinvestors')) {
        const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
        var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

        const params = JSON.parse(paramDescript);

        getInterests();
        getInvestment(params.icveinvestor);
        getInvestmentDetails(params.icveinvestor);
        getInvestmentsByInvestor(params.icveinvestor);

        Graficos(params.icveinvestor);

        document.getElementById('fieldicveinversionista').value = params.icveinvestor;

        banks.getBanksAccounts(params.icveinvestor);
        getSumCapitalPayment(params.icveinvestor);
        banks.getBanksCat();
    }

}

const getInvestment = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getRowsInvestments&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
        }

        const data = await response.json();

        document.getElementById('fieldicveinversionista').value = data[0].icveinversionista;

        document.getElementById('idInvestor').innerHTML = `${data[0].cnombre} ${data[0].capaterno} ${data[0].camaterno}`;
        document.getElementById('nameInvestor').innerHTML = `${data[0].cnombre} ${data[0].capaterno} ${data[0].camaterno}`;
        document.getElementById('telephoneInvestor').innerHTML = `${data[0].ctelefono}`;
        document.getElementById('mailInvestor').innerHTML = `${data[0].cemail}`;

    } catch (error) {
        throw new Error(`No se pudo completar la consulta de inversiones del inversionista ${error.message}`);
    }
}

const getInvestmentDetails = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getInvestorStatistics&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error con el servidor, no se puede ejecutar la operacion de estadisticas`);
        }

        const data = await response.json();

        let cantTotalInvertida = document.querySelector('#totalCapital');
        let cantTotInv = parseFloat(data[0].totalcapital);
        cantTotInv = cantTotInv.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });

        cantTotalInvertida.innerHTML = cantTotInv;

        document.querySelector('#totalInversiones').innerHTML = data[0].total

    } catch (error) {
        throw new Error(`No se pudo completar las estadisticas del inversionista ${error.message}`);
    }
}


const getSumCapitalPayment = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getSumCapitalPayment&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error con el servidor, no se puede ejecutar la operacion de estadisticas`);
        }

        const data = await response.json();

        let cantPaysInterests = document.querySelector('#interesTotalPagado');
        let cantTotInv = parseFloat(data[0].total);
        if(cantTotInv > 0){
            cantTotInv = cantTotInv.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });
        }else{
            cantTotInv = '$ 0.00';
        }
       

        cantPaysInterests.innerHTML = cantTotInv;

    } catch (error) {
        throw new Error(`No se pudo completar las estadisticas del inversionista ${error.message}`);
    }
}

/**
 * 
 * @param {Number} icveinversionista 
 */
const getInvestmentsByInvestor = async (icveinversionista) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getInvestments&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
        }

        const data = await response.json();

        var tblInvestments = document.getElementById('tblInversiones');

        new DataTable(tblInvestments, {
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'Monto', '% Interes', 'Fec. Registro', 'INTERESES', 'PAGOS CAPITAL', 'EDITAR'],
                data: data.map(function (item) {
                    // return Object.values(item);
                    var id = item['icvedetalleinver'];
                    let cantidadInvertida = parseFloat(item['dmonto']);
                    let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    return [
                        id,
                        cantidadFormateada,
                        `${item['ftasainteres']} %`,
                        item['dfecharegistro'],
                        `<button class="btn bg-gradient-info btn-sx" style="margin: auto; display: block;" onclick="openViewPaysInvestment(${icveinversionista}, ${id}, ${item['ftasainteres']}, ${item['dmonto']})" data-toggle="tooltip" data-placement="top" title="Intereses"><i class="fas fa-money-check"></i></button>`,
                        `<button class="btn bg-gradient-primary btn-sx" style="margin: auto; display: block;" onclick="openViewCapitalPayments(${icveinversionista},${id})" data-toggle="tooltip" data-placement="top" title="Retiros a Capital"><i class="fas fa-coins"></i></button>`,
                        `<button class="btn bg-gradient-warning btn-sx" style="margin: auto; display: block;" onclick="openEditionInvesment(${icveinversionista},${id})" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-edit"></i></button>`
                    ]
                })
            }
        });


    } catch (error) {
        throw new Error(`No se pudo completar la consulta de inversiones del inversionista ${error.message}`);
    }
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
 * @param {Number} icveinversionista 
 * @param {Number} icvedetalleinver 
 */
const openEditionInvesment = async (icveinversionista, icvedetalleinver) => {
    document.getElementById('udpcveinversionista').value = icveinversionista;
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=readUDPPago&icvedetalleinver=${icvedetalleinver}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
        }

        const data = await response.json();

        document.getElementById('udpcveinverdetalle').value = data[0].icvedetalleinver;
        document.getElementById('udpinputDateInver').value = data[0].dfecharegistro;
        document.getElementById('udpicveinteres').value = data[0].icvetasascomisiones;
        document.getElementById('udpinputMontoInver').value = data[0].dmonto;
        document.getElementById('udpinputObsInver').value = data[0].invdetobservaciones;
        $('#modalEditionInvesment').modal('show');
    } catch (error) {
        throw new Error(`Error en la apertura del modal para modificacion de la inversion ${error.message}`);
    }

};

const updateInvestmentData = async (
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

    try {      
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Deseas actualizar esta inversión?",
            text: "Este cambio afectará los pagos de inversión que se generen de manera mensual.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No, cancelar!",
            confirmButtonText: "Si!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(baseURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                });
                const data = await response.json();
                if (data.msg == 'success') {
                    swalWithBootstrapButtons.fire({
                        title: "Inversión Actualizada!",
                        text: data.text,
                        icon: "success"
                    }).then(result => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            }
        });

    } catch (error) {
        throw new Error(`Error en la operacion: ${error.message}`);
    }
}


/**
 * 
 * @param {Number} icveinversionista 
 * @param {Date} InputDateInver 
 * @param {Number} InputMontoInver 
 * @param {Number} InputInteres 
 * @param {String} InputObsInver 
 */
const setNewInvesmentDetail = async (icveinversionista, InputDateInver, InputMontoInver, InputInteres, InputObsInver) => {
    InputMontoInver = InputMontoInver.substring(4);
    InputMontoInver = InputMontoInver.replace(/,/g, '');
    let params =
        'operation=insertAddInvestment' +
        '&icveinversionista=' + icveinversionista +
        '&InputDateInver=' + InputDateInver +
        '&InputMontoInver=' + InputMontoInver +
        '&InputInteres=' + InputInteres +
        '&InputObsInver=' + InputObsInver;

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error('Error con la comunicacion con el servidor');
        }

        const data = await response.json();


        toastr.success('Se insertó la inversión correctamente');
        setTimeout(() => {
            $("#modalAddInversion").modal("hide");
        }, 350);

        setTimeout(() => {
            location.reload();
        }, 650);


    } catch (error) {

    }
}

// ============ Manejo de Estadisticas para la grafica del Inversionista =========
const readInvesments = async (icveinversionista, op) => {
    try {
        const response = await fetch(URL_g, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=${op}&icveinversionista=${icveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error con el servidor, no se puede ejecutar la operacion de estadisticas`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`No se pudo completar las estadisticas del inversionista ${error.message}`);
    }
}

btnSaveUpdateInvesmentsDetail.addEventListener('click', function () {
    const fields = [
        'udpcveinversionista',
        'udpcveinverdetalle',
        'udpinputDateInver',
        'udpinputMontoInver',
        'udpicveinteres',
        'udpinputObsInver',
    ];

    const values = {};

    fields.forEach((field) => {
        values[field] = document.getElementById(field).value;
    });
    
    updateInvestmentData(
        values['udpcveinversionista'],
        values['udpcveinverdetalle'],
        values['udpinputDateInver'],
        values['udpicveinteres'],
        values['udpinputMontoInver'],
        values['udpinputObsInver']
    );
});

//Con esto se abre el catalogo para ver las cuentas bancarias
btnSeeBankData.addEventListener('click', function () {
    let icveinvestor = document.getElementById('fieldicveinversionista').value;
    const parametro = { icveinvestor: icveinvestor};
    const paramEncrypt = CryptoJS.AES.encrypt(JSON.stringify(parametro),'financiera').toString();
    window.location.href = `InvestorsAccountsBanks.php?cveinvestors=${encodeURIComponent(paramEncrypt)}`;
});


btnSeeBeneficiaries.addEventListener('click', function () {
    let icveinvestor = document.getElementById('fieldicveinversionista').value;
    const parametro = { icveinvestor: icveinvestor};
    const paramEncrypt = CryptoJS.AES.encrypt(JSON.stringify(parametro),'financiera').toString();
    window.location.href = `InvestorsBeneficiaries.php?cveinvestors=${encodeURIComponent(paramEncrypt)}`;
});

btnAddInversion.addEventListener('click', function () {
    $('#modalAddInversion').modal('show');
});

btnSaveInvesments.addEventListener('click', function () {
    let icveinversionista = document.getElementById('fieldicveinversionista').value;
    let setInputDateInver = document.getElementById('setInputDateInver');
    let setInputMontoInver = document.getElementById('setInputMontoInver');
    let setInputInteres = document.getElementById('setIinputInteres');
    let setInputObsInver = document.getElementById('setInputObsInver');

    const valFormAddInvestment = () => {
        const fields = [
            { element: setInputDateInver, message: 'Seleccione una fecha.' },
            { element: setInputMontoInver, message: 'Ingrese la cantidad a invertir.' },
            { element: setInputInteres, message: 'Seleccione del catalogo una tasa de interes.' },
            { element: setInputObsInver, message: 'Capture las observaciones.' },
        ];

        let hasError = false;

        for (const field of fields) {
            removeError(field.element);
            if (field.element.value === '' || field.element.value === null) {
                showError(field.element, field.message);
                field.element.focus();
                hasError = true;
                break;
            }
        }

        if (!hasError) {
            removeError(setInputObsInver);
            setNewInvesmentDetail(
                icveinversionista,
                setInputDateInver.value,
                setInputMontoInver.value,
                setInputInteres.value,
                setInputObsInver.value
            );
        }
    }

    valFormAddInvestment();
});


btnBackInvestments.addEventListener('click', function () {
    window.location.href = 'InvestorsBlade.php';
});

const Message = () => {
    alert(`Edicion de la cuenta bancaraia`);
}


//! Graficos

const Graficos = async (icveinversionista) => {
    let inversiones = await readInvesments(icveinversionista, 'readInvesments');
    console.table(inversiones);
    let paysInterests = await readInvesments(icveinversionista, 'readInterests');
    console.table(paysInterests);

    let dataMap = {};

    // Agrupar datos de inversiones
    inversiones.forEach(inversion => {
        const key = `${inversion.mes}-${inversion.año}`;
        if (!dataMap[key]) {
            dataMap[key] = { totalInversion: 0, totalIntereses: 0 };
        }
        dataMap[key].totalInversion += parseFloat(inversion.totalinv);
    });

    // Agrupar datos de pagos de intereses
    paysInterests.forEach(pays => {
        const key = `${pays.mes}-${pays.año}`;
        if (!dataMap[key]) {
            dataMap[key] = { totalInversion: 0, totalIntereses: 0 };
        }
        dataMap[key].totalIntereses += parseFloat(pays.totalpaysinterest);
    });

    // Convertir clave mes-año a objeto de fecha para ordenar
    let dateLabels = Object.keys(dataMap).map(label => {
        const [mes, año] = label.split('-').map(Number); // Convertir a números
        return new Date(año, mes - 1); // Crear objeto de fecha
    });

    // Ordenar las fechas
    dateLabels.sort((a, b) => a - b);

    // Volver a mapear las etiquetas ordenadas al formato deseado
    const sortedLabels = dateLabels.map(date => `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`);

    // Mapear totales y pagos de intereses con las etiquetas ordenadas
    const totales = sortedLabels.map(label => {
        const [monthName, year] = label.split(' ');
        const key = `${getMonthIndex(monthName)}-${year}`;
        return dataMap[key].totalInversion;
    });
    const paysInts = sortedLabels.map(label => {
        const [monthName, year] = label.split(' ');
        const key = `${getMonthIndex(monthName)}-${year}`;
        return dataMap[key].totalIntereses;
    });

    var areaChartData = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Inversiones',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: true,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                fill: false,
                data: totales
            },
            {
                label: 'Intereses',
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: true,
                pointColor: 'rgba(210, 214, 222,1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                fill: false,
                data: paysInts
            }
        ]
    };

    var areaChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: true
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                },
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return `$ ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': $' + tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
            }
        }
    };

    // Asumiendo que tienes un elemento canvas en tu HTML con el id 'lineChart'
    var lineChartCanvas = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: areaChartData,
        options: areaChartOptions
    });
};

function getMonthName(monthIndex) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[monthIndex - 1];
}

function getMonthIndex(monthName) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames.indexOf(monthName) + 1;
}

// Este código debe ejecutarse después de que la página haya cargado completamente y Chart.js esté disponible.






window.addEventListener('load', descifra);