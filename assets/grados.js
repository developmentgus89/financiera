//Constante de Declaracion para la base Url
const baseURL = '../Controllers/GradosController.php';

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarGrado    = document.querySelector('#agregar-grado');
const btnEditarGrado      = document.querySelector('#agregar-grado');
const btnEliminarGrado    = document.querySelector('#btnEliminarGrado');
const btnInsertarGrado    = document.querySelector('#btnInsertarGrado');
const btnActualizarGrado = document.querySelector('#btnActualizarGrado');


//Funcion para abrir el modal al hacer click
btnAgregarGrado.addEventListener('click', () => {
    abrirModalInsertarGrado();
});

btnInsertarGrado.addEventListener('click', () => {
    let nameGrado    = document.getElementById('namecategory').value;

    insertarGrado(nameGrado);
    $('#modalAgregarGrado').modal('hide');
    location.reload();
});

btnActualizarGrado.addEventListener('click', () => {
    let id = $('#udp-idgrado').val();

    console.log('Valor al dar click ' + id);
    leerRowGrado(id);
    let udpnameGrado    = document.getElementById('udp-nombregrado').value;

    actualizarGrado(id, udpnameGrado);
    $('#modalEditarGrado').modal('hide');
    location.reload();
    
});

btnEliminarGrado.addEventListener('click', ( ) => {
    let id = $('#deleteGrado').val();
    eliminarGrado(id);
    location.reload(true);
});
// Función para leer los grados

const leerGrados = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const grados = JSON.parse(xhr.responseText);
            console.table(grados);
            $('#tablaGrados').DataTable({
                data: grados,
                columns: [
                    { data: 'icvegrado' },
                    { data: 'cgradoabrevia' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarGrado(' + data.icvegrado + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarGrado(' + data.icvegrado + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las grados');
        }
    };
    xhr.send('operation=read');
};

const leerRowGrado = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const grado = JSON.parse(xhr.responseText);
            document.getElementById('udp-nombregrado').value    = grado[0].name;
            // console.table(grado[0].name);
            
        } else {
            console.error('Error al leer la grado');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

// Función para insertar un grado
const insertarGrado = (nameGrado) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Grado insertada correctamente');
            // Lógica adicional después de insertar el grado
        } else {
            console.error('Error al insertar la grado');
        }
    };
    xhr.send(`operation=create&name=${nameGrado}`);
};

// Función para actualizar un grado
const actualizarGrado = (id, name) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Grado actualizada correctamente');
            // Lógica adicional después de actualizar el grado
        } else {
            console.error('Error al actualizar los datos de la grado');
        }
    };
    xhr.send(`operation=update&id=${id}&name=${name}`);
};

// Función para eliminar un grado
const eliminarGrado = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Grado eliminada correctamente');
            // Lógica adicional después de eliminar el grado
        } else {
            console.error('Error al eliminar la grado');
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar grado
const abrirModalInsertarGrado = () => {
    // Lógica para abrir el modal de insertar grado
    $('#modalAgregarGrado').modal('show');
};

// Función para abrir el modal de actualizar datos del grado
const abrirModalActualizarGrado = (id) => {
    $('#udp-idgrado').val(id);
    leerRowGrado(id);
    $('#modalEditarGrado').modal('show');
};



// Función para eliminar el registro de un grado
const confirmarEliminarGrado = (id) => {
    // Lógica para mostrar confirmación de eliminar grado
    $('#deleteGrado').val(id);
    $('#modalBorrarGrado').modal('show');
};


leerGrados();

