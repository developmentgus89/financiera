import * as moduleAccBanks from "./Modules/AccountsBanks/opBanksAccounts.js";

//Constante de Declaracion para la base Url
const baseURL = '../Controllers/CustomerController.php';

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$('#imontoprestamo').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#interesfijo').inputmask('currency', {
    alias: 'percentage',  // Utiliza el alias de porcentaje
    radixPoint: ".",      // Define el punto decimal, si es necesario
    digits: 2,            // Número de decimales permitidos
    autoGroup: true,      // Agrupación automática de los dígitos
    suffix: ' %',         // Añade el símbolo de porcentaje al final
    rightAlign: false,    // Alinea el texto a la izquierda
    clearMaskOnLostFocus: false // Mantiene la máscara visible incluso cuando el input pierde el foco
});

$("#modalAgregar").on('shown.bs.modal', () => {
    const selectBanks = document.getElementById('selCatIcveBancoCli');
    drawCatalogBanks(selectBanks);
    // getBanks(selectBanks);
});

const textInputs = document.querySelectorAll('input[type="text"]');

textInputs.forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});

//fecha actual
const actFecha = () => {
    const fechaInput = document.getElementById('clientDateRegister');
    const fechaActual = new Date();
    const yyyy = fechaActual.getFullYear();
    const mm = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dd = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${dd} / ${mm} / ${yyyy}`;

    fechaInput.value = fechaFormateada;
}

$('#modalAgregar').on('shown.bs.modal', () => {
    leerTipoCliente();
});


$("#modalAgregar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar = document.querySelector('#agregar-cliente');
const btnEditarCliente = document.querySelector('#agregar-cliente');
const btnEliminarCliente = document.querySelector('#btnEliminarCliente');
const btnInsertarCliente = document.querySelector('#btnInsertarCliente');
const btnActualizarCliente = document.querySelector('#btnActualizarCliente');
const selectTipoCliente = document.querySelector('#typeClient');
const barprestamosoli = document.getElementById('barprestamosoli');

barprestamosoli.value = 0;


/* Se empieza a ver el tema de calculo de solicitud de prestamo */
const cantsemanSelect = document.getElementById('cantseman');

cantsemanSelect.addEventListener('change', () => {
    let cantseman = document.getElementById('cantseman').value;
    let barprestamosoli = document.getElementById('barprestamosoli');
    let sol_porcentajeinteres = document.getElementById('sol_porcentajeinteres');
    let sol_totalInteres = document.getElementById('sol_totalInteres');
    let sol_cantprestamo = document.getElementById('sol_cantprestamo');
    let sol_totalPrestamo = document.getElementById('sol_totalPrestamo');
    let sol_pagosemanal = document.getElementById('sol_pagosemanal');
    let interesCredit = document.getElementById('interesCredit');

    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if (cantseman != 0) {

        let preinteres = (barprestamosoli.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamosoli.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        sol_porcentajeinteres.textContent = `${interesCalculado} %`;
        interesCredit.value = interesCalculado;
        sol_totalInteres.textContent = `${formatter.format(totalInteres)} MXN`;
        sol_cantprestamo.textContent = `${formatter.format(barprestamosoli.value)} MXN`;
        sol_totalPrestamo.textContent = `${formatter.format(granTotal)} MXN`;
        sol_pagosemanal.textContent = `${formatter.format(pagoPeriodo)} MXN`;

        calculoFecha(cantseman);
    } else {
        barprestamosoli.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
        });

        sol_porcentajeinteres.textContent = `0.00 %`;
        sol_totalInteres.textContent = `$ 0.00 MXN`;
        sol_cantprestamo.textContent = `$ 0.00 MXN`;
        sol_totalPrestamo.textContent = `$ 0.00 MXN`;
        sol_pagosemanal.textContent = `$ 0.00 MXN`;
    }
    calculoFecha(cantseman);

});


barprestamosoli.addEventListener('input', () => {

    let cantseman = document.getElementById('cantseman').value;
    let barprestamosoli = document.getElementById('barprestamosoli');
    let sol_porcentajeinteres = document.getElementById('sol_porcentajeinteres');
    let sol_totalInteres = document.getElementById('sol_totalInteres');
    let sol_cantprestamo = document.getElementById('sol_cantprestamo');
    let sol_totalPrestamo = document.getElementById('sol_totalPrestamo');
    let sol_pagosemanal = document.getElementById('sol_pagosemanal');
    let interesCredit = document.getElementById('interesCredit');

    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if (cantseman != 0) {
        let preinteres = (barprestamosoli.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamosoli.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        sol_porcentajeinteres.textContent = `${interesCalculado} %`;
        interesCredit.value = interesCalculado;
        sol_totalInteres.textContent = `${formatter.format(totalInteres)} MXN`;
        sol_cantprestamo.textContent = `${formatter.format(barprestamosoli.value)} MXN`;
        sol_totalPrestamo.textContent = `${formatter.format(granTotal)} MXN`;
        sol_pagosemanal.textContent = `${formatter.format(pagoPeriodo)} MXN`;

        calculoFecha(cantseman);
    } else {
        barprestamosoli.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
        });

        sol_porcentajeinteres.textContent = `0.00 %`;
        sol_totalInteres.textContent = `$ 0.00 MXN`;
        sol_cantprestamo.textContent = `$ 0.00 MXN`;
        sol_totalPrestamo.textContent = `$ 0.00 MXN`;
        sol_pagosemanal.textContent = `$ 0.00 MXN`;
    }
    calculoFecha(cantseman);

});

const calculaCantidadPrestamo = () => {

}

/**
 * 
 * @param {number} cantidadPagos 
 * @param {number} diasPeriodicidad 
 */
const calculoFecha = (cantidadPagos) => {
    let hoy = new Date();
    let fechaAproxLiquidacion = new Date(hoy.getTime() + (cantidadPagos * 7 * 24 * 60 * 60 * 1000));
    let fechaFormateada = formatDate(fechaAproxLiquidacion);

    document.getElementById('dtFechaLiquid').value = fechaFormateada;
}


const formatDate = (fecha) => {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    }

    if (mes < 10) {
        mes = '0' + mes;
    }

    return year + '-' + mes + '-' + dia;
}


//Funcion para abrir el modal al hacer click
btnAgregar.addEventListener('click', () => {
    abrirModalInsertarCliente();
});

btnInsertarCliente.addEventListener('click', () => {
    // Datos personales del cliente
    let cnombre = document.getElementById('clinombre');
    let capelpat = document.getElementById('cliapaterno');
    let capelmat = document.getElementById('cliamaterno');
    let ctelefono = document.getElementById('ctelefono');
    let cedad = document.getElementById('cliEdad');
    let typeClient = document.getElementById('typeClient');
    let cdatebirthday = document.getElementById('clientDate');
    let clientDateRegister = document.getElementById('clientDateRegister');
    let clienteStatus = document.getElementById('clienteStatus');

    // Solicitud de credito
    let cantseman = document.getElementById('cantseman');
    let barprestamosoli = document.getElementById('barprestamosoli');
    let dtFechaLiquid = document.getElementById('dtFechaLiquid');
    let interesCredit = document.getElementById('interesCredit');

    // Datos de la cuenta bancarias
    let ctabancariacli = document.getElementById('ctabancariacli');
    let typeAccountBankCli = document.getElementById('typeAccountBankCli');
    let selCatIcveBancoCli = document.getElementById('selCatIcveBancoCli');

    // Datos del domicilio del cliente
    let ccalle = document.getElementById('ccalle');
    let numinterior = document.getElementById('numinterior');
    let numexterior = document.getElementById('numexterior');
    let pricalle = document.getElementById('pricalle');
    let segcalle = document.getElementById('segcalle');
    let cp = document.getElementById('cp');
    let entidaddir = document.getElementById('entidaddir');
    let municipiodir = document.getElementById('municipiodir');
    let coloniadir = document.getElementById('coloniadir');
    let latitud = document.getElementById('latitud');
    let longitud = document.getElementById('longitud');

    // Datos de los documentos del cliente
    let idComprobanteDom = document.getElementById('idComprobanteDom');
    let idINEidentif = document.getElementById('idINEidentif');
    let idCompIngresos = document.getElementById('idCompIngresos');

    // Datos de la persona que referida
    let nombreReferido = document.getElementById("nombreReferido");
    let telefonoReferido = document.getElementById("telefonoReferido");
    let observacionesReferido = document.getElementById("referidoObservaciones");



    const validateFormCliente = () => {
        // mensajes de validacion para el Tab Datos Personales
        const fieldsDatos = [
            { element: cnombre, message: 'Ingrese el nombre del cliente' },
            { element: capelpat, message: 'Ingrese el apellido paterno del cliente' },
            { element: capelmat, message: 'Ingrese el apellido materno del cliente' },
            { element: cedad, message: 'Ingrese la edad del cliente' },
            { element: typeClient, message: 'Ingrese el tipo de cliente' },
            { element: clienteStatus, message: 'Seleccione el estatus del cliente' },
            { element: cdatebirthday, message: 'Ingrese la fecha de nacimiento del cliente' },
            { element: clientDateRegister, message: 'Ingrese la fecha de registro del cliente' },
            { element: ctelefono, message: 'Capture el n\u00famero de tel\u00e9fono' },
        ];

        // Mensajes de validacion para el Tab Solicitud de credito
        const fieldsSolCredito = [
            { element: cantseman, message: 'Ingrese la cantidad de pagos para liquidar el cr\u00E9dito.' },
            { element: barprestamosoli, message: 'Ingrese un monto para el cr\u00E9dito que se solicita.' },
        ];

        // Mensajes de validacion para el Tab de Cuentas Bancarias
        const fieldsCuentaBancaria = [
            { element: ctabancariacli, message: 'Ingrese el n\u00famero de tarjeta, cuenta o CLABE bancaria.' },
            { element: typeAccountBankCli, message: 'Seleccione el tipo de cuenta bancaria.' },
            { element: selCatIcveBancoCli, message: 'Seleccione la instituci[on bancaria.' }
        ];

        // Mensaje de validacion para el tab de Direccion del Cliente
        const fieldsDomicilio = [
            { element: ccalle, message: 'Ingrese el nombre de la calle' },
            { element: numexterior, message: 'Ingrese el n\u00famero exterior.' },
            { element: pricalle, message: 'Ingrese la primer entre calle.' },
            { element: segcalle, message: 'Ingrese la segunda entre calle.' },
            { element: cp, message: 'Ingrese el c\u00F3digo postal.' },
            { element: coloniadir, message: 'Seleccione una colonia.' },
        ];

        // Mensajes de validacion para el tab de los documentos del cliente

        const fieldsDocumentos = [
            { element: idComprobanteDom, message: 'Cargue el comprobante de domicilio.' },
            { element: idINEidentif, message: 'Cargue el documento que corresponde a la INE.' }
        ]

        //validadores de error
        let hasErrorDatos = false;
        let hasErrorSolCredito = false;
        let hasErrorCtaBancaria = false;
        let hasErrorDomicilio = false;
        let hasErrorDocumentacion = false;

        //contadores para los tabs
        let tabDatosCount = 0;
        let tabDatosSolCredit = 0;
        let tabDatosCtaBancaria = 0;
        let tabDatosDomicilio = 0;
        let tabDatosDocumentos = 0;

        // Verificacion de los campos de los datos del cliente
        for (const fieldDatos of fieldsDatos) {
            removeError(fieldDatos.element);
            if (fieldDatos.element.value === '' || fieldDatos.element.value === null) {
                showError(fieldDatos.element, fieldDatos.message);
                fieldDatos.element.focus();
                hasErrorDatos = true;
                document.getElementById('tabDatos').innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                tabDatosCount++;
                Swal.fire({
                    title: "Advertencia",
                    html: `Tienes campos necesarios en los tabs con este icono: 
                        <span id="tabDatos" style="color: #FC8804">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>.`,
                    icon: "warning"
                });
                break;
            }
        }

        if (!hasErrorDatos) {
            removeError(ctelefono);
            document.getElementById('tabDatos').innerHTML = ``;
            // tabDatosCount--;
        }

        // Datos de la solicitud de credito del cliente
        for (const fieldSolCredito of fieldsSolCredito) {
            removeError(fieldSolCredito.element);
            if (fieldSolCredito.element.value === '' || fieldSolCredito.element.value === null || fieldSolCredito.element.value === '0') {
                showError(fieldSolCredito.element, fieldSolCredito.message);
                fieldSolCredito.element.focus();
                hasErrorSolCredito = true;
                document.getElementById('solCredito').innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                tabDatosSolCredit++;
                Swal.fire({
                    title: "Advertencia",
                    html: `Tienes campos necesarios en los tabs con este icono: 
                        <span id="tabDatos" style="color: #FC8804">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>.`,
                    icon: "warning"
                });
                break;
            }
        }

        if (!hasErrorSolCredito) {
            removeError(barprestamosoli);
            document.getElementById('solCredito').innerHTML = ``;
            // tabDatosSolCredit--;
        }

        // Datos de la cuenta bancaria del cliente

        for (const fieldCtaBancaria of fieldsCuentaBancaria) {
            removeError(fieldCtaBancaria.element);
            if (fieldCtaBancaria.element.value === '' || fieldCtaBancaria.element.value === null || fieldCtaBancaria.element.value === '0') {
                showError(fieldCtaBancaria.element, fieldCtaBancaria.message);
                fieldCtaBancaria.element.focus();
                hasErrorCtaBancaria = true;
                document.getElementById('tabCtasBancarias').innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                tabDatosCtaBancaria++;
                Swal.fire({
                    title: "Advertencia",
                    html: `Tienes campos necesarios en los tabs con este icono: 
                        <span id="tabDatos" style="color: #FC8804">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>.`,
                    icon: "warning"
                });
                break;
            }
        }

        if (!hasErrorCtaBancaria) {
            removeError(selCatIcveBancoCli);
            document.getElementById('tabCtasBancarias').innerHTML = ``;
            // tabDatosCtaBancaria--;
        }

        // Datos del domicilio del cliente

        for (const fieldDatosDomicilio of fieldsDomicilio) {
            removeError(fieldDatosDomicilio.element);
            if (fieldDatosDomicilio.element.value === '' || fieldDatosDomicilio.element.value === null || fieldDatosDomicilio.element.value === '0') {
                showError(fieldDatosDomicilio.element, fieldDatosDomicilio.message);
                fieldDatosDomicilio.element.focus();
                hasErrorDomicilio = true;
                document.getElementById('tabDireccion').innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                tabDatosDomicilio++;
                Swal.fire({
                    title: "Advertencia",
                    html: `Tienes campos necesarios en los tabs con este icono: 
                        <span id="tabDatos" style="color: #FC8804">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>.`,
                    icon: "warning"
                });
                break;
            }
        }

        if (!hasErrorDomicilio) {
            removeError(selCatIcveBancoCli);
            document.getElementById('tabDireccion').innerHTML = ``;
            // tabDatosDomicilio--;
        }

        for (const fieldDatosDocu of fieldsDocumentos) {
            removeError(fieldDatosDocu.element);
            if (fieldDatosDocu.element.value === '' || fieldDatosDocu.element.value === null || fieldDatosDocu.element.value === '0') {
                showError(fieldDatosDocu.element, fieldDatosDocu.message);
                fieldDatosDocu.element.focus();
                hasErrorDocumentacion = true;
                document.getElementById('tabDocumentos').innerHTML = `<i class="fas fa-exclamation-triangle"></i>`;
                tabDatosDocumentos++;
                Swal.fire({
                    title: "Advertencia",
                    html: `Tienes campos necesarios en los tabs con este icono: 
                        <span id="tabDatos" style="color: #FC8804">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>.`,
                    icon: "warning"
                });
                break;
            }
        }

        if (!hasErrorDocumentacion) {
            removeError(idINEidentif);
            document.getElementById('tabDocumentos').innerHTML = ``;
            // tabDatosDocumentos--;
        }



        if (tabDatosCount == 0 && tabDatosSolCredit == 0 && tabDatosCtaBancaria == 0 && tabDatosDomicilio == 0 && tabDatosDocumentos == 0) {

            //--- Generacion del objeto JS para Datos Personales
            var formDataCustomer = new FormData();
            formDataCustomer.append('operation', "create");
            formDataCustomer.append('cnombre', cnombre.value);
            formDataCustomer.append('capelpat', capelpat.value);
            formDataCustomer.append('capelmat', capelmat.value);
            formDataCustomer.append('ctelefono', ctelefono.value);
            formDataCustomer.append('cedad', cedad.value);
            formDataCustomer.append('typeClient', typeClient.value);
            formDataCustomer.append('cdatebirthday', cdatebirthday.value);
            formDataCustomer.append('clientDateRegister', clientDateRegister.value);
            formDataCustomer.append('clienteStatus', clienteStatus.value);
            formDataCustomer.append('cantseman', cantseman.value);
            formDataCustomer.append('barprestamosoli', barprestamosoli.value);
            formDataCustomer.append('interesCredit', interesCredit.value);
            formDataCustomer.append('dtFechaLiquid', dtFechaLiquid.value);
            formDataCustomer.append('ctabancariacli', ctabancariacli.value);
            formDataCustomer.append('typeAccountBankCli', typeAccountBankCli.value);
            formDataCustomer.append('selCatIcveBancoCli', selCatIcveBancoCli.value);
            formDataCustomer.append('ccalle', ccalle.value);
            formDataCustomer.append('numexterior', numexterior.value);
            formDataCustomer.append('numinterior', numinterior.value);
            formDataCustomer.append('pricalle', pricalle.value);
            formDataCustomer.append('segcalle', segcalle.value);
            formDataCustomer.append('cp', cp.value);
            formDataCustomer.append('entidaddir', entidaddir.value);
            formDataCustomer.append('municipiodir', municipiodir.value);
            formDataCustomer.append('coloniadir', coloniadir.value);
            formDataCustomer.append('latitud', latitud.value);
            formDataCustomer.append('longitud', longitud.value);
            formDataCustomer.append('nombreReferido', nombreReferido.value);
            formDataCustomer.append('telefonoReferido', telefonoReferido.value);
            formDataCustomer.append('observacionesReferido', observacionesReferido.value);
            formDataCustomer.append('fileidComprobanteDom', document.getElementById('idComprobanteDom').files[0]);
            formDataCustomer.append('fileidINEidentif', document.getElementById('idINEidentif').files[0]);
            formDataCustomer.append('fileidCompIngresos', document.getElementById('idCompIngresos').files[0]);


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "¿Desea agregar los datos del cliente?",
                text: "Recuerde que puede capturar los datos de referido.",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "No.",
                confirmButtonText: "Si.",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {

                    let idCliente = await insertCustomer(formDataCustomer);
                    console.table(idCliente); //TODO: Pendiente quitar este console.log
                    //location.reload();
                } else {
                    $('#custom-tabs-one-referidos-tab').tab('show');
                }
            });
        }
    }

    validateFormCliente();
});

btnActualizarCliente.addEventListener('click', () => {
    let id = $('#udp-idcustomer').val();

    leerRowCliente(id);
    let udpcvegrado = document.getElementById('udp-icvegrado').value;
    let udpname = document.getElementById('udp-namecustomer').value;
    let udpaddress = document.getElementById('udp-addresscustomer').value;
    let udpmobile = document.getElementById('udp-mobilecustomer').value;
    // const dataTableCliente = $('#tablaClientes').DataTable();
    actualizarCliente(id, udpcvegrado, udpname, udpaddress, udpmobile);
    // dataTableCliente.destroy();
    $('#modalEditar').modal('hide');
    location.reload();

});


btnEliminarCliente.addEventListener('click', () => {
    let id = $('#deleteCliente').val();
    eliminarCliente(id);
    $('#modalBorrarCliente').modal('hide');
    location.reload();
});

const updatePaysStatusCustomer = async () => {
    let params = 'operation=updatePaysStatusCustomer';

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




    } catch (error) {
        throw new Error(`No se pueden obtener los creditos activos del cliente: ${error.message}`);
    }
}
// Función para leer los clientes
const leerClientes = async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            $(document).ready(function () {
                var table = $('#tablaClientes').DataTable({
                    data: data.map(function (item) {
                        var id = item['icvecliente'];
                        return [
                            "",
                            id,
                            `${item['cclinombre']} ${item['capaterno']} ${item['camaterno']}`,
                            item['dfechapago'],
                            parseFloat(item['total']).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
                            `<span class="badge bg-danger" style="font-size: 12px"> PAGOS PENDIENTES </span>`,
                            item['ctelefono'],
                            item['cabreviiatipo'],
                            item['cestatus']
                        ];
                    }),
                    columns: [
                        {
                            className: 'details-control',
                            orderable: false,
                            data: null,
                            defaultContent: '',
                            render: function () {
                                return '<i class="fa fa-plus-square" aria-hidden="true" style="cursor: pointer"></i>';
                            },
                            width: "15px"
                        },
                        { title: "ID" },
                        { title: "Nombre" },
                        { title: "Fecha Pago" },
                        { title: "Monto Pago" },
                        { title: "No. de Prestamos" },
                        { title: "Telefono" },
                        { title: "Tipo Cliente" },
                        { title: "Status" }
                    ],
                    "language": {
                        "url": "../assets/language/spanish.json"
                    }
                });

                $('#tablaClientes tbody').on('click', 'td.details-control', async function () {
                    var tr = $(this).closest('tr');
                    var row = table.row(tr);
                    if (row.child.isShown()) {
                        // Esta fila ya está abierta - cerrarla
                        row.child.hide();
                        tr.removeClass('shown');
                    } else {
                        // Abrir esta fila
                        row.child(await format(row.data())).show(); // Aquí debes definir cómo quieres que se vea la información adicional, `format` es una función que debes crear
                        tr.addClass('shown');
                    }
                });

                async function format(rowData) {
                    let dataCustomer = await readRowCustomer(rowData[1]);
                    //Este setTimeOut es el que carga el mapa
                    setTimeout(() => {
                        readCreditsCustomer(rowData[1]);
                        readAddressMap(rowData[1], dataCustomer[0]);
                        setCustomerMap(dataCustomer[0].latitud, dataCustomer[0].longitud, rowData[1]);
                        readAccountsBanksCustomer(rowData[1]);
                        readCollectionFinanceCustomer(rowData[1]);
                        readFilesCustomer(rowData[1]);
                    }, 50);
                    return `
                    <div class="row">
                        <div class="col-sm-12" style="color: black;">
                            <div class="card card-success card-tabs">
                                <div class="card-header p-0 pt-1">
                                    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="custom-tabs-one-home-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-home${rowData[1]}" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Creditos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-profile-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-profile${rowData[1]}" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Datos Personales y Dirección</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-banks-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-banks${rowData[1]}" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Cuentas bancarias</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-messages-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-messages${rowData[1]}" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Cobranza</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-settings-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-settings${rowData[1]}" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false">Documentacion Cargada</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-one-tabContent">
                                        <div class="tab-pane fade show active " id="custom-tabs-one-home${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <div class="card card-success card-outline">
                                                        <div class="card-body box-profile">
                                                            <h3 class="profile-username text-center">
                                                                <div id="nameCustomer-${rowData[1]}">CR&Eacute;DITOS DEL CLIENTE ACTIVOS</div>
                                                            </h3>
                                                            <hr>
                                                            <div id="credits${rowData[1]}">
                                                                <table id="tblcredits${rowData[1]}" class="table table-hover text-wrap"></table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-7">
                                                    <div class="card card-success card-outline" id="rowDetailLoan${rowData[1]}" style="display:none;">
                                                        <div class="card-body box-profile">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <h3 class="profile-username text-center">
                                                                        <div id="nameCustomerDet-${rowData[1]}">DETALLE DEL CR&Eacute;DITO SELECCIONADO</div>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="description-block border-right">
                                                                        <h4><div id="tprestamo-${rowData[1]}"></div></h4>
                                                                        <span class="description-text">TOTAL PR&Eacute;STAMO</span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="description-block border-right">
                                                                        <h4><div id="tinteres-${rowData[1]}"></div></h4>
                                                                        <span class="description-text">TOTAL INTERESES</span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="description-block border-right">
                                                                        <h4><div id="tapagar-${rowData[1]}"></div></h4>
                                                                        <span class="description-text">TOTAL A PAGAR</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div id="creditsPays${rowData[1]}">
                                                                        <table id="tblcreditspays${rowData[1]}" class="table table-hover text-wrap"></table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="custom-tabs-one-profile${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                            <div id="address-map${rowData[1]}"></div>
                                        </div>
                                        <div class="tab-pane fade" id="custom-tabs-one-banks${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                            <div id="accountsBanks${rowData[1]}">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <table id="tblaccountsBanks${rowData[1]}" class="table"></table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="custom-tabs-one-messages${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                            <div id="financeCollection${rowData[1]}"></div>
                                        </div>
                                        <div class="tab-pane fade" id="custom-tabs-one-settings${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-settings-tab">
                                            <div id="filesCustomer${rowData[1]}"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;
                }
            });


        } else {
            console.error('Error al leer los clientes');
        }
    };
    xhr.send('operation=read');
};

