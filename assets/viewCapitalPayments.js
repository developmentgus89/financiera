//Constante de Declaracion para la base Url
const baseURL = '../Controllers/CapitalPaymentsController.php';

$('#amountCapitalPayment').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

const descifraParams = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('params')) {
        const paramsEncriptado = decodeURIComponent(queryParams.get('params'));
        var paramsDescript = CryptoJS.AES.decrypt(paramsEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);
        const params = JSON.parse(paramsDescript);
        console.table(params);

        getDataInvestment(params.icveinvestor);
        document.getElementById('icvecapitalpayment').value = params.icveinvestor;

        getCapitalPayments(params.icveinvestor);

    }
}


const getCapitalPayments = async (icvedetalleinver) => {
    let params =
        'operation=getCapitalPayments' +
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

        var tblCapitalPayments = document.getElementById('tblCapitalPayments');

        new DataTable(tblCapitalPayments, {
            perPage: 5,
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'Monto Pagado', 'Fecha y Hora de Registro', 'Estatus Pago', 'CONSULTA / VER'],
                data: data.map(function (item) {
                    // return Object.values(item);
                    var id = item['icvepagocapitalinv'];
                    var comprobante = item['comprobantepago'];
                    let montoPagado = parseFloat(item['fmontopagado']);
                    let montoFormateado = montoPagado.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    return [
                        id,
                        montoFormateado,
                        item['dfecha_pago'],
                        item['statuspago'] == 'NP' ? `<span class="badge badge-danger">No Pagado</span>` : `<span class="badge badge-success">Pagado</span>`,
                        item['cstatuspago'] == 'NP' ?
                            `<button class="btn bg-gradient-danger btn-sx" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-check-circle"></i></button>`
                            : `<button class="btn bg-gradient-success btn-sx" onclick="viewVoucherCapitalPayment(${id})" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-receipt"></i></button>`
                    ]
                })
            }
        });

    } catch (error) {
        throw new Error(`No se pueden obtener los pagos de capital: ${error.message}`);
    }

}


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


        document.getElementById('montoInvestment').innerHTML = montoF;
        document.getElementById('dateInvestment').innerHTML = data[0].dfecharegistro;
        document.getElementById('statusInvestment').innerHTML = status;
        // document.getElementById('interesInvestment').innerHTML = `${data[0].ftasainteres} %`;
        let capitalSum = await getCapitalSum(icvedetalleinver);
        capitalSum = parseFloat(capitalSum);
        let capitalSumF = capitalSum.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });

        if (isNaN(capitalSum) || capitalSum === null) capitalSumF = '$0.00';
        document.getElementById('capitalSum').innerHTML = capitalSumF;

    } catch (error) {
        throw new Error(`No se puede acceder a la informacion de la inversion ${error.message}`);
    }
}


const getCapitalSum = async (icvedetalleinver) => {
    let params =
        'operation=getCapitalSum' +
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

        return data[0].totalcapital;

    } catch (error) {
        throw new Error(`No se puede acceder al total del capital pagado ${error.message}`);
    }
}


const btnAddCapitalPayment = document.getElementById('btnAddCapitalPayment');

btnAddCapitalPayment.addEventListener('click', () => openModalAddCapitalPayment());

const openModalAddCapitalPayment = () => {
    $("#modalAddCapitalPayments").modal("show");
}


const btnShowDialogAddDoc = document.getElementById('btnShowDialogAddDoc');

btnShowDialogAddDoc.addEventListener('click', function () {
    showDialogAddDocument();
});

const showDialogAddDocument = () => {
    $("#modalAddCapitalPayments").modal("hide");
    $("#modConfirCapitalPayments").modal("show");
}


const amountCapitalPayment = document.getElementById('amountCapitalPayment');

