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
    let barprestamosoli       = document.getElementById('barprestamosoli');
    let sol_porcentajeinteres = document.getElementById('sol_porcentajeinteres');
    let sol_totalInteres      = document.getElementById('sol_totalInteres');
    let sol_cantprestamo      = document.getElementById('sol_cantprestamo');
    let sol_totalPrestamo     = document.getElementById('sol_totalPrestamo');
    let sol_pagosemanal       = document.getElementById('sol_pagosemanal');

    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if (cantseman != 0) {

        let preinteres = (barprestamosoli.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamosoli.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        sol_porcentajeinteres.textContent = `${interesCalculado} %`;
        sol_totalInteres.textContent      = `${formatter.format(totalInteres)} MXN`;
        sol_cantprestamo.textContent      = `${formatter.format(barprestamosoli.value)} MXN`;
        sol_totalPrestamo.textContent     = `${formatter.format(granTotal)} MXN`;
        sol_pagosemanal.textContent       = `${formatter.format(pagoPeriodo)} MXN`;

        calculoFecha(cantseman);
    } else {
        barprestamosoli.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
        });
    }
    calculoFecha(cantseman);

});


barprestamosoli.addEventListener('input', () => {

    let cantseman = document.getElementById('cantseman').value;
    let barprestamosoli       = document.getElementById('barprestamosoli');
    let sol_porcentajeinteres = document.getElementById('sol_porcentajeinteres');
    let sol_totalInteres      = document.getElementById('sol_totalInteres');
    let sol_cantprestamo      = document.getElementById('sol_cantprestamo');
    let sol_totalPrestamo     = document.getElementById('sol_totalPrestamo');
    let sol_pagosemanal       = document.getElementById('sol_pagosemanal');

    const rango = rangosInteres.find(r => cantseman >= r.min && cantseman <= r.max);
    const interesCalculado = rango ? rango.interes : 0;

    if (cantseman != 0) {
        let preinteres = (barprestamosoli.value * interesCalculado) / 100;
        let totalInteres = preinteres * cantseman;
        let granTotal = parseFloat(barprestamosoli.value) + parseFloat(totalInteres);
        let pagoPeriodo = granTotal / cantseman;

        sol_porcentajeinteres.textContent = `${interesCalculado} %`;
        sol_totalInteres.textContent      = `${formatter.format(totalInteres)} MXN`;
        sol_cantprestamo.textContent      = `${formatter.format(barprestamosoli.value)} MXN`;
        sol_totalPrestamo.textContent     = `${formatter.format(granTotal)} MXN`;
        sol_pagosemanal.textContent       = `${formatter.format(pagoPeriodo)} MXN`;

        calculoFecha(cantseman);
    } else {
        barprestamosoli.value = 0;
        Swal.fire({
            title: "Advertencia",
            html: `Seleccion la cantidad de semanas para la simulaci\u00F3n de pr\u00E9stamo.`,
            icon: "warning"
        });
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
    let cnombre = document.getElementById('clinombre');
    let capelpat = document.getElementById('cliapaterno');
    let capelmat = document.getElementById('cliamaterno');
    let ctelefono = document.getElementById('ctelefono');
    let cedad = document.getElementById('cliEdad');
    let typeClient = document.getElementById('typeClient');
    let cdatebirthday = document.getElementById('clientDate');
    let clientDateRegister = document.getElementById('clientDateRegister');
    let clienteStatus = document.getElementById('clienteStatus');

    let cantseman = document.getElementById('cantseman');
    let barprestamosoli = document.getElementById('barprestamosoli');


    const validateFormCliente = () => {

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

        const fieldsSolCredito = [
            { element: cantseman, message: 'Ingrese la cantidad de pagos para liquidar el cr\u00E9dito.' },
            { element: barprestamosoli, message: 'Ingrese un monto para el cr\u00E9dito que se solicita.' },
        ];

        //validadores de error
        let hasErrorDatos = false;
        let hasErrorSolCredito = false;

        //contadores por tab
        let tabDatosCount = 0;
        let tabDatosSolCredit = 0;

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
            tabDatosCount--;
        }

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
            tabDatosSolCredit--;
        }



        // insertarCliente(
        //     cnombre.value,
        //     capelpat.value,
        //     capelmat.value,
        //     cedad.value,
        //     ctelefono.value,
        //     typeClient.value,
        //     cdatebirthday.value,
        //     clientDateRegister.value,
        //     clienteStatus.value
        // );
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


const leerClientes = () => {
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
                            `${item['cnombre']} ${item['capaterno']} ${item['camaterno']}`,
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

                $('#tablaClientes tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = table.row(tr);
                    if (row.child.isShown()) {
                        // Esta fila ya está abierta - cerrarla
                        row.child.hide();
                        tr.removeClass('shown');
                    } else {
                        // Abrir esta fila
                        row.child(format(row.data())).show(); // Aquí debes definir cómo quieres que se vea la información adicional, `format` es una función que debes crear
                        tr.addClass('shown');
                    }
                });

                function format(rowData) {
                    // Aquí puedes definir la estructura HTML de tu información adicional basada en rowData
                    console.log(rowData);
                    console.table(rowData);
                    console.log(rowData[1]);
                    leerCreditosPorCliente(rowData[1]);
                    return `
                    <div class="row">
                        <div class="col-sm-12" style="color: black;">
                            <div class="card card-success card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="custom-tabs-one-home-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-home${rowData[1]}" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Datos Personales</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-profile-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-profile${rowData[1]}" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Creditos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-messages-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-messages${rowData[1]}" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Notas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-settings-tab${rowData[1]}" data-toggle="pill" href="#custom-tabs-one-settings${rowData[1]}" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false">Documentacion Cargada</a>
                                </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active " id="custom-tabs-one-home${rowData[1]}" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lacus ullamcorper dui molestie, sit amet congue quam finibus. Etiam ultricies nunc non magna feugiat commodo. Etiam odio magna, mollis auctor felis vitae, ullamcorper ornare ligula. Proin pellentesque tincidunt nisi, vitae ullamcorper felis aliquam id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin id orci eu lectus blandit suscipit. Phasellus porta, ante et varius ornare, sem enim sollicitudin eros, at commodo leo est vitae lacus. Etiam ut porta sem. Proin porttitor porta nisl, id tempor risus rhoncus quis. In in quam a nibh cursus pulvinar non consequat neque. Mauris lacus elit, condimentum ac condimentum at, semper vitae lectus. Cras lacinia erat eget sapien porta consectetur.
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

// Función para insertar un cliente
/**
 * 
 * @param {String} cnombre 
 * @param {String} capelpat 
 * @param {String} capelmat 
 * @param {number} cedad 
 * @param {String} ctelefono
 * @param {number} typeClient 
 * @param {date} cdatebirthd 
 * @param {date} clientDateRegister 
 * @param {number} clienteStatus 
 */
const insertarCliente = (
    cnombre, capelpat, capelmat,
    cedad, ctelefono, typeClient, cdatebirthday,
    clientDateRegister, clienteStatus) => {

    let params =
        'operation=create' +
        '&cnombre=' + cnombre +
        '&capelpat=' + capelpat +
        '&capelmat=' + capelmat +
        '&cedad=' + cedad +
        '&ctelefono=' + ctelefono +
        '&typeClient=' + typeClient +
        '&cdatebirthday=' + cdatebirthday +
        '&clientDateRegister=' + clientDateRegister +
        '&clienteStatus=' + clienteStatus;
    console.log(params);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            leerClientes();
            setTimeout(() => {
                location.reload();
            }, 500);
        } else {
            console.error('Error al insertar el cliente');
        }
    };
    xhr.send(params);
};

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

    element.innerHTML = `<option value="">SELECCIONE BANCO</option>` + optionsHTML;
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

        console.table(data);
        console.table(data[0].cnombreestprovincia);
        console.table(data[0].cnomlocmun);
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