/**
 * 
 * @param {number} idcustomer 
 */
const readCreditsCustomer = async (idcustomer) => {
    // let credits = document.getElementById(`credits${idcustomer}`);
    var tblCreditsCustomer = document.getElementById(`tblcredits${idcustomer}`);

    let params =
        'operation=rowCreditsCustomer' +
        '&icvecliente=' + idcustomer;
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

       
        // console.log(data[0].);
        new DataTable(tblCreditsCustomer, {
            perPage: 5,
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'Monto Cr\u00E9dito', 'Inter\u00E9s aplicado', 'Fecha Solicitud', 'Fecha Liquidaci\u00F3n', 'Cambio de Esquema', 'Pagos'],
                data: data.map(function (item) {
                    var id = item['icvecredito'];
                    let monto = parseFloat(item['dmonto']);

                    let montoFormateado = monto.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    let interes = parseFloat(item['dinteres']);
                    
                    return [
                        id,
                        montoFormateado,
                        `${interes} %`,
                        item['dtfechasolicitud'],
                        item['dtfechafiniquito'],
                        item['status_2'] >= 1 
                            ?  `<button class="btn bg-gradient-warning btn-sx" data-toggle="tooltip" data-placement="top" title="Cambiar Esquema" onclick="changeLoanScheme(${id}, 1)" style="margin: auto 0"><i class="fas fa-exclamation-triangle"></i></button>`
                            :  `<button class="btn bg-gradient-success btn-sx" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="changeLoanScheme(${id}, 2)" style="margin: auto 0"><i class="fas fa-handshake"></i></button>`
                       ,
                        `<button class="btn bg-gradient-info btn-sx" data-toggle="tooltip" data-placement="top" title="Detalle del Cr&eacute;dito" onclick="detailCreditsCustomer(${idcustomer}, ${id} )" style="margin: auto 0"><i class="fa fa-list"></i></button>`
                    ]
                })
            }
        });

    } catch (error) {
        throw new Error(`No se pueden obtener los creditos activos del cliente: ${error.message}`);
    }
}

