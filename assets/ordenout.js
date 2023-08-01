//Constante de Declaracion para la base Url
const baseURL = '../Controllers/OrdenController.php';

//Control de eventos de los modales
$("#modalAgregarSalida").on('shown.bs.modal', function () {
    leerProductos();
    leerClientes();
});

$("#modalAgregarSalida").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarSalida  = document.querySelector('#agregar-salida');
// const btnEditarCategoria      = document.querySelector('#agregar-categoria');
// const btnEliminarCategoria    = document.querySelector('#btnEliminarCategoria');
const btnInsertarSalida = document.querySelector('#btnInsertarSalida');
// const btnActualizarCategoria = document.querySelector('#btnActualizarCategoria');


//Select del modal para rellenar el listado de productos
const selectListProductos = document.getElementById('salicveproducto');
const selectProveedores    = document.getElementById('salicveproveedor');



//Funcion para abrir el modal al hacer click
btnAgregarSalida.addEventListener('click', () => {
    abrirModalInsertarSalida();
});

btnInsertarSalida.addEventListener('click', () => {
    
    let icveproducto    = document.getElementById('salicveproducto').value;
    let salcantidad    = document.getElementById('salicantidad').value;
    let salicveproveedor    = document.getElementById('salicveproveedor').value;

    insertarSalida(icveproducto, salcantidad, salicveproveedor); 
    // console.log(` El resultado es: ${respuesta}`);
    // if(respuesta == 1){
    //     $('#modalAgregarSalida').modal('hide');
    //     location.reload();
    // }
});


// Función para leer las salidas

const leerSalidas = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const salidas = JSON.parse(xhr.responseText);
            console.log('Registros de salidas');
            console.table(salidas);
            $('#tablaSalidas').DataTable({
                data: salidas,
                columns: [
                    { data: 'order_id' },
                    { data: 'pname' },
                    { data: 'bname' },
                    { data: 'total_shipped' },
                    { data: 'order_date' },
                ]
            });
        } else {
            console.error('Error al leer las salidas');
        }
    };
    xhr.send('operation=read');
};

const leerRowSalida = (id) => {
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

// Función para insertar un categorias
const insertarSalida = (icveproducto, salcantidad, salicveproveedor) => {
    const xhr = new XMLHttpRequest();
    var resp = 0;
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const salidas = JSON.parse(xhr.responseText);
            if(!salidas.msj){
                toastr.error('No existe Stock suficiente para ejecutar la salida.');
            } else{
                console.log(salidas.msj);

                $('#modalAgregarSalida').modal('hide');
                location.reload();
            }

        } else {
            console.error('Error al insertar la salida');
        }
    };
    xhr.send(`operation=create&pid=${icveproducto}&cantidad=${salcantidad}&icveproveedor=${salicveproveedor}`);
   
};

const leerProductos = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const productos = JSON.parse(xhr.responseText);
            console.log('listado de productos');
            console.table(productos);

            selectListProductos.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un Producto';
            selectListProductos.appendChild(defaultOption);

            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.pid;
                option.textContent = producto.pname;
                selectListProductos.append(option);
            });

        } else {
            console.error('Error al leer los productos para llenar el select');
        }
    };
    xhr.send('operation=readproducts');
};


const leerClientes = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const proveedores = JSON.parse(xhr.responseText);
            console.log('listado de proveedores');
            console.table(proveedores);

            selectProveedores.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un Elemento';
            selectProveedores.appendChild(defaultOption);

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.id;
                option.textContent = proveedor.name;
                selectProveedores.append(option);
            });
        } else {
            console.error('Error al leer los proveedores para llenar el select');
        }
    };
    xhr.send('operation=readprovider');
};

const abrirModalInsertarSalida = () => {
    // Lógica para abrir el modal de insertar categoria
    $('#modalAgregarSalida').modal('show');
};

leerSalidas();

