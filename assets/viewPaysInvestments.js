//Constante de Declaracion para la base Url
const baseURL = '../Controllers/ViewPaysController.php';

const descifraParams = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('params')) {
        const paramsEncriptado = decodeURIComponent(queryParams.get('params'));
        var paramsDescript = CryptoJS.AES.decrypt(paramsEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);
        const params = JSON.parse(paramsDescript);
        console.table(params);
        
        getDataInvestment(params.icveinvestor);
        getPaysInsterestsInvestment(params.icveinversionista, params.icveinvestor, params.interes, params.dmonto);
        // insertPaysInsterests(params.icveinversionista, params.icveinvestor, params.interes, params.dmonto);
    }
}

/**
 * Btn Show Dialog Add Voucher
 */
const btnShowDialogAddDoc = document.getElementById('btnShowDialogAddDoc');

btnShowDialogAddDoc.addEventListener('click', function(){

    showDialogAddDocument();
});


const btnRegresaModal = document.getElementById('btnRegresaModal');

btnRegresaModal.addEventListener('click', function(){
    $('#m-adddocument-pay').modal('hide');
    $('#m-confirm-pay').modal('show');
    console.info("Cambio de modales");
});


const btnConfirmPay = document.getElementById('btnConfirmPay');

btnConfirmPay.addEventListener('click', function(){
    toastr.info('Sera para pagar el pago de interes a inversionista','CONFIRMA PAGO');
});


/**
 *  Obtiene datos de la inversion
 * @param {Number} icvedetalleinver 
 */
const getDataInvestment = async (icvedetalleinver) => {
    let params =
        'operation=getDataInvestment' +
        '&icvedetalleinver=' + icvedetalleinver;
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud para obtener los pagos`);
        }

        const data = await response.json();

        console.table(data);

        let monto = parseFloat(data[0].dmonto);
        let montoF = monto.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });

        let status = '';
        data[0].cstatus == 'A' ? status = 'ACTIVO' : status = 'INACTIVO';


        document.getElementById('montoInvestment').innerHTML         = montoF;
        document.getElementById('dateInvestment').innerHTML          = data[0].dfecharegistro;
        document.getElementById('statusInvestment').innerHTML        = status;
        document.getElementById('interesInvestment').innerHTML       = `${data[0].ftasainteres} %`;
        document.getElementById('totalInterestInvestment').innerHTML = '$ 0.00 MXN';

    } catch (error) {
        throw new Error(`No se puede acceder a la informacion de la inversion ${error.message}`);
    }
}

const insertPaysInsterests = async (icveinversionista, icvedetalleinver, interes, dmonto) => {
    let params =
        'operation=insertPaysInsterests' +
        '&icveinversionista=' + icveinversionista +
        '&icvedetalleinver=' + icvedetalleinver +
        '&interes=' + interes + 
        '&dmonto=' + dmonto;

        console.log(params);
    
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud con el servidor para insertar el pago`);
            }

            const data = await response.json();
            console.table(data);

            if(data.msj === 'success'){
                location.reload();
            }

        } catch (error) {
            throw new Error(`No se puede insertar el pago de interes: ${error.message}`);
        }
    

}


/**
 * 
 * @param {Number} icveinversionista 
 * @param {Number} icvedetalleinver 
 */
const getPaysInsterestsInvestment = async (icveinversionista, icvedetalleinver, interes, dmonto) => {
    let params =
        'operation=getRowsInvestments' +
        '&icveinversionista=' + icveinversionista +
        '&icvedetalleinver=' + icvedetalleinver;
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud para obtener los pagos`);
        }

        const data = await response.json();

        if(Object.keys(data).length === 0){
            insertPaysInsterests(icveinversionista, icvedetalleinver, interes, dmonto);
        }else {
            let fechaActual = new Date();
            let fechaAnterior = new Date(data[0].dfecharegistro);

            const difMilisegundos = Math.abs(fechaActual - fechaAnterior);
            const diferenciaEnDias = Math.ceil(difMilisegundos / (1000 * 60 * 60 * 24));
            console.error(`LA DIFERENCIA EN DIAS ES -> ${diferenciaEnDias}`);

            if(diferenciaEnDias >= 27){
                insertPaysInsterests(icveinversionista, icvedetalleinver, interes, dmonto);
            }
        }

        console.table(data);
        var tblPaysInvestments = document.getElementById('tblPaysInvestments');

        new DataTable(tblPaysInvestments, {
            perPage: 1,
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'Monto Invertido', 'Fecha Registro', 'Interes', 'Estatus Pago', 'PAGAR / VER'],
                data: data.map(function (item) {
                    // return Object.values(item);
                    var id = item['icvepago'];
                    let cantidadInvertida = parseFloat(item['montoinvhist']);
                    let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    let interesGenerado = parseFloat(item['fmonto_pagado']);
                    let interesFormateado = interesGenerado.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    return [
                        id,
                        cantidadFormateada,
                        item['dfecharegistro'],
                        interesFormateado,
                        item['cstatuspago'] == 'NP' ? `<span class="badge badge-danger">No Pagado</span>` : `<span class="badge badge-success">Pagado</span>` ,
                        item['cstatuspago'] == 'NP' ? 
                            `<button class="btn bg-gradient-danger btn-sx" onclick="showMessageConfirmPay(${id})" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-check-circle"></i></button>`
                            : `<button class="btn bg-gradient-success btn-sx" onclick="viewVoucher()" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-receipt"></i></button>`
                    ]
                })
            }
        });
    } catch (error) {
        throw new Error(`Error al consultar los pagos de esta inversion ${error.message}`);
    }
}

/**
 * Solo se abre el modal del mensaje de confirmación
 * 
 * @param {number} icvepaysinterest 
 */
const showMessageConfirmPay = (icvepaysinterest) => {
    document.getElementById('icvepayment').value = icvepaysinterest;
    $('#m-confirm-pay').modal('show');
}

/**
 *  Solo comfirma si o si el pago de interes
 *  para el inversionista
 */
const showDialogAddDocument = () => {
    let cvepays = document.getElementById('icvepayment').value;
    $('#m-confirm-pay').modal('hide');
    document.getElementById('icvepaymentdoc').value = cvepays;
    $('#m-adddocument-pay').modal('show');


    // console.info(params);
    
    console.info(`CVE Pago ${cvepays}`);
}

window.addEventListener('load', descifraParams);