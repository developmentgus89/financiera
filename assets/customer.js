import * as moduleAccBanks from "./Modules/AccountsBanks/opBanksAccounts.js";

//Constante de Declaracion para la base Url
const baseURL = '../Controllers/CustomerController.php';

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
    console.log(cantidadPagos);
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

        console.log(tabDatosCount);
        console.log(tabDatosSolCredit);
        console.log(tabDatosCtaBancaria);
        console.log(tabDatosDomicilio);
        console.log(tabDatosDocumentos);

        if (tabDatosCount == 0 && tabDatosSolCredit == 0 && tabDatosCtaBancaria == 0 && tabDatosDomicilio == 0 && tabDatosDocumentos == 0) {

            //--- Generacion del objeto JS para Datos Personales
            const CustomerPersonalData = [{
                cnombre:            cnombre.value,
                capelpat:           capelpat.value,
                capelmat:           capelmat.value,
                ctelefono:          ctelefono.value,
                cedad:              cedad.value,
                typeClient:         typeClient.value,
                cdatebirthday:      cdatebirthday.value,
                clientDateRegister: clientDateRegister.value,
                clienteStatus:      clienteStatus.value,
            },
            {
                cantseman:       cantseman.value,
                barprestamosoli: barprestamosoli.value,
                interesCredit:   interesCredit.value,
                dtFechaLiquid:   dtFechaLiquid.value,

            },
            {
                ctabancariacli:     ctabancariacli.value,
                typeAccountBankCli: typeAccountBankCli.value,
                selCatIcveBancoCli: selCatIcveBancoCli.value,
            },
            {   
                ccalle:       ccalle.value,
                numexterior:  numexterior.value,
                numinterior:  numinterior.value,
                pricalle:     pricalle.value,
                segcalle:     segcalle.value,
                cp:           cp.value,
                entidaddir:   entidaddir.value,
                municipiodir: municipiodir.value,
                coloniadir:   coloniadir.value,
                latitud:      latitud.value,
                longitud:     longitud.value,
            },
            {
                idComprobanteDom: idComprobanteDom.value,
                idINEidentif:     idINEidentif.value,
                idCompIngresos:   idCompIngresos.value,
            },
            {
                nombreReferido:        nombreReferido.value,
                telefonoReferido:      telefonoReferido.value,
                observacionesReferido: observacionesReferido.value,
            }
        ];
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
                    let idCliente = await insertCustomer(CustomerPersonalData);
                    console.table(idCliente);
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

    console.log('Valor al dar click ' + id);
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

                async function format (rowData) {
                    // Aquí puedes definir la estructura HTML de tu información adicional basada en rowData
                    //console.log(rowData);
                    //console.table(rowData);
                    // console.log(rowData[1]);
                    // leerCreditosPorCliente(rowData[1]);
                    let dataCustomer = await readRowCustomer(rowData[1]);
                    console.log(`Table del array`);
                    console.table(dataCustomer[0]);
                    console.log(`Nombre`);
                    //Este setTimeOut es el que carga el mapa
                    setTimeout(() => {
                        setCustomerMap(dataCustomer[0].latitud, dataCustomer[0].longitud, rowData[1]);
                    }, 100);
                    return `
                    <div class="row">
                        <div class="col-sm-12" style="color: black;">
                            <div class="card card-success card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="custom-tabs-one-home-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-home${rowData[1]}" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Datos Personales y Dirección</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-profile-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-profile${rowData[1]}" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Creditos</a>
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
                                            <div class="col-md-4">
                                                <div class="card card-success card-outline">
                                                    <div class="card-body box-profile">
                                                        <h3 class="profile-username text-center"><div id="nameCustomer-${rowData[1]}">${dataCustomer[0].cclinombre}</div></h3>
                                                        <p class="text-muted text-center">${dataCustomer[0].capaterno} ${dataCustomer[0].camaterno}</p>
                                                        <ul class="list-group list-group-unbordered mb-3">
                                                            <li class="list-group-item">
                                                                <b>Tel&eacute;fono:</b> <b><span class="float-right" style="font-size: 24px">${dataCustomer[0].ctelefono}</span></b>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Edad</b> <b><span class="float-right">${dataCustomer[0].iedad} años</span></b>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Cumpleaños</b> <b><span class="float-right">${formatDateBirthday(dataCustomer[0].dfechanaciemiento)} </span></b>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Tipo de Cliente</b> <b><span class="float-right">${dataCustomer[0].cabreviiatipo} </span></b>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Cumpleaños</b> <b><span class="float-right">${formatDateBirthday(dataCustomer[0].dfechanaciemiento)} </span></b>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <!-- /.card-body -->
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
                                                                        <td>${dataCustomer[0].ccalle} ${dataCustomer[0].cnumexterior} ${dataCustomer[0].cnuminterior}  ${dataCustomer[0].ccolonia}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>Municipio o Delegaci&oacute;n ${dataCustomer[0].cdelegmunicipio} ${dataCustomer[0].centfederativa} ${dataCustomer[0].cpais} C.P. ${dataCustomer[0].ccodpostal}</td>
                                                                    </tr>
                                                                    <tr class="text-center">
                                                                        <td colspan="2"><b>Coordenadas de Geolocalizaci&oacute;n</b></td>
                                                                    </tr>
                                                                    <tr class="text-center">
                                                                        <td><b>Latitud</b></td>        
                                                                        <td><b>Longitud</b></td>        
                                                                    </tr>
                                                                    <tr class="text-center">
                                                                        <td>${dataCustomer[0].latitud}</td>        
                                                                        <td>${dataCustomer[0].longitud}</td>        
                                                                    </tr>
                                                                </table>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <!-- /.card-body -->
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="card card-success card-outline">
                                                    <div class="card-body box-profile">
                                                        <h3 class="profile-username text-center">MAPA DE UBICACI&Oacute;N</h3>
                                                        <p class="text-muted text-center">del cliente</p>
                                                        <ul class="list-group list-group-unbordered mb-3">
                                                            <li class="list-group-item">
                                                            <div id="mapCustomer${rowData[1]}" style="width:100%;height:250px;"></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <!-- /.card-body -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <table border="1">
                                            <tr>
                                                <th>Columna 1</th>
                                                <th>Fecha y Hora</th>
                                                <th>Observaciones</th>
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
                                
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-banks${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <table border="1">
                                            <tr>
                                                <th>Cuentas Bancarias</th>
                                                <th>Fecha y Hora</th>
                                                <th>Observaciones</th>
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

                                    </div>
                                    <!-- Notas de Creditos -->
                                    <div class="tab-pane fade" id="custom-tabs-one-messages${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
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
                                    </div>
                                <div class="tab-pane fade" id="custom-tabs-one-settings${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-settings-tab">
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Files</h3>
                    
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
                                        <th>File Name</th>
                                        <th>File Size</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                    
                                      <tr>
                                        <td>Functional-requirements.docx</td>
                                        <td>49.8005 kb</td>
                                        <td class="text-right py-0 align-middle">
                                          <div class="btn-group btn-group-sm">
                                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                          </div>
                                        </td>
                                      <tr>
                                        <td>UAT.pdf</td>
                                        <td>28.4883 kb</td>
                                        <td class="text-right py-0 align-middle">
                                          <div class="btn-group btn-group-sm">
                                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                          </div>
                                        </td>
                                      <tr>
                                        <td>Email-from-flatbal.mln</td>
                                        <td>57.9003 kb</td>
                                        <td class="text-right py-0 align-middle">
                                          <div class="btn-group btn-group-sm">
                                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                          </div>
                                        </td>
                                      <tr>
                                        <td>Logo.png</td>
                                        <td>50.5190 kb</td>
                                        <td class="text-right py-0 align-middle">
                                          <div class="btn-group btn-group-sm">
                                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                          </div>
                                        </td>
                                      <tr>
                                        <td>Contract-10_12_2014.docx</td>
                                        <td>44.9715 kb</td>
                                        <td class="text-right py-0 align-middle">
                                          <div class="btn-group btn-group-sm">
                                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                          </div>
                                        </td>
                    
                                    </tbody>
                                  </table>
                                </div>
                                <!-- /.card-body -->
                              </div>
                                </div>
                                </div>
                            </div>
                            <!-- /.card -->
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

        console.table(data);

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

const readRowCustomer = async (id) =>{
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



const leerRowCliente = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const cliente = JSON.parse(xhr.responseText);
            console.table(cliente);
            const defaultOptionUDP = document.createElement('option');
            defaultOptionUDP.value = cliente[0].icvegrado;
            defaultOptionUDP.textContent = cliente[0].cgradoabrevia;
            selectGradosUDP.append(defaultOptionUDP);
            leerGrados2();
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


const insertCustomer = async (CustomerPersonalData) => {
    // Se de
    const params = new URLSearchParams({
        operation: 'create',
        cutomers: JSON.stringify(CustomerPersonalData)
    }).toString();
    
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

        return data;

    } catch (error) {
        throw new Error(`Error en el servidor ${error}`);
    }
}

const insertCreditCustomer = () => {

}

const leerTipoCliente = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const tiposClientes = JSON.parse(xhr.responseText);
            console.log('LISTADO TIPOS DE CLIENTE');
            console.table(tiposClientes);

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
            console.log('Cliente actualizado correctamente');
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
            console.log('Cliente eliminado correctamente');
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


actFecha();
leerClientes();
initMap();


