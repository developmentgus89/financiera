//Constante de Declaracion para la base Url

const baseURL = '../Controllers/ProductsController.php';

// Agregar reglas de validación para los campos del formulario




//Manejo de eventos en Modales
$("#modalAgregarProductos").on('shown.bs.modal', function () {
    leerMarcas();
    leerProveedor();
    leerUnidadMedida();
    leerUbicacion();
});

$("#modalEditarProducto").on('shown.bs.modal', function () {
    leerMarcas();
    leerProveedor();
    leerUnidadMedida();
    // leerUbicacion();
});

$("#modalAgregarProductos").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalEditarProducto").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalBorrarProductos").on('hidden.bs.modal', function () {
    location.reload();
});
//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregarProductos = document.querySelector('#agregar-productos');
const btnEditarProductos = document.querySelector('#agregar-productos');
const btnEliminarProductos = document.querySelector('#btnEliminarProductos');
const btnInsertarProductos = document.querySelector('#btnInsertarProductos');
const btnActualizarProductos = document.querySelector('#btnActualizarProductos');
const selectMarcas = document.getElementById('promarca');
const selectProveedores = document.getElementById('proproveedor');
const selectUnidadMedida = document.getElementById('prounidadmedida');
const selectUbicaciones = document.getElementById('proubicacion');

//Select del modal para actualizar el producto
const selectMarcaUDP = document.getElementById('udp-promarca');
const selectProveedorUDP = document.getElementById('udp-proproveedor');
const selectUbicacionUDP = document.getElementById('udp-proubicacion');
const selectUnidadMedidaUDP = document.getElementById('udp-prounidadmedida');
const selectStatusUDP = document.getElementById('udp-prostatus');


//Funcion para abrir el modal al hacer click
btnAgregarProductos.addEventListener('click', () => {
    abrirModalInsertarProductos();
});


btnInsertarProductos.addEventListener('click', () => {
    let proname = document.getElementById("proname");
    let promarca = document.getElementById("promarca");
    let proproveedor = document.getElementById("proproveedor");
    let prodescripcion = document.getElementById("prodescripcion");
    let proubicacion = document.getElementById("proubicacion");
    let promodelo = document.getElementById("promodelo");
    let prostock = document.getElementById("prostock");
    let prounidadmedida = document.getElementById("prounidadmedida");
    // let procosto = document.getElementById("procosto");
    // let procoston = procosto.slice(4);
    // let nprocosto = procoston.replace(',', '');
    // let proimpuesto = document.getElementById("proimpuesto");
    // let proimpueston = proimpuesto.slice(4);
    // let nproimpuesto = proimpueston.replace(',', '');
    let prominorden = document.getElementById("prominorden");
    let prostatus = document.getElementById("prostatus");
    let profechaalta = document.getElementById("profechaalta");

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
        input.style.border = '1px solid red';
    }

    const removeError = (input) => {
        console.log('El valor del input es: ' + input);
        const parent = input.parentElement;
        const errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
            parent.removeChild(errorSpan);
        }

        input.style.border = '1px solid #ccc';
    }

    const validateFormProduct = () => {

        removeError(proname);

        if (proname.value === '') {
            showError(proname, 'Por favor ingrese el nombre del producto');
        } else if (promarca.value === '') {
            removeError(proname);
            showError(promarca, 'Por favor seleccione la marca');
        } else if (proproveedor.value === '') {
            removeError(proname);
            removeError(promarca);
            showError(proproveedor, 'Por favor seleccione el proveedor del producto');
        } else if (prodescripcion.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            showError(prodescripcion, 'Por favor ingrese la descripcion del producto');
        } else if (promodelo.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            showError(promodelo, 'Por favor ingrese el modelo del producto');
        } else if (prostock.value <= 0) {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            showError(prostock, 'La cantidad del producto no corresponde a un numero valido');
        } else if (prounidadmedida.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            removeError(prostock);
            showError(prounidadmedida, 'La cantidad del producto no corresponde a un numero valido');

        } else if (proubicacion.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            removeError(prostock);
            removeError(prounidadmedida);
            showError(proubicacion, 'Seleccione el anaquel o la ubicacion del producto.');
        } else if (prominorden.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            removeError(prostock);
            removeError(prounidadmedida);
            removeError(proubicacion);
            showError(prominorden, 'Ingrese el minimo de compra.');
        } else if (prostatus.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            removeError(prostock);
            removeError(prounidadmedida);
            removeError(proubicacion);
            removeError(prominorden);
            showError(prostatus, 'Seleccione el estatus actual del producto.');

        } else if (profechaalta.value === '') {
            removeError(proname);
            removeError(promarca);
            removeError(proproveedor);
            removeError(prodescripcion);
            removeError(promodelo);
            removeError(prostock);
            removeError(prounidadmedida);
            removeError(proubicacion);
            removeError(prominorden);
            removeError(prostatus);
            showError(profechaalta, 'Ingrese la fecha.');
        } else {
            insertarProductos(
                proname.value,
                promarca.value,
                proproveedor.value,
                prodescripcion.value,
                proubicacion.value,
                promodelo.value,
                prostock.value,
                prounidadmedida.value,
                prominorden.value,
                prostatus.value,
                profechaalta.value
            );
            // $('#modalAgregarProductos').modal('hide');
            // location.reload();
        }
    }

    validateFormProduct();









});

