//Constante de Declaracion para la base Url
const baseURL = '../Controllers/PurchaseController.php';

//Control de eventos de los modales
$("#modalAgregarCompra").on('shown.bs.modal', function () {
    leerProductos();
    leerProveedor();
});

$("#modalAgregarCompra").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarCompra  = document.querySelector('#agregar-compra');
// const btnEditarCategoria      = document.querySelector('#agregar-categoria');
// const btnEliminarCategoria    = document.querySelector('#btnEliminarCategoria');
const btnInsertarCompra = document.querySelector('#btnInsertarCompra');
// const btnActualizarCategoria = document.querySelector('#btnActualizarCategoria');


//Select del modal para rellenar el listado de productos
const selectListProductos = document.getElementById('compicveproducto');
const selectProveedores    = document.getElementById('compicveproveedor');



//Funcion para abrir el modal al hacer click
btnAgregarCompra.addEventListener('click', () => {
    abrirModalInsertarCompra();
});

btnInsertarCompra.addEventListener('click', () => {
    let icveproducto    = document.getElementById('compicveproducto').value;
    let compcantidad    = document.getElementById('compcantidad').value;
    let compicveproveedor    = document.getElementById('compicveproveedor').value;

    insertarCompra(icveproducto, compcantidad, compicveproveedor);
    $('#modalAgregarCompra').modal('hide');
    location.reload();
});

// btnActualizarCategoria.addEventListener('click', () => {
//     let id = $('#udp-idcategoria').val();

//     console.log('Valor al dar click ' + id);
//     leerRowCategoria(id);
//     let udpnameCategoria    = document.getElementById('udp-nombrecategoria').value;

//     actualizarCategoria(id, udpnameCategoria);
//     $('#modalEditarCategoria').modal('hide');
//     location.reload();
    
// });

// btnEliminarCategoria.addEventListener('click', ( ) => {
//     let id = $('#deleteCategoria').val();
//     eliminarCategoria(id);
//     location.reload(true);
// });
// Función para leer los categorias

const leerCompras = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const compras = JSON.parse(xhr.responseText);
            console.log('Registros de compras');
            console.table(compras);
            $('#tablaCompras').DataTable({
                data: compras,
                columns: [
                    { data: 'purchase_id' },
                    { data: 'supplier_name' },
                    { data: 'pname' },
                    { data: 'bname' },
                    { data: 'quantity' },
                    { data: 'purchase_date' },
                ]
            });
        } else {
            console.error('Error al leer las compras');
        }
    };
    xhr.send('operation=read');
};

const leerRowCompra = (id) => {
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
const insertarCompra = (icveproducto, compcantidad, compicveproveedor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Categoria insertada correctamente');
            
        } else {
            console.error('Error al insertar la categoria');
        }
    };
    xhr.send(`operation=create&pid=${icveproducto}&cantidad=${compcantidad}&icveproveedor=${compicveproveedor}`);
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


const leerProveedor = () => {
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
            defaultOption.textContent = 'Seleccione un Proveedor';
            selectProveedores.appendChild(defaultOption);

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.icveproveedor;
                option.textContent = proveedor.supplier_name;
                selectProveedores.append(option);
            });
        } else {
            console.error('Error al leer los proveedores para llenar el select');
        }
    };
    xhr.send('operation=readprovider');
};
// Función para actualizar un categoria
// const actualizarCategoria = (id, name) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', baseURL , true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             console.log('Categoria actualizada correctamente');
//             // Lógica adicional después de actualizar el categoria
//         } else {
//             console.error('Error al actualizar los datos de la categoria');
//         }
//     };
//     xhr.send(`operation=update&id=${id}&name=${name}`);
// };

// Función para eliminar un categoria
// const eliminarCategoria = (id) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', baseURL , true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             console.log('Categoria eliminada correctamente');
//             // Lógica adicional después de eliminar el categoria
//         } else {
//             console.error('Error al eliminar la categoria');
//         }
//     };
//     xhr.send(`operation=delete&id=${id}`);
// };

// Función para abrir el modal de insertar categoria
const abrirModalInsertarCompra = () => {
    // Lógica para abrir el modal de insertar categoria
    $('#modalAgregarCompra').modal('show');
};

// Función para abrir el modal de actualizar datos del categoria
// const abrirModalActualizarCategoria = (id) => {
//     $('#udp-idcategoria').val(id);
//     leerRowCategoria(id);
//     $('#modalEditarCategoria').modal('show');
// };



// Función para eliminar el registro de un categoria
// const confirmarEliminarCategoria = (id) => {
//     // Lógica para mostrar confirmación de eliminar categoria
//     $('#deleteCategoria').val(id);
//     $('#modalBorrarCategoria').modal('show');
// };


leerCompras();

