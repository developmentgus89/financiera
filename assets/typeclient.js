//Constante de Declaracion para la base Url
const baseURL = '../Controllers/TypeClientController.php';

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
const btnAgregar                = document.querySelector('#agregar-tasa');
const btnEliminarTipoCliente    = document.querySelector('#btnEliminarInteres');
const btnInsertarTipoCliente    = document.querySelector('#btnInsertarTipoCliente');
const btnActTasaInteresTCliente = document.querySelector('#btnActTasaInteresTCliente');
const btnDeleteTasaInteres      = document.querySelector('#btnEliminarTasaInteres');
const selectTaxesTypeClient     = document.getElementById('typeClientTax');
const selectUDPTasaInteres      = document.getElementById('udp-tasainteres');




//Funcion para abrir el modal al hacer click
btnAgregar.addEventListener('click', () => {
    abrirModalInsertarTaxes();
});

btnInsertarTipoCliente.addEventListener('click', () => {
    
    let typeclientdescripcion = document.getElementById('typeclientdescripcion').value;
    let abreTipoClient        = document.getElementById('abreTipoClient').value;
    let typeClientTax         = document.getElementById('typeClientTax').value;
    
    
    insertarTipoCliente(typeclientdescripcion, abreTipoClient, typeClientTax);
    $('#modalAgregar').modal('hide');
    
});

btnActTasaInteresTCliente.addEventListener('click', () => {
    let id = document.getElementById('udp-icvetipocliente').value;

    console.log('Valor al dar click ' + id);
    let udpcdescriptipocliente  = document.getElementById('udp-cdescriptipocliente').value;
    let udpcabreviiatipo = document.getElementById('udp-cabreviiatipo').value;
    let udptasainteres  = document.getElementById('udp-tasainteres').value;
    console.log(`valor del select ${udptasainteres}`);
    actualizarTipoCliente(id, udpcdescriptipocliente, udpcabreviiatipo, udptasainteres);
    $('#modalEditar').modal('hide');
    
});

btnEliminarTipoCliente.addEventListener('click', ( ) => {
    let id = $('#deleteTipoClienteId').val();
    eliminarTipoCliente(id);
    // $('#modalBorrarCliente').modal('hide');
    // location.reload();
});

// Función para leer los clientes
const leerTiposClientes = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            var tablaTipoCliente = document.querySelector('#tblTipoCliente');
            new DataTable( tablaTipoCliente, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['ID','Descripción Tipo Cliente', 'Abreviatura', 'Descrip Tasa', '% Tasa Interes','Acciones'],
                    data: data.map(function( item ){
                        // return Object.values(item);
                        var id = item['icvetipocliente'];
                        return [
                            id,
                            item['cdescriptipocliente'],
                            item['cabreviiatipo'],
                            item['cdescripciontascom'],
                            item['ftasainteres'] + ' %',
                            `<button class="btn bg-gradient-danger btn-sm" onclick="confirmarEliminarTipoCliente(${ id })"><i class="fas fa-trash-alt"></i></button> <button class="btn bg-gradient-success btn-sm" onclick="leerRowTipoCliente( ${ id })"><i class="fas fa-edit"></i></button>`

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
const leerRowTipoCliente = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const tipoCliente = JSON.parse(xhr.responseText);
            console.table(tipoCliente);
            document.getElementById('udp-icvetipocliente').value = tipoCliente[0].icvetipocliente;
            document.getElementById('udp-cdescriptipocliente').value     = tipoCliente[0].cdescriptipocliente;
            document.getElementById('udp-cabreviiatipo').value = tipoCliente[0].cabreviiatipo;
            const defaultOptionUDP = document.createElement('option');
            defaultOptionUDP.value = tipoCliente[0].icvetasascomisiones;
            defaultOptionUDP.textContent = `${tipoCliente[0].ftasainteres} %`;
            selectUDPTasaInteres.append(defaultOptionUDP);
            leerSelectTasaTipoCliente();
            $('#modalEditar').modal('show');
            
            
            
        } else {
            console.error('Error al leer el la tasa de interes');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

const leerSelectTasaTipoCliente = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if( xhr.status === 200){
            const taxTypesClients = JSON.parse(xhr.responseText);
            console.log('Listado de Tipos de Clientes');
            console.table(taxTypesClients);

            taxTypesClients.forEach( TaxTypeClient => {
                const option = document.createElement('option');
                option.value = TaxTypeClient.icvetasascomisiones;
                option.textContent = `${TaxTypeClient.ftasainteres} %`;
                selectUDPTasaInteres.append(option);
            });
        }else{
            console.error('Error al leer las tasas de interes');
        }
    };
    xhr.send(`operation=createselect`);
};

// Función para insertar un cliente
/**
 * 
 * @param {String} typeclientdescripcion 
 * @param {String} abreTipoClient 
 * @param {number} typeClientTax 
 */
const insertarTipoCliente = (typeclientdescripcion, abreTipoClient, typeClientTax) => {
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
    xhr.send(`operation=create&typeclientdescripcion=${typeclientdescripcion}&abreTipoClient=${abreTipoClient}&typeClientTax=${typeClientTax}`);
};

// Función para actualizar una tasa de interes
/**
 * 
 * @param {number} id 
 * @param {String} udpcdescriptipocliente 
 * @param {String} udpcabreviiatipo 
 * @param {number} udptasainteres 
 */
const actualizarTipoCliente = (id, udpcdescriptipocliente, udpcabreviiatipo, udptasainteres) => {
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
    xhr.send(`operation=update&id=${id}&udpcdescriptipocliente=${udpcdescriptipocliente}&udpcabreviiatipo=${udpcabreviiatipo}&udptasainteres=${udptasainteres}`);
};

// Función para eliminar un cliente
/**
 * 
 * @param {number} id 
 */
const eliminarTipoCliente = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL , true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Cliente eliminado correctamente');
            // location.reload();
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



// Función para eliminar el registro de un tipo de cliente
/**
 * 
 * @param {number} id 
 */
const confirmarEliminarTipoCliente = (id) => {
    // Lógica para mostrar confirmación de eliminar cliente
    $('#deleteTipoClienteId').val(id);
    const element = document.querySelector('#elementText');
    element.innerHTML = `<h2> ${ id } </h2>`;
    console.log(id);
    $('#modalBorrarTipoCliente').modal('show');
};

//Funcion para llenar el select de las tasas de interes
const leerTaxes = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (){
        if(xhr.status === 200){
            const taxes = JSON.parse(xhr.responseText);
            console.log('Listado de taxes');
            console.table(taxes);

            selectTaxesTypeClient.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'SELECCIONE EL TIPO DE TASA';
            selectTaxesTypeClient.appendChild(defaultOption);

            taxes.forEach( tax => {
                const option = document.createElement('option');
                option.value = tax.icvetasascomisiones;
                option.textContent = `${tax.cdescripciontascom} - ${ tax.ftasainteres } %`;
                selectTaxesTypeClient.append(option);
            });
        }else{
            console.log('Error al leer los taxes');
        }
    };
    xhr.send('operation=createselect');
};

leerTaxes();

leerTiposClientes();