btnActualizarProductos.addEventListener('click', () => {
    let pid = $('#udp-pid').val();

    console.log('Valor al dar click Productos -- ' + pid);
    //leerRowProductos(pid);
    let udpNameProducto = document.getElementById('udp-proname').value;
    let udpMarcaProducto = document.getElementById('udp-promarca').value;
    let udpProveedorProducto = document.getElementById('udp-proproveedor').value;
    let udpDescripcionProducto = document.getElementById('udp-prodescripcion').value;
    let udpUbicacionProducto = document.getElementById('udp-proubicacion').value;
    let udpModeloProducto = document.getElementById('udp-promodelo').value;
    let udpStockProducto = document.getElementById('udp-prostock').value;
    let udpUnidadMediadProducto = document.getElementById('udp-prounidadmedida').value;
    // let udpCostoProducto = document.getElementById('udp-procosto').value;
    // let udpImpuestoProducto = document.getElementById('udp-proimpuesto').value;
    //! Las variables anteriores ya estan en nulos en la base
    let udpMinOrdenProducto = document.getElementById('udp-prominorden').value;
    let udpStatusProducto = document.getElementById('udp-prostatus').value;
    let udpFecahAltaProducto = document.getElementById('udp-profechaalta').value;

    actualizarProductos(udpMarcaProducto, udpNameProducto, udpModeloProducto, udpDescripcionProducto, udpStockProducto, udpUnidadMediadProducto,  
        udpMinOrdenProducto, udpProveedorProducto, udpStatusProducto, udpFecahAltaProducto, udpUbicacionProducto, pid);
    

});

btnEliminarProductos.addEventListener('click', () => {
    let id = $('#deleteProductos').val();
    eliminarProductos(id);
    
});
// Función para leer los productoss

const leerProductos = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const productoses = JSON.parse(xhr.responseText);
            console.log('Listado de Productoses');
            console.table(productoses);
            $('#tablaProductos').DataTable({
                data: productoses,
                columns: [
                    { data: 'pid' },
                    { data: 'name' },
                    { data: 'bname' },
                    { data: 'pname' },
                    { data: 'quantity' },
                    { data: 'supplier_name' },
                    {
                        data: 'status',
                        render: function (data, type, row) {
                            return data == 1 ? 'ACTIVO' : 'INACTIVO';
                        }
                    },
                    { data: 'date' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-success btn-sm" onclick="openModalUDPProductos(' + data.pid + ')">Editar</button>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="confirmarEliminarProductos(' + data.pid + ')">Eliminar</button>';
                        }
                    }
                ]
            });
        } else {
            console.error('Error al leer las productoss');
        }
    };
    xhr.send('operation=read');
};

const leerMarcas = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const marcas = JSON.parse(xhr.responseText);
            console.log('listado de categorias');
            console.table(marcas);

            selectMarcas.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una Marca';
            selectMarcas.appendChild(defaultOption);

            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.id;
                option.textContent = marca.bname;
                selectMarcas.append(option);
            });

            marcas.forEach(marcaUDP => {
                const option = document.createElement('option');
                option.value = marcaUDP.id;
                option.textContent = marcaUDP.bname;
                selectMarcaUDP.append(option);
            });
        } else {
            console.error('Error al leer las categorias');
        }
    };
    xhr.send('operation=readbrands');
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

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.icveproveedor;
                option.textContent = proveedor.supplier_name;
                selectProveedorUDP.append(option);
            });
        } else {
            console.error('Error al leer los proveedores para llenar el select');
        }
    };
    xhr.send('operation=readprovider');
};

