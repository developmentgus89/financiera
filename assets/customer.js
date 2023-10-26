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

$('#modalAgregar').on('shown.bs.modal' , () => {
    leerTipoCliente();
});


$("#modalAgregar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar           = document.querySelector('#agregar-cliente');
const btnEditarCliente     = document.querySelector('#agregar-cliente');
const btnEliminarCliente   = document.querySelector('#btnEliminarCliente');
const btnInsertarCliente   = document.querySelector('#btnInsertarCliente');
const btnActualizarCliente = document.querySelector('#btnActualizarCliente');
const selectTipoCliente    = document.querySelector('#typeClient');



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
            var tablaClientes = document.querySelector('#tablaClientes');
            new DataTable(tablaClientes, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['ID', 'Nombre', 'A. Paterno', 'A. Materno', 'Telefono', 'Edad', 'Tipo Cliente', 'Fec. Nacimiento', 'Fec. Registro', 'Status', 'Acciones'],
                    data: data.map(function (item) {
                        // return Object.values(item);
                        var id = item['icvecliente'];
                        return [
                            id,
                            item['cnombre'],
                            item['capaterno'],
                            item['camaterno'],
                            item['ctelefono'],
                            item['iedad'],
                            item['cabreviiatipo'],
                            item['dfechanaciemiento'],
                            item['dfechaalta'],
                            item['cestatus'],
                            `
                            <button class="btn bg-gradient-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Cr&eacute;ditos" onclick=""><i class="fas fa-money-check"></i></button> 
                            <button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick=""><i class="fas fa-edit"></i></button>
                            <button class="btn bg-gradient-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="Domicilio y Referencias" onclick=""><i class="fas fa-file-signature"></i></button>
                            `

                        ]
                    })
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
        'operation=create'+ 
        '&cnombre='+ cnombre +
        '&capelpat='+ capelpat +
        '&capelmat='+ capelmat +
        '&cedad='+ cedad +
        '&ctelefono='+ ctelefono + 
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