const readAddressMap = (idcostumer, dataCustomer) => {
    let address = document.getElementById(`address-map${idcostumer}`);

    address.innerHTML = `
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-success card-outline">
                            <div class="card-body box-profile">
                                    <h3 class="profile-username text-center">
                                        <div id="nameCustomer-${idcostumer}">${dataCustomer.cclinombre}</div>
                                    </h3>
                                <p class="text-muted text-center">${dataCustomer.capaterno} ${dataCustomer.camaterno}</p>
                                <ul class="list-group list-group-unbordered mb-3">
                                    <li class="list-group-item" style="text-align: left">
                                        <b>Tel&eacute;fono:</b> <b><span class="float-right" style="font-size: 24px">${dataCustomer.ctelefono}</span></b>
                                    </li>
                                    <li class="list-group-item" style="text-align: left">
                                        <b>Edad</b> <b><span class="float-right">${dataCustomer.iedad} años</span></b>
                                    </li>
                                    <li class="list-group-item" style="text-align: left">
                                        <b>Cumpleaños</b> <b><span class="float-right">${formatDateBirthday(dataCustomer.dfechanaciemiento)} </span></b>
                                    </li>
                                    <li class="list-group-item" style="text-align: left">
                                        <b>Tipo de Cliente</b> <b><span class="float-right">${dataCustomer.cabreviiatipo} </span></b>
                                    </li>
                                    <li class="list-group-item" style="text-align: left">
                                        <b>Cumpleaños</b> <b><span class="float-right">${formatDateBirthday(dataCustomer.dfechanaciemiento)} </span></b>
                                    </li>
                                </ul>
                            </div><!-- /.card-body -->
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-success card-outline">
                            <div class="card-body box-profile">
                                <h3 class="profile-username text-center">DIRECCIÓN POSTAL</h3>
                                <p class="text-muted text-center">Y DATOS DE UBICACIÓN</p>
                                    <ul class="list-group list-group-unbordered mb-3">
                    <li class="list-group-item">
                        <table>
                            <tr>
                                <td><b>Direcci&oacute;n:</b></td>
                                <td>${dataCustomer.ccalle} ${dataCustomer.cnumexterior} ${dataCustomer.cnuminterior} ${dataCustomer.ccolonia}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Municipio o Delegaci&oacute;n ${dataCustomer.cdelegmunicipio} ${dataCustomer.centfederativa} ${dataCustomer.cpais} C.P. ${dataCustomer.ccodpostal}</td>
                            </tr>
                            <tr class="text-center">
                                <td colspan="2"><b>Coordenadas de Geolocalizaci&oacute;n</b></td>
                            </tr>
                            <tr class="text-center">
                                <td><b>Latitud</b></td>
                                <td><b>Longitud</b></td>
                            </tr>
                            <tr class="text-center">
                                <td>${dataCustomer.latitud}</td>
                                <td>${dataCustomer.longitud}</td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </div><!-- /.card-body -->
        </div><!-- /.card-success -->
    </div><!-- /.end-col-md-4 -->
    <div class="col-md-4">
        <div class="card card-success card-outline">
            <div class="card-body box-profile">
                <h3 class="profile-username text-center">MAPA DE UBICACI&Oacute;N</h3>
                <p class="text-muted text-center">del cliente</p>
                <ul class="list-group list-group-unbordered mb-3">
                    <li class="list-group-item">
                        <div id="mapCustomer${idcostumer}" style="width:100%;height:250px;"></div>
                    </li>
                </ul>
            </div><!-- /.card-body -->
        </div><!-- /.card-success -->
    </div><!-- /.end-col-md-4 -->
</div><!-- /.end-row -->
    `;
    return address;
}

