//Constante de Declaracion para la base Url
const baseURL = '../Controllers/TaxComisionsController.php';

const textInputs = document.querySelectorAll('input[type="text"]');

textInputs.forEach( input => {
    input.addEventListener('input', function(){
        this.value = this.value.toUpperCase();
    });
});

$("#modalAgregar").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalEditar").on('hidden.bs.modal', function () {
    location.reload();
});

$("#modalBorrarTasaInteres").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar               = document.querySelector('#agregar-tasa');
const btnEliminarInteres       = document.querySelector('#btnEliminarInteres');
const btnInsertarInteres       = document.querySelector('#btnInsertarInteres');
const btnActualizarTasaInteres = document.querySelector('#btnActualizarTasaInteres');
const btnDeleteTasaInteres     = document.querySelector('#btnEliminarTasaInteres');




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
    location.reload();
    // dataTableCliente.destroy();
    $('#modalAgregar').modal('hide');
    
});

btnActualizarTasaInteres.addEventListener('click', () => {
    let id = document.getElementById('udp-icvetasascomisiones').value;

    console.log('Valor al dar click ' + id);
    let udpcdescripciontascom  = document.getElementById('udp-cdescripciontascom').value;
    let udpftasainteresame = document.getElementById('udp-ftasainteres').value;
    let udpcattasacomobs  = document.getElementById('udp-cattasacomobs').value;
    actualizarTasaInteres(id, udpcdescripciontascom, udpftasainteresame, udpcattasacomobs);
    // dataTableCliente.destroy();
    $('#modalEditar').modal('hide');
    location.reload();
    
});

btnEliminarInteres.addEventListener('click', ( ) => {
    let id = $('#deleteTasaInteres').val();
    eliminarTasaInteres(id);
    $('#modalBorrarCliente').modal('hide');
    location.reload();
});

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
                            `<button class="btn bg-gradient-danger btn-sm" onclick="confirmarEliminarTasaInteres(${ id })"><i class="fas fa-trash-alt"></i></button> <button class="btn bg-gradient-success btn-sm" onclick="leerRowTax( ${ id })"><i class="fas fa-edit"></i></button>`

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

/**
 * 
 * @param {number} id 
 */
const leerRowTax = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const tasa = JSON.parse(xhr.responseText);
            console.table(tasa);
            document.getElementById('udp-icvetasascomisiones').value = tasa[0].icvetasascomisiones;
            document.getElementById('udp-cdescripciontascom').value     = tasa[0].cdescripciontascom;
            document.getElementById('udp-ftasainteres').value = tasa[0].ftasainteres;
            document.getElementById('udp-cattasacomobs').value  = tasa[0].cattasacomobs;
            $('#modalEditar').modal('show');
            
            
            
        } else {
            console.error('Error al leer el la tasa de interes');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

// Función para insertar un cliente
/**
 * 
 * @param {String} taxdescripcion 
 * @param {number} taxporcentajeinteres 
 * @param {String} taxobservaciones 
 */
const insertarInteres = (taxdescripcion, taxporcentajeinteres, taxobservaciones) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente insertado correctamente');
           
        } else {
            console.error('Error al insertar el cliente');
        }
    };
    xhr.send(`operation=create&descripcion=${taxdescripcion}&pinteres=${taxporcentajeinteres}&observaciones=${taxobservaciones}`);
};

// Función para actualizar una tasa de interes
/**
 * 
 * @param {Number} id 
 * @param {String} udpcdescripciontascom 
 * @param {Number} udpnudpftasainteresame 
 * @param {String} udpcattasacomobs 
 */
const actualizarTasaInteres = (id, udpcdescripciontascom, udpftasainteresame, udpcattasacomobs ) => {
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
    xhr.send(`operation=update&id=${id}&udpcdescripciontascom=${udpcdescripciontascom}&udpftasainteresame=${udpftasainteresame}&udpcattasacomobs=${udpcattasacomobs}`);
};

// Función para eliminar un cliente
/**
 * 
 * @param {number} id 
 */
const eliminarTasaInteres = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente eliminado correctamente');
            location.reload();
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
/**
 * 
 * @param {number} id 
 */
const confirmarEliminarTasaInteres = (id) => {
    // Lógica para mostrar confirmación de eliminar cliente
    $('#deleteTasaInteres').val(id);
    const element = document.querySelector('#elementText');
    element.innerHTML = `<h2> ${ id } </h2>`;
    console.log(id);
    $('#modalBorrarTasaInteres').modal('show');
};


leerImpuestos();