const leerUnidadMedida = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const unidadesMed = JSON.parse(xhr.responseText);
            console.log('listado de Unidades de Medida');
            console.table(unidadesMed);

            selectUnidadMedida.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una Unidad de Medida';
            selectUnidadMedida.appendChild(defaultOption);

            unidadesMed.forEach(unidad => {
                const option = document.createElement('option');
                option.value = unidad.icveunidad;
                option.textContent = unidad.cabrevia;
                selectUnidadMedida.append(option);
            });

            unidadesMed.forEach(unidad => {
                const option = document.createElement('option');
                option.value = unidad.icveunidad;
                option.textContent = unidad.cabrevia;
                selectUnidadMedidaUDP.append(option);
            });

        } else {
            console.error('Error al leer las unidades de medida para llenar el select');
            toastr.error('Error al leer las unidades de medida para llenar el select');
        }
    };
    xhr.send('operation=readunits');
};

const leerUbicacion = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const ubicaciones = JSON.parse(xhr.responseText);
            console.log('listado de ubicaciones para el producto');
            console.table(ubicaciones);

            selectUbicaciones.innerHTML = '';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una Ubicacion';
            selectUbicaciones.appendChild(defaultOption);

            ubicaciones.forEach(ubicacion => {
                console.log(`El valor de la ubicacion es ${ubicacion.bocupado}`);
                if (ubicacion.bocupado == 1) {
                    const option = document.createElement('option');
                    option.value = ubicacion.icveanaqueles;
                    option.textContent = `Numero de Anaquel ${ubicacion.inumeroanaquel} Estante:  ${ubicacion.cestante} Rejilla: ${ubicacion.crejilla}`;
                    selectUbicaciones.append(option);
                }

            });
        } else {
            console.error('Error al leer las ubicaciones de los productos desde el catalogo Shelf');
            toastr.error('Error al leer las ubicaciones de los productos desde el catalogo Shelf');
        }
    };
    xhr.send('operation=readubication');
};



const leerRowProductos = (pid) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const productos = JSON.parse(xhr.responseText);
            console.table(productos);
            document.getElementById('udp-pid').value = productos[0].pid;

            const dOptionMarca = document.createElement('option');
            dOptionMarca.value = productos[0].id;
            dOptionMarca.textContent = productos[0].bname;
            selectMarcaUDP.append(dOptionMarca);

            document.getElementById('udp-proname').value = productos[0].pname;

            const dOptionProveedor = document.createElement('option');
            dOptionProveedor.value = productos[0].icveproveedor;
            dOptionProveedor.textContent = productos[0].supplier_name;
            selectProveedorUDP.append(dOptionProveedor);

            document.getElementById('udp-prodescripcion').value = productos[0].description;

            const dOptionUbicacion = document.createElement('option');
            dOptionUbicacion.value = productos[0].icveanaqueles;
            dOptionUbicacion.textContent = `Num Anaquel: ${productos[0].inumeroanaquel} -- Estante: ${productos[0].cestante} -- Rejilla: ${productos[0].crejilla}`;
            selectUbicacionUDP.append(dOptionUbicacion);

            document.getElementById('udp-promodelo').value = productos[0].model;
            document.getElementById('udp-prostock').value = productos[0].quantity;

            const dOptionUnidadMedida = document.createElement('option');
            dOptionUnidadMedida.value = productos[0].icveunidad;
            dOptionUnidadMedida.textContent = productos[0].cdescripcion;
            selectUnidadMedidaUDP.append(dOptionUnidadMedida);

            // document.getElementById('udp-procosto').value = productos[0].base_price;
            // document.getElementById('udp-proimpuesto').value = productos[0].tax;
            document.getElementById('udp-prominorden').value = productos[0].minimum_order;

            let status = productos[0].status;
            const dOptionStatus = document.createElement('option');
            dOptionStatus.value = productos[0].status;
            if (status == 1) {
                dOptionStatus.textContent = 'Activo';
                const dValDos = document.createElement('option');
                dValDos.value = 2
                dValDos.textContent = 'Inactivo';
                selectStatusUDP.append(dOptionStatus);
                selectStatusUDP.append(dValDos);

            } else {
                dOptionStatus.textContent = 'Inactivo';
                const dValDos = document.createElement('option');
                dValDos.value = 1
                dValDos.textContent = 'Activo';
                selectStatusUDP.append(dOptionStatus);
                selectStatusUDP.append(dValDos);
            }

            document.getElementById('udp-profechaalta').value = productos[0].date;


        } else {
            console.error('Error al leer la productos');
        }
    };
    xhr.send(`operation=row&pid=${pid}`);
};

