//Constante de Declaracion para la base Url
const baseURL = '../Controllers/ShelfController.php';

//Control de Eventos de los modales
$("#modalEditarAnaquel").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalAgregarPosicion").on('hidden.bs.modal', function () {
    location.reload();
});

$("input[data-bootstrap-switch]").each(function () {
    $(this).bootstrapSwitch('state', $(this).prop('checked'));
});


//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarAnaquel = document.querySelector('#agregar-anaquel');
const btnEditarAnaquel = document.querySelector('#agregar-anaquel');
const btnEliminarAnaquel = document.querySelector('#btnEliminarAnaquel');
const btnInsertarAnaquel = document.querySelector('#btnInsertarAnaquel');
const btnActualizarAnaquel = document.querySelector('#btnActualizarAnaquel');


//Funcion para abrir el modal al hacer click
btnAgregarAnaquel.addEventListener('click', () => {
    abrirModalInsertarAnaquel();
});

btnInsertarAnaquel.addEventListener('click', () => {
    let numeroanaquel = document.getElementById('numeroanaquel').value;
    let numestanteanaquel = document.getElementById('numestanteanaquel').value;
    let numrejillaanaquel = document.getElementById('numrejillaanaquel').value;
    let disponible = document.getElementById('disponible');
    let check = 0;
    disponible.checked ? check = 1 : check = 0;

    insertarAnaquel(numeroanaquel, numestanteanaquel, numrejillaanaquel, check);
    $('#modalAgregarAnaquel').modal('hide');
    location.reload();
});

btnActualizarAnaquel.addEventListener('click', () => {
    let udpicveanaquel = $('#udp-icveanaqueles').val();

    console.log('Valor al dar click ' + udpicveanaquel);
    leerRowAnaquel(udpicveanaquel);
    let udpnumeroanaquel = document.getElementById('udp-numeroanaquel').value;
    let udpnumestanteanaquel = document.getElementById('udp-numestanteanaquel').value;
    let udpnumrejillaanaquel = document.getElementById('udp-numrejillaanaquel').value;
    let udpdisponible = document.getElementById('udp-disponible');
    let udpcheck = 0;
    udpdisponible.checked ? udpcheck = 1 : udpcheck = 0;

    actualizarAnaquel(udpicveanaquel, udpnumeroanaquel, udpnumestanteanaquel, udpnumrejillaanaquel, udpcheck);
    $('#modalEditarAnaquel').modal('hide');
    location.reload();

});

btnEliminarAnaquel.addEventListener('click', () => {
    let icveanaquel = $('#deleteAnaquel').val();
    eliminarAnaquel(icveanaquel);
    location.reload(true);
});
// Función para leer las anaqueles de Medida

const leerAnaqueles = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const anaqueles = JSON.parse(xhr.responseText);
            console.table(anaqueles);
            $('#tablaAnaqueles').DataTable({
                data: anaqueles,
                columns: [
                    { data: 'icveanaqueles' },
                    { data: 'inumeroanaquel' },
                    { data: 'cestante' },
                    { data: 'crejilla' },
                    { 
                        data: 'bocupado',
                        render: function(data, type, row){
                            return data == 1 ? 'SI' : 'NO';
                        }
                    },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarAnaquel(' + data.icveanaqueles + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarAnaquel(' + data.icveanaqueles + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las Anaqueles de Medida');
            toastr.error('Error al leer las Anaqueles de Medida.');
        }
    };
    xhr.send('operation=read');
};

const leerRowAnaquel = (icveanaquel) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const anaquelmedida = JSON.parse(xhr.responseText);
            console.table(anaquelmedida);
            document.getElementById('udp-icveanaqueles').value     = anaquelmedida[0].icveanaqueles;
            document.getElementById('udp-numeroanaquel').value     = anaquelmedida[0].inumeroanaquel;
            document.getElementById('udp-numestanteanaquel').value = anaquelmedida[0].cestante;
            document.getElementById('udp-numrejillaanaquel').value = anaquelmedida[0].crejilla;
            let disponible = document.getElementById('udp-disponible').value = anaquelmedida[0].bocupado;  
            disponible == 1 ? document.getElementById('udp-disponible').checked = true : document.getElementById('udp-disponible').checked = false ; 
        } else {
            console.error('Error al leer la Anaquel de Medida');
            toastr.error('Error al leer la Anaquel de Medida');
        }
    };
    xhr.send(`operation=row&icveanaquel=${icveanaquel}`);
};

// Función para insertar una anaquel 
const insertarAnaquel = (numeroanaquel, numestanteanaquel, numrejillaanaquel, check) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Anaquel de Medida insertada correctamente');
        } else {
            console.error('Error al insertar la anaquel ');
            toastr.error('Error al insertar la anaquel ');
        }
    };
    xhr.send(`operation=create&numeroanaquel=${numeroanaquel}&numestanteanaquel=${numestanteanaquel}&numrejillaanaquel=${numrejillaanaquel}&check=${check}`);
};

// Función para actualizar la anaquel 
const actualizarAnaquel = (udpicveanaquel, udpnumeroanaquel, udpnumestanteanaquel, udpnumrejillaanaquel, udpdisponible) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Anaquel de Medida actualizada correctamente');
        } else {
            console.error('Error al actualizar los datos del anaquel ');
            toastr.error('Error al actualizar los datos del anaquel ');
        }
    };
    xhr.send(`operation=update&udpicveanaquel=${udpicveanaquel}&udpnumeroanaquel=${udpnumeroanaquel}&udpnumestanteanaquel=${udpnumestanteanaquel}&udpnumrejillaanaquel=${udpnumrejillaanaquel}&udpdisponible=${udpdisponible}`);
};

// Función para eliminar una Anaquel de Medida
const eliminarAnaquel = (icveanaquel) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Anaquel  eliminada correctamente');
            // Lógica adicional después de eliminar el categoria
        } else {
            console.error('Error al eliminar la anaquel  existe artículo con esta anaquel');
            toastr.error('Error al eliminar la anaquel  existe artículo con esta anaquel.');
        }
    };
    xhr.send(`operation=delete&icveanaquel=${icveanaquel}`);
};

// Función para abrir el modal de insertar categoria
const abrirModalInsertarAnaquel = () => {
    // Lógica para abrir el modal de insertar categoria
    $('#modalAgregarPosicion').modal('show');
};

// Función para abrir el modal de actualizar datos del categoria
const abrirModalActualizarAnaquel = (id) => {
    $('#udp-icveanaquel').val(id);
    leerRowAnaquel(id);
    $('#modalEditarAnaquel').modal('show');
};



// Función para eliminar el registro de un categoria
const confirmarEliminarAnaquel = (icveanaquel) => {
    // Lógica para mostrar confirmación de eliminar categoria
    $('#deleteAnaquel').val(icveanaquel);
    $('#modalBorrarAnaquel').modal('show');
};


leerAnaqueles();