const readAccountsBanksCustomer = async (idcustomer) => {
    let tblaccountsBanks = document.getElementById(`tblaccountsBanks${idcustomer}`);

    let params =
        'operation=readRowaAccountsBanks' +
        '&icvecliente=' + idcustomer;
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


        new DataTable(tblaccountsBanks, {
            perPage: 5,
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'N\u00FCmero de Cuenta/Tarjeta', 'Banco', 'Tipo de Cuenta'],
                data: data.map(function (item) {

                    return [
                        item['icvectabankcli'],
                        item['cnumctabancaria'],
                        item['cnombrebanco'],
                        item['tipo_cuenta_desc']
                    ]
                })
            }
        });

    } catch (error) {
        throw new Error(`No se pueden obtener los creditos activos del cliente: ${error.message}`);
    }


    return accountsBanks;
}

/**
 * Esta funcion esta disegnada para traer todas las notas de cobranza en el tab
 * @param {number} idcustomer 
 * @returns 
 */
const readCollectionFinanceCustomer = (idcustomer) => {
    let collectionFinance = document.getElementById(`financeCollection${idcustomer}`);

    collectionFinance.innerHTML = `
            <table border="1">
                <tr>
                    <th>Columna 1</th>
                    <th>Fecha y Hora</th>
                    <th>Observaciones de algo</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2022-06-08 21:07:43</td>
                    <td>En perfecto estado</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>2022-08-19 01:06:10</td>
                    <td>Nada que reportar</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>2022-10-20 09:05:16</td>
                    <td>Se observaron variaciones menores</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>2023-05-16 06:01:39</td>
                    <td>Se observaron variaciones menores</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>2022-08-30 00:01:51</td>
                    <td>Revisión completa, sin hallazgos</td>
                </tr>
            </table>
    `;

    return collectionFinance;
}

