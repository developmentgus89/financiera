//Constante de Declaracion para la base Url
const baseURL = '../Controllers/CategoryController.php';

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarCategoria     = document.querySelector('#agregar-categoria');
const btnEditarCategoria      = document.querySelector('#agregar-categoria');
const btnEliminarCategoria    = document.querySelector('#btnEliminarCategoria');
const btnInsertarCategoria    = document.querySelector('#btnInsertarCategoria');
const btnActualizarCategoria = document.querySelector('#btnActualizarCategoria');


//Funcion para abrir el modal al hacer click
btnAgregarCategoria.addEventListener('click', () => {
    abrirModalInsertarCategoria();
});

btnInsertarCategoria.addEventListener('click', () => {
    let nameCategoria    = document.getElementById('namecategory').value;

    insertarCategoria(nameCategoria);
    $('#modalAgregarCategoria').modal('hide');
    location.reload();
});

btnActualizarCategoria.addEventListener('click', () => {
    let id = $('#udp-idcategoria').val();

    console.log('Valor al dar click ' + id);
    leerRowCategoria(id);
    let udpnameCategoria    = document.getElementById('udp-nombrecategoria').value;

    actualizarCategoria(id, udpnameCategoria);
    $('#modalEditarCategoria').modal('hide');
    location.reload();
    
});

btnEliminarCategoria.addEventListener('click', ( ) => {
    let id = $('#deleteCategoria').val();
    eliminarCategoria(id);
    location.reload(true);
});
// Función para leer los categorias

const leerCategorias = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const categorias = JSON.parse(xhr.responseText);
            console.table(categorias);
            $('#tablaCategorias').DataTable({
                data: categorias,
                columns: [
                    { data: 'categoryid' },
                    { data: 'name' },
                    { data: 'status' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarCategoria(' + data.categoryid + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarCategoria(' + data.categoryid + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las categorias');
        }
    };
    xhr.send('operation=read');
};

const leerRowCategoria = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const categoria = JSON.parse(xhr.responseText);
            document.getElementById('udp-nombrecategoria').value    = categoria[0].name;
            // console.table(categoria[0].name);
            
        } else {
            console.error('Error al leer la categoria');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

// Función para insertar un categoria
const insertarCategoria = (nameCategoria) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Categoria insertada correctamente');
            // Lógica adicional después de insertar el categoria
        } else {
            console.error('Error al insertar la categoria');
        }
    };
    xhr.send(`operation=create&name=${nameCategoria}`);
};

// Función para actualizar un categoria
const actualizarCategoria = (id, name) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Categoria actualizada correctamente');
            // Lógica adicional después de actualizar el categoria
        } else {
            console.error('Error al actualizar los datos de la categoria');
        }
    };
    xhr.send(`operation=update&id=${id}&name=${name}`);
};

// Función para eliminar un categoria
const eliminarCategoria = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Categoria eliminada correctamente');
            // Lógica adicional después de eliminar el categoria
        } else {
            console.error('Error al eliminar la categoria');
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar categoria
const abrirModalInsertarCategoria = () => {
    // Lógica para abrir el modal de insertar categoria
    $('#modalAgregarCategoria').modal('show');
};

// Función para abrir el modal de actualizar datos del categoria
const abrirModalActualizarCategoria = (id) => {
    $('#udp-idcategoria').val(id);
    leerRowCategoria(id);
    $('#modalEditarCategoria').modal('show');
};



// Función para eliminar el registro de un categoria
const confirmarEliminarCategoria = (id) => {
    // Lógica para mostrar confirmación de eliminar categoria
    $('#deleteCategoria').val(id);
    $('#modalBorrarCategoria').modal('show');
};


leerCategorias();