// Función para insertar un productos
const insertarProductos = (
    proname,
    promarca,
    proproveedor,
    prodescripcion,
    proubicacion,
    promodelo,
    prostock,
    prounidadmedida,
    prominorden,
    prostatus,
    profechaalta
) => {
    let params =
        'operation=create' +
        '&proname=' + proname +
        '&promarca=' + promarca +
        '&proproveedor=' + proproveedor +
        '&prodescripcion=' + prodescripcion +
        '&proubicacion=' + proubicacion +
        '&promodelo=' + promodelo +
        '&prostock=' + prostock +
        '&prounidadmedida=' + prounidadmedida +
        // '&procosto=' + procosto +
        // '&proimpuesto=' + proimpuesto +
        '&prominorden=' + prominorden +
        '&prostatus=' + prostatus +
        '&profechaalta=' + profechaalta;
    console.log(params);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Productos insertada correctamente');
            $('#modalAgregarProductos').modal('hide');
            location.reload();
        } else {
            console.error('Error al insertar la productos');
            toastr.error('Error al insertar la productos');
        }
    };
    xhr.send(params);
};

// Función para actualizar un productos
const actualizarProductos = (udpMarcaProducto, udpNameProducto, udpModeloProducto, udpDescripcionProducto, udpStockProducto, udpUnidadMediadProducto, 
    udpMinOrdenProducto, udpProveedorProducto, udpStatusProducto, udpFecahAltaProducto, udpUbicacionProducto, pid) => {

    let params =
        'operation=update' +
        '&udpMarcaProducto=' + udpMarcaProducto +
        '&udpNameProducto=' + udpNameProducto +
        '&udpModeloProducto=' + udpModeloProducto +
        '&udpDescripcionProducto=' + udpDescripcionProducto +
        '&udpStockProducto=' + udpStockProducto +
        '&udpUnidadMediadProducto=' + udpUnidadMediadProducto +
        // '&udpCostoProducto=' + udpCostoProducto +
        // '&udpImpuestoProducto=' + udpImpuestoProducto +
        //? Las ocupare en el futuros
        '&udpMinOrdenProducto=' + udpMinOrdenProducto +
        '&udpProveedorProducto=' + udpProveedorProducto +
        '&udpStatusProducto=' + udpStatusProducto +
        '&udpFecahAltaProducto=' + udpFecahAltaProducto +
        '&udpUbicacionProducto=' + udpUbicacionProducto +
        '&pid=' + pid;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Productos actualizada correctamente');
            $('#modalEditarProductos').modal('hide');
            location.reload();
        } else {
            console.error('Error al actualizar los datos de la productos');
        }
    };
    xhr.send(params);
};

// Función para eliminar un productos
const eliminarProductos = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const productos = JSON.parse(xhr.responseText);
            console.table(productos);
            productos.msj == 'ERROR' 
                ? toastr.error('No se puede eliminar este producto ya que cuenta con salidas y entradas') 
                : console.log('Se borro');
        } else {
            console.error('Error al eliminar la productos');
            const productos = JSON.parse(xhr.responseText);
            console.table(productos);
        }
    };
    xhr.send(`operation=delete&id=${id}`);
};

// Función para abrir el modal de insertar productos
const abrirModalInsertarProductos = () => {
    // Lógica para abrir el modal de insertar productos
    $('#modalAgregarProductos').modal('show');
};

// Función para abrir el modal de actualizar datos del productos
const openModalUDPProductos = (pid) => {
    $('#udp-pid').val(pid);
    leerRowProductos(pid);

    $('#modalEditarProducto').modal('show');
};



// Función para eliminar el registro de un productos
const confirmarEliminarProductos = (id) => {
    // Lógica para mostrar confirmación de eliminar productos
    $('#deleteProductos').val(id);
    $('#modalBorrarProductos').modal('show');
};

$('#procosto').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#proimpuesto').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

leerProductos();