const readFilesCustomer = (idcustumer) => {
    let tableFiles = document.getElementById(`filesCustomer${idcustumer}`);

    tableFiles.innerHTML = `
            <div class="card card-success">
                <div class="card-header">
                    <h3 class="card-title">Archivos de comprobaci&oacute;n</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Descripción de Arvhivo</th>
                                <th>Nombre de Archivo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Functional-requirements.docx</td>
                                <td>49.8005 kb</td>
                                <td class="text-right py-0 align-middle">
                                    <div class="btn-group btn-group-sm">
                                        <a href="#" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                                        <a href="#" class="btn btn-success"><i class="far fa-edit"></i></a>
                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>UAT.pdf</td>
                                <td>28.4883 kb</td>
                                <td class="text-right py-0 align-middle">
                                    <div class="btn-group btn-group-sm">
                                        <a href="#" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                                        <a href="#" class="btn btn-success"><i class="far fa-edit"></i></a>
                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Email-from-flatbal.mln</td>
                                <td>57.9003 kb</td>
                                <td class="text-right py-0 align-middle">
                                    <div class="btn-group btn-group-sm">
                                        <a href="#" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                                        <a href="#" class="btn btn-success"><i class="far fa-edit"></i></a>
                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Logo.png</td>
                                <td>50.5190 kb</td>
                                <td class="text-right py-0 align-middle">
                                    <div class="btn-group btn-group-sm">
                                        <a href="#" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                                        <a href="#" class="btn btn-success"><i class="far fa-edit"></i></a>
                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Contract-10_12_2014.docx</td>
                                <td>44.9715 kb</td>
                                <td class="text-right py-0 align-middle">
                                    <div class="btn-group btn-group-sm">
                                        <a href="#" class="btn btn-info"><i class="far fa-file-pdf"></i></a>
                                        <a href="#" class="btn btn-success"><i class="far fa-edit"></i></a>
                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> <!-- /.card-body -->
            </div> <!-- /.card-success -->
    `;

    return tableFiles;
}


