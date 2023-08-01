//Constante de Declaracion para la base Url
const baseURL = '../Controllers/UnitsController.php';

//Control de Eventos de los modales
$("#modalEditarUnidad").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalAgregarUnidad").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarUnidad     = document.querySelector('#agregar-unidad');
const btnEditarUnidad      = document.querySelector('#agregar-unidad');
const btnEliminarUnidad    = document.querySelector('#btnEliminarUnidad');
const btnInsertarUnidad    = document.querySelector('#btnInsertarUnidad');
const btnActualizarUnidad = document.querySelector('#btnActualizarUnidad');


//Funcion para abrir el modal al hacer click
btnAgregarUnidad.addEventListener('click', () => {
    abrirModalInsertarUnidad();
});

btnInsertarUnidad.addEventListener('click', () => {
    let nameUnidad    = document.getElementById('nameunidadmedida').value;
    let abreviaUnidad    = document.getElementById('abreviaunidadmedida').value;

    insertarUnidad(nameUnidad, abreviaUnidad);
    $('#modalAgregarUnidad').modal('hide');
    // location.reload();
});

btnActualizarUnidad.addEventListener('click', () => {
    let icveunidad = $('#udp-icveunidad').val();

    console.log('Valor al dar click ' + icveunidad);
    leerRowUnidad(icveunidad);
    let udpnameunidadmedida    = document.getElementById('udp-nameunidadmedida').value;
    let udpabreviaunidadmedida = document.getElementById('udp-abreviaunidadmedida').value;

    actualizarUnidad(icveunidad, udpnameunidadmedida, udpabreviaunidadmedida);
    $('#modalEditarUnidad').modal('hide');
    location.reload();
    
});

btnEliminarUnidad.addEventListener('click', ( ) => {
    let icveunidad = $('#deleteUnidad').val();
    eliminarUnidad(icveunidad);
    location.reload(true);
});
// Función para leer las unidades de Medida

const leerUnidadesMedidas = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const unidades = JSON.parse(xhr.responseText);
            console.table(unidades);
            $('#tablaUnidades').DataTable({
                data: unidades,
                columns: [
                    { data: 'icveunidad' },
                    { data: 'cdescripcion' },
                    { data: 'cabrevia' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarUnidad(' + data.icveunidad + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarUnidad(' + data.icveunidad + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las Unidades de Medida');
            toastr.error('Error al leer las Unidades de Medida.');
        }
    };
    xhr.send('operation=read');
};

const leerRowUnidad = (icveunidad) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const unidadmedida = JSON.parse(xhr.responseText);
            console.table(unidadmedida);
            document.getElementById('udp-icveunidad').value     = unidadmedida[0].icveunidad;
            document.getElementById('udp-nameunidadmedida').value     = unidadmedida[0].cdescripcion;
            document.getElementById('udp-abreviaunidadmedida').value = unidadmedida[0].cabrevia;
            
        } else {
            console.error('Error al leer la Unidad de Medida');
            toastr.error('Error al leer la Unidad de Medida');
        }
    };
    xhr.send(`operation=row&icveunidad=${icveunidad}`);
};

// Función para insertar una unidad de medida
const insertarUnidad = (nameUnidad, abreviaUnidad) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Unidad de Medida insertada correctamente');
        } else {
            console.error('Error al insertar la unidad de medida');
            toastr.error('Error al insertar la unidad de medida');
        }
    };
    xhr.send(`operation=create&nameunidad=${nameUnidad}&abreviaunidad=${abreviaUnidad}`);
};

// Función para actualizar la unidad de medida
const actualizarUnidad = (icveunidad, udpnameunidadmedida, udpabreviaunidadmedida) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Unidad de Medida actualizada correctamente');
        } else {
            console.error('Error al actualizar los datos de la unidad de medida');
            toastr.error('Error al actualizar los datos de la unidad de medida');
        }
    };
    xhr.send(`operation=update&icveunidad=${icveunidad}&udpnameunidadmedida=${udpnameunidadmedida}&udpabreviaunidadmedida=${udpabreviaunidadmedida}`);
};

// Función para eliminar una Unidad de Medida
const eliminarUnidad = (icveunidad) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Unidad de medida eliminada correctamente');
            // Lógica adicional después de eliminar el categoria
        } else {
            console.error('Error al eliminar la unidad de medida existe artículo con esta unidad');
            toastr.error('Error al eliminar la unidad de medida existe artículo con esta unidad.');
        }
    };
    xhr.send(`operation=delete&icveunidad=${icveunidad}`);
};

// Función para abrir el modal de insertar categoria
const abrirModalInsertarUnidad = () => {
    // Lógica para abrir el modal de insertar categoria
    $('#modalAgregarUnidad').modal('show');
};

// Función para abrir el modal de actualizar datos del categoria
const abrirModalActualizarUnidad = (id) => {
    $('#udp-icveunidad').val(id);
    leerRowUnidad(id);
    $('#modalEditarUnidad').modal('show');
};



// Función para eliminar el registro de un categoria
const confirmarEliminarUnidad = (icveunidad) => {
    // Lógica para mostrar confirmación de eliminar categoria
    $('#deleteUnidad').val(icveunidad);
    $('#modalBorrarUnidad').modal('show');
};


leerUnidadesMedidas();

