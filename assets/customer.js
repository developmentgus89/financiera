//Constante de Declaracion para la base Url
const baseURL = '../Controllers/customersController.php';

$("#modalAgregar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar           = document.querySelector('#agregar-cliente');
const btnEditarCliente     = document.querySelector('#agregar-cliente');
const btnEliminarCliente   = document.querySelector('#btnEliminarCliente');
const btnInsertarCliente   = document.querySelector('#btnInsertarCliente');
const btnActualizarCliente = document.querySelector('#btnActualizarCliente');
const selectGrados         = document.getElementById('icvegrado');
const selectGradosUDP      = document.getElementById('udp-icvegrado');



//Funcion para abrir el modal al hacer click
btnAgregar.addEventListener('click', () => {
    abrirModalInsertarCliente();
});

btnInsertarCliente.addEventListener('click', () => {
    let grado   = document.getElementById('icvegrado').value;
    let name    = document.getElementById('namecustomer').value;
    let address = document.getElementById('addresscustomer').value;
    let mobile  = document.getElementById('mobilecustomer').value;
    
    // const dataTableCliente = $('#tablaClientes').DataTable();
    insertarCliente(grado, name, address, mobile);
    // dataTableCliente.destroy();
    $('#modalAgregar').modal('hide');
    location.reload();
});

btnActualizarCliente.addEventListener('click', () => {
    let id = $('#udp-idcustomer').val();

    console.log('Valor al dar click ' + id);
    leerRowCliente(id);
    let udpcvegrado = document.getElementById('udp-icvegrado').value;
    let udpname     = document.getElementById('udp-namecustomer').value;
    let udpaddress  = document.getElementById('udp-addresscustomer').value;
    let udpmobile   = document.getElementById('udp-mobilecustomer').value;
    // const dataTableCliente = $('#tablaClientes').DataTable();
    actualizarCliente(id, udpcvegrado, udpname, udpaddress, udpmobile );
    // dataTableCliente.destroy();
    $('#modalEditar').modal('hide');
    location.reload();
    
});

btnEliminarCliente.addEventListener('click', ( ) => {
    let id = $('#deleteCliente').val();
    // const dataTableCliente = $('#tablaClientes').DataTable();
    eliminarCliente(id);
    // dataTableCliente.destroy();
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
            const clientes = JSON.parse(xhr.responseText);
            console.table(clientes);
            $('#tablaClientes').DataTable({
                data: clientes,
                columns: [
                    { data: 'id' },
                    { data: 'cgradoabrevia' },
                    { data: 'name' },
                    { data: 'address' },
                    { data: 'mobile' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarCliente(' + data.id + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarCliente(' + data.id + ')">Eliminar</button>';
                        }
                    }
                ]
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
            document.getElementById('udp-namecustomer').value     = cliente[0].name;
            document.getElementById('udp-addresscustomer').value = cliente[0].address;
            document.getElementById('udp-mobilecustomer').value  = cliente[0].mobile;
            
            
            
        } else {
            console.error('Error al leer el cliente');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

const leerGrados = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const grados = JSON.parse(xhr.responseText);
            console.log('listado de grados');
            console.table(grados);
            selectGrados.innerHTML    = '';
            selectGradosUDP.innerHTML = '';

            const defaultOptionGrado = document.createElement('option');
            defaultOptionGrado.value = '';
            defaultOptionGrado.textContent = 'SELECCIONE GRADO DEL ELEMENTO';
            selectGrados.appendChild(defaultOptionGrado);

            grados.forEach(grado => {
                const option = document.createElement('option');
                option.value = grado.icvegrado;
                option.textContent = grado.cgradoabrevia;
                selectGrados.append(option);
            });
        } else {
            console.error('Error al leer los grados');
        }
    };
    xhr.send('operation=createselect');
};

const leerGrados2 = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const grados = JSON.parse(xhr.responseText);
            console.log('listado de grados');
            console.table(grados);
            
            grados.forEach(grado => {
                const option = document.createElement('option');
                option.value = grado.icvegrado;
                option.textContent = grado.cgradoabrevia;
                selectGradosUDP.append(option);
            });
        } else {
            console.error('Error al leer los grados');
        }
    };
    xhr.send('operation=createselect');
};

// Función para insertar un cliente
const insertarCliente = (grado, name, address, mobile) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente insertado correctamente');
            // Lógica adicional después de insertar el cliente
        } else {
            console.error('Error al insertar el cliente');
        }
    };
    xhr.send(`operation=create&grado=${grado}&name=${name}&address=${address}&mobile=${mobile}`);
};

// Función para actualizar un cliente
const actualizarCliente = (id, icvegrado, name, address, mobile ) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
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
    xhr.open('POST', baseURL , true);
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
    leerRowCliente(id);
    $('#modalEditar').modal('show');
};



// Función para eliminar el registro de un cliente
const confirmarEliminarCliente = (id) => {
    // Lógica para mostrar confirmación de eliminar cliente
    $('#deleteCliente').val(id);
    $('#modalBorrarCliente').modal('show');
};
leerGrados();
leerClientes();