const leerCreditosPorCliente = async (icvecliente) => {
    let params =
        'operation=readCreditsByCustomer' +
        '&icvecliente=' + icvecliente;
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

        var tblCreditsCustomer = document.getElementById(`tblcredits${icvecliente}}`);

        new DataTable(tblCreditsCustomer, {
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

const readRowCustomer = async (id) => {
    let params =
        'operation=row' +
        '&idCliente=' + id;
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

        return data;

    } catch (error) {
        throw new Error(`No se pueden obtener los pagos de capital: ${error.message}`);
    }
}

window.detailCreditsCustomer = async (idcliente, idcreditCustomer) => {
    var tblCreditDetail = document.getElementById(`tblcreditspays${idcliente}`);

    if (tblCreditDetail.dataTableInstance) {
        tblCreditDetail.dataTableInstance.destroy();
        tblCreditDetail.innerHTML = ''; // Limpiar el contenido de la tabla
    }
    let params = 'operation=rowCreditCusDetail' + '&idcreditCustomer=' + idcreditCustomer;
    
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

        // Check if the totals are included in the response
        let tprestamo = 0, tintereses = 0, ttotal = 0;
        if (data.length > 0 && data[0].hasOwnProperty('tprestamo') && data[0].hasOwnProperty('tintereses') && data[0].hasOwnProperty('ttotal')) {
            tprestamo = parseFloat(data[0].tprestamo);
            tintereses = parseFloat(data[0].tintereses);
            ttotal = parseFloat(data[0].ttotal);
        } else {
            // If the totals are not included, calculate them manually
            data.forEach(item => {
                tprestamo += parseFloat(item.dpaycapital);
                tintereses += parseFloat(item.dpayinteres);
                ttotal += parseFloat(item.total);
            });
        }

        tblCreditDetail.dataTableInstance = new DataTable(tblCreditDetail, {
            perPage: 10,
            data: {
                headings: ['ID', 'Pag a Capital', 'Pago Interes', 'Total', 'Fecha Pago', 'Estado'],
                data: data.map(function (item) {
                    var id = item['icvedetallepago'];
                    let dpaycapital = parseFloat(item['dpaycapital']);
                    let dpayinteres = parseFloat(item['dpayinteres']);
                    let dpaycapitalFormateado = dpaycapital.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    let dpayinteresFormateado = dpayinteres.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    let total = parseFloat(item['total']);
                    let totalFormateado = total.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });

                    let fechaPago = item['dfechapago'];
                    let fechaPagoDate = new Date(fechaPago);
                    let fechaActual = new Date();
                    fechaActual.setDate(fechaActual.getDate() - 1);

                    let icon = ``;
                    if (fechaPagoDate < fechaActual && item['cestatuspago'] != '1') {
                        icon = `<span class="badge bg-danger" style="font-size: 12px"> VENCIDO </span>`;
                    } else {
                        if (item['cestatuspago'] == '0') {
                            icon = `<i class="fa fa-times-circle" style="color:red;"></i>`;
                        } else {
                            icon = `<i class="fas fa-check-circle" style="color:green;"></i>`;
                        }
                    }

                    return [
                        id,
                        dpaycapitalFormateado,
                        dpayinteresFormateado,
                        totalFormateado,
                        item['dfechapago'],
                        icon
                    ]
                })
            }
        });

        document.getElementById(`rowDetailLoan${idcliente}`).style.display = 'block';

        document.getElementById(`tprestamo-${idcliente}`).innerHTML = `${tprestamo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
        document.getElementById(`tinteres-${idcliente}`).innerHTML = `${tintereses.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
        document.getElementById(`tapagar-${idcliente}`).innerHTML = `${ttotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;

    } catch (error) {
        throw new Error(`No se pueden obtener los pagos del crédito solicitado: ${error.message}`);
    }
}


window.changeLoanScheme = (idCredit, op = null) => {
    $("#mod-cambioEsquema").modal('show');
}

const leerRowCliente = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const cliente = JSON.parse(xhr.responseText);
            const defaultOptionUDP = document.createElement('option');
            defaultOptionUDP.value = cliente[0].icvegrado;
            defaultOptionUDP.textContent = cliente[0].cgradoabrevia;
            selectGradosUDP.append(defaultOptionUDP);
            document.getElementById('udp-icvegrado').value = cliente[0].icvegrado;
            document.getElementById('udp-namecustomer').value = cliente[0].name;
            document.getElementById('udp-addresscustomer').value = cliente[0].address;
            document.getElementById('udp-mobilecustomer').value = cliente[0].mobile;



        } else {
            console.error('Error al leer el cliente');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};


const insertCustomer = async (formDataCustomer) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            body: formDataCustomer // Usando FormData directamente
        });

        if (!response.ok) {
            throw new Error('Error con la comunicación con el servidor');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Error en el servidor: ${error.message}`);
    }
};


