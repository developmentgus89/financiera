//Constante de Declaracion para la base Url
const baseURL = '../Controllers/ProviderController.php';

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarProveedor     = document.querySelector('#agregar-proveedor');
const btnEditarProveedor      = document.querySelector('#agregar-proveedor');
const btnEliminarProveedor    = document.querySelector('#btnEliminarProveedor');
const btnInsertarProveedor    = document.querySelector('#btnInsertarProveedor');
const btnActualizarProveedor  = document.querySelector('#btnActualizarProveedor');


//Funcion para abrir el modal al hacer click
btnAgregarProveedor.addEventListener('click', () => {
    abrirModalInsertarProveedor();
});

btnInsertarProveedor.addEventListener('click', () => {
    let nameProveedor    = document.getElementById('nameproveedor').value;
    let telProveedor    = document.getElementById('telproveedor').value;
    let direProveedor    = document.getElementById('direproveedor').value;

    insertarProveedor(nameProveedor, telProveedor, direProveedor);
    $('#modalAgregarProveedor').modal('hide');
    location.reload();
});

btnActualizarProveedor.addEventListener('click', () => {
    let id = $('#udp-icveproveedor').val();

    console.log('Valor al dar click Proveedor' + id);
    leerRowProveedor(id);
    let udpnameProveedor    = document.getElementById('udp-nombreproveedor').value;
    let udptelProveedor    = document.getElementById('udp-telproveedor').value;
    let udpdireProveedor    = document.getElementById('udp-direproveedor').value;

    actualizarProveedor(id, udpnameProveedor, udptelProveedor, udpdireProveedor);
    $('#modalEditarProveedor').modal('hide');
    location.reload();
    
});

btnEliminarProveedor.addEventListener('click', ( ) => {
    let id = $('#deleteProveedor').val();
    eliminarProveedor(id);
    location.reload(true);
});
// Función para leer los proveedors

const leerProveedores = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const proveedores = JSON.parse(xhr.responseText);
            console.log('Listado de Proveedores');
            console.table(proveedores);
            $('#tablaProveedores').DataTable({
                data: proveedores,
                columns: [
                    { data: 'icveproveedor' },
                    { data: 'supplier_name' },
                    { data: 'mobile' },
                    { data: 'address' },
                    { data: 'status' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarProveedor(' + data.icveproveedor + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarProveedor(' + data.icveproveedor + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las proveedors');
        }
    };
    xhr.send('operation=read');
};

const leerRowProveedor = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const proveedor = JSON.parse(xhr.responseText);
            console.table(proveedor);
            document.getElementById('udp-icveproveedor').value = proveedor[0].icveproveedor;
            document.getElementById('udp-nombreproveedor').value = proveedor[0].supplier_name;
            document.getElementById('udp-telproveedor').value = proveedor[0].mobile;
            document.getElementById('udp-direproveedor').value = proveedor[0].address;
            // console.table(proveedor[0].name);
            
        } else {
            console.error('Error al leer la proveedor');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

// Función para insertar un proveedor
const insertarProveedor = (nameProveedor, telProveedor, direProveedor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Proveedor insertada correctamente');
            // Lógica adicional después de insertar el proveedor
        } else {
            console.error('Error al insertar la proveedor');
        }
    };
    xhr.send(`operation=create&nameProveedor=${nameProveedor}&telProveedor=${telProveedor}&direProveedor=${direProveedor}`);
};

// Función para actualizar un proveedor
const actualizarProveedor = (id, nameProveedor, telProveedor, direProveedor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Proveedor actualizada correctamente');
            // Lógica adicional después de actualizar el proveedor
        } else {
            console.error('Error al actualizar los datos de la proveedor');
        }
    };
    xhr.send(`operation=update&id=${id}&name=${nameProveedor}&telProveedor=${telProveedor}&direProveedor=${direProveedor}`);
};

// Función para eliminar un proveedor
const eliminarProveedor = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Proveedor eliminada correctamente');
            // Lógica adicional después de eliminar el proveedor
        } else {
            console.error('Error al eliminar la proveedor');
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar proveedor
const abrirModalInsertarProveedor = () => {
    // Lógica para abrir el modal de insertar proveedor
    $('#modalAgregarProveedor').modal('show');
};

// Función para abrir el modal de actualizar datos del proveedor
const abrirModalActualizarProveedor = (id) => {
    $('#udp-idproveedor').val(id);
    leerRowProveedor(id);
    $('#modalEditarProveedor').modal('show');
};



// Función para eliminar el registro de un proveedor
const confirmarEliminarProveedor = (id) => {
    // Lógica para mostrar confirmación de eliminar proveedor
    $('#deleteProveedor').val(id);
    $('#modalBorrarProveedor').modal('show');
};


leerProveedores();