amountCapitalPayment.addEventListener('blur', async () => {
    let cveinversion = document.getElementById('icvecapitalpayment').value;
    let amountCapPay = document.getElementById('amountCapitalPayment');
    amountCapPay = amountCapPay.value.substring(4);
    amountCapPay = amountCapPay.replace(/,/g, '');

    if (amountCapPay === '' || amountCapPay === null) {
        toastr.error('Alerta', 'Favor de verificar el monto introducido para pago a Capital');
        setTimeout(() => {
            amountCapitalPayment.focus();
            document.getElementById('btnConfirmCapitalPayment').disabled = true;
        }, 100);
    } else {
        let amountInvestment = await verifAmount(cveinversion);
        let CaptureAmount = parseFloat(amountCapPay);
        let retAmountInvestment = parseFloat(amountInvestment);
        document.getElementById('btnConfirmCapitalPayment').disabled = false;
        if (CaptureAmount > retAmountInvestment) {
            toastr.error('Monto Superior a inversion', 'Error');
            setTimeout(() => {
                amountCapitalPayment.focus();
                throw new Error('Monto Superior a inversion');
            }, 100);

            document.getElementById('btnConfirmCapitalPayment').disabled = true;

        } else {
            document.getElementById('btnConfirmCapitalPayment').disabled = false;
        }
    }
});

const verifAmount = async (cveinversion) => {
    let params =
        'operation=getAmountInvestment' +
        '&cveinversion=' + cveinversion;
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
        let monto = data[0].dmonto
        return monto;
    } catch (error) {
        throw new Error(`No se puede acceder a la informacion de la inversion ${error.message}`);
    }
}


const btnConfirmCapitalPayment = document.getElementById('btnConfirmCapitalPayment');

btnConfirmCapitalPayment.addEventListener('click', function () {
    uploadVoucherCapital();
});


const uploadVoucherCapital = () => {
    var formData = new FormData();
    var imageVoucherCapital = document.getElementById('CapitalPaymentVoucher').files[0];
    let cveinversion = document.getElementById('icvecapitalpayment').value;
    let amountCapitalPayment = document.getElementById('amountCapitalPayment').value;
    let amountCapPay = amountCapitalPayment.substring(4);
    amountCapPay = amountCapPay.replace(/,/g, '');

    if (!imageVoucherCapital) {
        toastr.error('Error', 'No ha seleccionado una imagen');
        throw new Error('No ha seleccionado la imagen.');
    }

    //Se construye el objeto de tipo archivo
    formData.append("file", imageVoucherCapital);

    //Se agrega el parametro para el operador del controlador
    formData.append('operation', 'uploadvoucher');
    formData.append('cveinversion', cveinversion);
    formData.append('amountCapPay', amountCapPay);

    console.info(formData);
    console.table(formData);

    fetch(baseURL, {method: 'POST', body: formData
    }).then(response => response.text()).then(data => {
            console.info(data);
            setTimeout(progressBar, 1000);

        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * progressBar
 */
const progressBar = () => {
    $('#modConfirCapitalPayments').modal('hide');
    $('#modalProgressBarCapital').modal('show');

    let progress = 0;

    function updateProgressBar() {
        let progressBar = document.getElementById("myProgressBar");
        progress += 1; // Incrementar el progreso
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);

        if (progress < 100) {
            setTimeout(updateProgressBar, 100); // Ajusta el tiempo según sea necesario
        } else {
            document.getElementById("statusMessage").style.display = 'block';
            // location.reload(); //? Para que la tia no le de F5
        }
    }

    updateProgressBar();
}


const viewVoucherCapitalPayment = async (idcapitalpayment) => {
    console.info(idcapitalpayment);
    console.info(`Hola mundo VOucher`);

    let params =
        'operation=getVoucherCapitalPayment' +
        '&idcapitalpayment=' + idcapitalpayment;
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
        console.log(data[0].comprobante);
        let img = document.getElementById('voucherCapitalPayment');
        img.src = data[0].comprobante;
        
        $('#modalViewVoucherCapital').modal('show');
    } catch (error) {
        throw new Error(`No se pudo obtener el voucher de pago a capital: ${error.message}`);
    }
}










window.addEventListener('load', descifraParams);