const insertCreditCustomer = () => {

}

const leerTipoCliente = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const tiposClientes = JSON.parse(xhr.responseText);

            selectTipoCliente.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'SELECCIONE';
            selectTipoCliente.appendChild(defaultOption);

            tiposClientes.forEach(tipoCliente => {
                const option = document.createElement('option');
                option.value = tipoCliente.icvetipocliente;
                option.textContent = `${tipoCliente.cabreviiatipo} -- ${tipoCliente.cdescriptipocliente}`;
                selectTipoCliente.append(option);
            });

        } else {
            console.error('ERROR AL LEER LOS TIPOS DE CLIENTE');
        }
    };
    xhr.send('operation=readtypesclients'); //? Verificar si se manda correctamente la información.
};

// Función para actualizar un cliente
const actualizarCliente = (id, icvegrado, name, address, mobile) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente actualizado correctamente'); // TODO: agregar lo necesario
            // Lógica adicional después de actualizar el cliente
        } else {
            console.error('Error al actualizar el cliente');
        }
    };
    xhr.send(`operation=update&id=${id}&icvegrado=${icvegrado}&name=${name}&address=${address}&mobile=${mobile}`);
};

// Función para eliminar un cliente
const eliminarCliente = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente eliminado correctamente'); // TODO: Agregar lo necesario despues del cliente eliminado
            // Lógica adicional después de eliminar el cliente
        } else {
            console.error('Error al eliminar el cliente');
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar cliente
const abrirModalInsertarCliente = () => {
    // Lógica para abrir el modal de insertar cliente
    $('#modalAgregar').modal('show');
};

// Función para abrir el modal de actualizar datos del cliente
const abrirModalActualizarCliente = (id) => {
    $('#udp-idcustomer').val(id);
    $('#modalEditar').modal('show');
};



// Función para eliminar el registro de un cliente
const confirmarEliminarCliente = (id) => {
    // Lógica para mostrar confirmación de eliminar cliente
    $('#deleteCliente').val(id);
    $('#modalBorrarCliente').modal('show');
};


const drawCatalogBanks = async (element, icvebanco = null) => {
    const banks = await moduleAccBanks.moduleAccountsBanks.obtenerBancos();
    element.innerHTML = ``;
    const optionsHTML = banks.map(bank => {
        if (bank.icvebanco === icvebanco) {
            return `<option value="${bank.icvebanco}" selected>${bank.cnombrebanco}</option>`;
        } else {
            return `<option value="${bank.icvebanco}">${bank.cnombrebanco}</option>`;
        }
    }).join('');

    element.innerHTML = `<option value="0">SELECCIONE BANCO</option>` + optionsHTML;
}

const readCodigosPostal = async (zipcode) => {
    let params =
        'operation=readZipCode' +
        '&zipcode=' + zipcode;
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud para obtener los codigos postales`);
        }

        const data = await response.json();

        let colonias = document.getElementById('coloniadir');
        document.getElementById('entidaddir').value = data[0].cnombreestprovincia;
        document.getElementById('municipiodir').value = data[0].cnomlocmun;

        const optionsHTML = data.map(col => {
            return `<option value="${col.icvecatcolonia}">${col.cnombre}</option>`;
        }).join('');

        colonias.innerHTML = `<option value="">SELECCIONE COLONIA</option>` + optionsHTML;

    } catch (error) {
        throw new Error(`No se pueden obtener los codigos postales: ${error.message}`);
    }
}

const varCP = document.getElementById('cp');

varCP.addEventListener('blur', () => {
    let cp = document.getElementById('cp').value;

    readCodigosPostal(cp);
});

updatePaysStatusCustomer();
actFecha();
leerClientes();
initMap();


            