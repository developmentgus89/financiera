//Constante de Declaracion para la base Url
const baseURL = '../Controllers/TaxComisionsController.php';

$("#modalAgregar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar           = document.querySelector('#agregar-tasa');
// const btnEditarCliente     = document.querySelector('#agregar-cliente');
const btnEliminarInteres   = document.querySelector('#btnEliminarCliente');
const btnInsertarInteres   = document.querySelector('#btnInsertarInteres');
// const btnActualizarCliente = document.querySelector('#btnActualizarCliente');
// const selectGrados         = document.getElementById('icvegrado');
// const selectGradosUDP      = document.getElementById('udp-icvegrado');



//Funcion para abrir el modal al hacer click
btnAgregar.addEventListener('click', () => {
    abrirModalInsertarTaxes();
});

btnInsertarInteres.addEventListener('click', () => {
    
    let taxdescripcion    = document.getElementById('taxdescripcion').value;
    let taxporcentajeinteres = document.getElementById('taxporcentajeinteres').value;
    let taxobservaciones  = document.getElementById('taxobservaciones').value;
    
    // const dataTableCliente = $('#tablaClientes').DataTable();
    insertarInteres(taxdescripcion, taxporcentajeinteres, taxobservaciones);
    // dataTableCliente.destroy();
    $('#modalAgregar').modal('hide');
    // location.reload();
});

// btnActualizarImpuesto.addEventListener('click', () => {
//     let id = $('#udp-idtaxes').val();

//     console.log('Valor al dar click ' + id);
//     leerRowCliente(id);
//     let udpcvegrado = document.getElementById('udp-icvegrado').value;
//     let udpname     = document.getElementById('udp-namecustomer').value;
//     let udpaddress  = document.getElementById('udp-addresscustomer').value;
//     let udpmobile   = document.getElementById('udp-mobilecustomer').value;
//     // const dataTableCliente = $('#tablaClientes').DataTable();
//     actualizarCliente(id, udpcvegrado, udpname, udpaddress, udpmobile );
//     // dataTableCliente.destroy();
//     $('#modalEditar').modal('hide');
//     location.reload();
    
// });

// btnEliminarCliente.addEventListener('click', ( ) => {
//     let id = $('#deleteCliente').val();
//     // const dataTableCliente = $('#tablaClientes').DataTable();
//     eliminarCliente(id);
//     // dataTableCliente.destroy();
//     $('#modalBorrarCliente').modal('hide');
//     location.reload();
// });
// Función para leer los clientes


const leerImpuestos = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            var tablaImpuestos = document.querySelector('#tblImpuestos');
            new DataTable( tablaImpuestos, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['ID','Descripción', 'Interés', 'Observaciones','Acciones'],
                    data: data.map(function( item ){
                        // return Object.values(item);
                        var id = item['icvetasascomisiones'];
                        return [
                            id,
                            item['cdescripciontascom'],
                            item['ftasainteres'],
                            item['cattasacomobs'],
                            `<button class="btn bg-gradient-danger btn-sm" onclick=""><i class="fas fa-trash-alt"></i></button> <button class="btn bg-gradient-success btn-sm" onclick=""><i class="fas fa-edit"></i></button>`

                        ]
                    })
                }
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

// Función para insertar un cliente
const insertarInteres = (taxdescripcion, taxporcentajeinteres, taxobservaciones) => {
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
    xhr.send(`operation=create&descripcion=${taxdescripcion}&pinteres=${taxporcentajeinteres}&observaciones=${taxobservaciones}`);
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
const abrirModalInsertarTaxes = () => {
    // Lógica para abrir el modal de insertar cliente
    $('#modalAgregar').modal('show');
};

// Función para abrir el modal de actualizar datos del cliente
const abrirModalActualizarCliente = (id) => {
    $('#udp-idcustomer').val(id);
    $('#modalEditar').modal('show');
};



// Función para eliminar el registro de un cliente
const confirmarEliminarCliente = (id) => {
    // Lógica para mostrar confirmación de eliminar cliente
    $('#deleteCliente').val(id);
    $('#modalBorrarCliente').modal('show');
};
leerImpuestos();



