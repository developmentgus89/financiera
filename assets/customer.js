//Constante de Declaracion para la base Url
const baseURL = '../Controllers/CustomerController.php';

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
    console.log(`Esta es la fecha: ${fechaFormateada}`);
    console.log(`Esta es la fecha: ${fechaActual}`);

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

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {String} message 
     */
    const showError = (input, message) => {
        console.log('Valor de la variable input' + input);
        console.log('Valor de la variable message' + message);
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '10px';

        const parent = input.parentElement;
        parent.appendChild(errorSpan);
        input.style.border = '2px solid red';
    }

    /**
     * 
     * @param {HTMLInputElement} input 
     */
    const removeError = (input) => {
        console.log('El valor del input es: ' + input);
        const parent = input.parentElement;
        const errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
            parent.removeChild(errorSpan);
        }

        input.style.border = '2px solid #ccc';
    }

    const validateFormCliente = () => {
        removeError(cnombre);

        if (cnombre.value == '' || cnombre.value == null) {
            showError(cnombre, 'Ingrese el nombre del cliente');
            cnombre.focus();
        } else if (capelpat.value == '' || capelpat.value == null) {
            removeError(cnombre);
            showError(capelpat, 'Ingrese el apellido paterno del cliente');
            capelpat.focus();
        } else if (capelmat.value == '' || capelmat.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            showError(capelmat, 'Ingrese el apellido materno del cliente');
            capelmat.focus();
        } else if (cedad.value == '' || cedad.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            showError(cedad, 'Ingrese la edad del cliente');
        } else if (typeClient.value == '' || typeClient.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            removeError(cedad);
            showError(typeClient, 'Ingrese el tipo de cliente');
        } else if (cdatebirthday.value == '' || cdatebirthday.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            removeError(cedad);
            removeError(typeClient);
            showError(cdatebirthday, 'Ingrese la fecha del cliente');
        } else if (clientDateRegister.value == '' || clientDateRegister.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            removeError(cedad);
            removeError(typeClient);
            removeError(cdatebirthday);
            showError(clientDateRegister, 'Ingrese la fecha de registro del cliente');
        } else if (clienteStatus.value == '' || clienteStatus.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            removeError(cedad);
            removeError(typeClient);
            removeError(cdatebirthday);
            removeError(clientDateRegister);
            showError(clienteStatus, 'Seleccione el estatus del cliente');
        } else if (ctelefono.value == '' || ctelefono.value == null) {
            removeError(cnombre);
            removeError(capelpat);
            removeError(capelmat);
            removeError(cedad);
            removeError(typeClient);
            removeError(cdatebirthday);
            removeError(clientDateRegister);
            removeError(clienteStatus);
            showError(ctelefono, 'Capture el n\u00famero de tel\u00e9fono');
        } else {
            removeError(ctelefono);
            insertarCliente(
                cnombre.value,
                capelpat.value,
                capelmat.value,
                cedad.value,
                ctelefono.value,
                typeClient.value,
                cdatebirthday.value,
                clientDateRegister.value,
                clienteStatus.value
            );
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


const leerClientes = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            $(document).ready(function () {
                var table = $('#tablaClientes').DataTable({
                    data: data.map(function (item) {
                        var id = item['icvecliente'];
                        return [
                            "",
                            id,
                            `${item['cnombre']} ${item['capaterno']} ${item['camaterno']}`,
                            item['ctelefono'],
                            item['cabreviiatipo'],
                            item['cestatus'],
                            `
                            <button class="btn bg-gradient-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Cr&eacute;ditos"><i class="fas fa-money-check"></i></button> 
                            <button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-edit"></i></button>
                            <button class="btn bg-gradient-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="Domicilio y Referencias"><i class="fas fa-file-signature"></i></button>
                            `
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
                        { title: "Telefono" },
                        { title: "Tipo Cliente" },
                        { title: "Status" },
                        { title: "Acciones", orderable: false }
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
                    return `
                    <div class="row">
                        <div class="col-sm-12" style="color: black;">
                            <div class="card card-success card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Messages</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-settings-tab" data-toggle="pill" href="#custom-tabs-one-settings" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false">Settings</a>
                                </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                <div class="tab-pane fade show active " id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lacus ullamcorper dui molestie, sit amet congue quam finibus. Etiam ultricies nunc non magna feugiat commodo. Etiam odio magna, mollis auctor felis vitae, ullamcorper ornare ligula. Proin pellentesque tincidunt nisi, vitae ullamcorper felis aliquam id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin id orci eu lectus blandit suscipit. Phasellus porta, ante et varius ornare, sem enim sollicitudin eros, at commodo leo est vitae lacus. Etiam ut porta sem. Proin porttitor porta nisl, id tempor risus rhoncus quis. In in quam a nibh cursus pulvinar non consequat neque. Mauris lacus elit, condimentum ac condimentum at, semper vitae lectus. Cras lacinia erat eget sapien porta consectetur.
                                </div>
                                <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                    Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam.
                                </div>
                                <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                    Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus volutpat augue id mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce nec hendrerit sem, ac tristique nulla. Integer vestibulum orci odio. Cras nec augue ipsum. Suspendisse ut velit condimentum, mattis urna a, malesuada nunc. Curabitur eleifend facilisis velit finibus tristique. Nam vulputate, eros non luctus efficitur, ipsum odio volutpat massa, sit amet sollicitudin est libero sed ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum metus arcu vel metus. Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.
                                </div>
                                <div class="tab-pane fade" id="custom-tabs-one-settings" role="tabpanel" aria-labelledby="custom-tabs-one-settings-tab">
                                    Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus turpis ac, ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis vulputate. Morbi euismod molestie tristique. Vestibulum consectetur dolor a vestibulum pharetra. Donec interdum placerat urna nec pharetra. Etiam eget dapibus orci, eget aliquet urna. Nunc at consequat diam. Nunc et felis ut nisl commodo dignissim. In hac habitasse platea dictumst. Praesent imperdiet accumsan ex sit amet facilisis.
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

actFecha();
leerClientes();



