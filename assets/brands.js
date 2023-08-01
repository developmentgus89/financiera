//Constante de Declaracion para la base Url
const baseURL = '../Controllers/BrandsController.php';

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarMarca     = document.querySelector('#agregar-marca');
const btnEditarMarca      = document.querySelector('#agregar-marca');
const btnEliminarMarca    = document.querySelector('#btnEliminarMarca');
const btnInsertarMarca    = document.querySelector('#btnInsertarMarca');
const btnActualizarMarca  = document.querySelector('#btnActualizarMarca');
const selectCategorias    = document.getElementById('idCategoriaMarca');
const selectCategoriasUDP = document.getElementById('udp-idCategoriaMarca');


//Funcion para abrir el modal al hacer click
btnAgregarMarca.addEventListener('click', () => {
    abrirModalInsertarMarca();
});

btnInsertarMarca.addEventListener('click', () => {
    let nameMarca = document.getElementById('namemarca').value;
    let categoryId = document.getElementById('idCategoriaMarca').value;

    insertarMarca(categoryId, nameMarca);
    $('#modalAgregarMarca').modal('hide');
    location.reload();
});

btnActualizarMarca.addEventListener('click', () => {
    let id = $('#udp-idmarca').val();

    console.log('Valor al dar click ' + id);
    leerRowMarca(id);
    let udpIdCategoria = document.getElementById('udp-idCategoriaMarca').value;
    let udpnameMarca = document.getElementById('udp-nombremarca').value;

    actualizarMarca(id, udpnameMarca, udpIdCategoria);
    $('#modalEditarMarca').modal('hide');
    location.reload();

});

btnEliminarMarca.addEventListener('click', () => {
    let id = $('#deleteMarca').val();
    eliminarMarca(id);
    location.reload(true);
});
// Función para leer los marcas

const leerMarcas = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const marcas = JSON.parse(xhr.responseText);
            console.table(marcas);
            $('#tablaMarcas').DataTable({
                data: marcas,
                columns: [
                    { data: 'id' },
                    { data: 'bname' },
                    { data: 'name' },
                    { data: 'status' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="abrirModalActualizarMarca(' + data.id + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarMarca(' + data.id + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las marcas');
        }
    };
    xhr.send('operation=read');
};

const leerCategorias = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const categorias = JSON.parse(xhr.responseText);
            console.log('listado de categorias');
            console.table(categorias);

            selectCategorias.innerHTML = '';
            selectCategoriasUDP.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una categoria';
            selectCategorias.appendChild(defaultOption);

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.categoryid;
                option.textContent = categoria.name;
                selectCategorias.append(option);
            });
        } else {
            console.error('Error al leer las categorias');
        }
    };
    xhr.send('operation=createselect');
};

const leerCategorias2 = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const categorias = JSON.parse(xhr.responseText);
            console.log('listado de categorias');
            console.table(categorias);

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.categoryid;
                option.textContent = categoria.name;
                selectCategoriasUDP.append(option);
            });
        } else {
            console.error('Error al leer las categorias');
        }
    };
    xhr.send('operation=createselect');
};

const leerRowMarca = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const marca = JSON.parse(xhr.responseText);
            console.table(marca);
            const defaultOptionUDP = document.createElement('option');
            defaultOptionUDP.value = marca[0].categoryid;
            defaultOptionUDP.textContent = marca[0].name;
            selectCategoriasUDP.append(defaultOptionUDP);
            leerCategorias2();
            document.getElementById('udp-nombremarca').value = marca[0].bname;
            console.table(marca[0].bname);

        } else {
            console.error('Error al leer la marca');
        }
    };
    xhr.send(`operation=row&id=${id}`);
    console.log('El Id de la marca es ' + id);
};

// Función para insertar un marca
const insertarMarca = (categoryId, nameMarca) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            // const marca = JSON.parse(xhr.responseText);
            // console.table(marca);
            // marca.msj ?  toastr.warning('La marca ya existe.') : location.reload();
        } else {
            console.error('No se encontro el objeto de comunicacion');
        }
    };
    xhr.send(`operation=create&category=${categoryId}&name=${nameMarca}`);
};

// Función para actualizar un marca
const actualizarMarca = (id, name, idCategoriaMarca) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Marca actualizada correctamente');
            // Lógica adicional después de actualizar el marca
        } else {
            console.error('Error al actualizar los datos de la marca');
        }
    };
    xhr.send(`operation=update&id=${id}&name=${name}&idcategoriamarca=${idCategoriaMarca}`);
};

// Función para eliminar un marca
const eliminarMarca = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Marca eliminada correctamente');
            // Lógica adicional después de eliminar el marca
        } else {
            console.error('Error al eliminar la marca');
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar marca
const abrirModalInsertarMarca = () => {
    // Lógica para abrir el modal de insertar marca
    $('#modalAgregarMarca').modal('show');
};

// Función para abrir el modal de actualizar datos del marca
const abrirModalActualizarMarca = (id) => {
    $('#udp-idmarca').val(id);
    leerRowMarca(id);
    $('#modalEditarMarca').modal('show');
};



// Función para eliminar el registro de un marca
const confirmarEliminarMarca = (id) => {
    // Lógica para mostrar confirmación de eliminar marca
    $('#deleteMarca').val(id);
    $('#modalBorrarMarca').modal('show');
};

leerCategorias();
leerMarcas();

