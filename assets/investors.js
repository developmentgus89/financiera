

//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';

// const textInputs = document.querySelectorAll('input[type="text"]');

// textInputs.forEach(input => {
//     input.addEventListener('input', function () {
//         this.value = this.value.toUpperCase();
//     });
// });

$('#invcantinvertida').inputmask('currency',{
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#udp-invcantinvertida').inputmask('currency',{
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});


$('#modalAgregar').on('shown.bs.modal' , () => {
    const invnombre = document.querySelector('#invnombre');
    invnombre.focus();
});


$("#modalAgregar").on('hidden.bs.modal', function () {
    // location.reload();
});

$("#modalEditar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar           = document.querySelector('#agregar-inversionista');

const btnEliminarCliente   = document.querySelector('#btnEliminarCliente');
const btnInsertInvestor    = document.querySelector('#btnInsertInvestor');
const btnUpdateInvestor    = document.querySelector('#btnUpdateInvestor');
const selectTipoCliente    = document.querySelector('#typeClient');
const btnRegresaModal      = document.querySelector('#btnRegresaModal');
const btnIrAInv            = document.querySelector('#btnIrAInv');



//Funcion para abrir el modal al hacer click
btnAgregar.addEventListener('click', () => {
    openModalInsertInvestor();
});

btnRegresaModal.addEventListener('click', () => {
    $('#m-danger-msj').modal('hide');
    $('#modalAgregar').modal('show');
});

btnIrAInv.addEventListener('click', () => {
    let cveinversionista = document.getElementById('go-icveinvestor').value;
    openDetailInv(cveinversionista);
});

btnInsertInvestor.addEventListener('click', () => {
    let invnombre        = document.getElementById('invnombre');
    let invapaterno      = document.getElementById('invapaterno');
    let invamaterno      = document.getElementById('invamaterno');
    let invedad          = document.getElementById('invedad');
    let invtelefono      = document.getElementById('invtelefono');
    let invcantinvertida = document.getElementById('invcantinvertida');
    let invclabe         = document.getElementById('invclabe');
    let invemail         = document.getElementById('invemail');
    let invDateRegister  = document.getElementById('invDateRegister');


    const valFormInvestor = () => {
        removeError(invnombre);

        if (invnombre.value == '' || invnombre.value == null) {
            showError(invnombre, 'Ingrese el nombre del inversionista');
            invnombre.focus();
        } else if (invapaterno.value == '' || invapaterno.value == null) {
            removeError(invnombre);
            showError(invapaterno, 'Ingrese el apellido paterno del Inversionista');
            invapaterno.focus();
        } else if (invamaterno.value == '' || invamaterno.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            showError(invamaterno, 'Ingrese el apellido materno del Inversionista');
            invamaterno.focus();
        } else if (invedad.value == '' || invedad.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            showError(invedad, 'Ingrese la edad del inversionista');
        } else if (invtelefono.value == '' || invtelefono.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            removeError(invedad);
            showError(invtelefono, 'Ingrese el numero de telefono del Inversionista');
        } else if (invcantinvertida.value == '' || invcantinvertida.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            removeError(invedad);
            removeError(invtelefono);
            showError(invcantinvertida, 'Ingrese la cantidad de inversion inicial del Inversionista');
        } else if (invclabe.value == '' || invclabe.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            removeError(invedad);
            removeError(invtelefono);
            removeError(invcantinvertida);
            showError(invclabe, 'Ingrese la CLABE para los depositos bancarios.');
        } else if (invemail.value == '' || invemail.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            removeError(invedad);
            removeError(invtelefono);
            removeError(invcantinvertida);
            removeError(invclabe);
            showError(invemail, 'Capture el correo electronico de contacto del inversionista');
        } else if (invDateRegister.value == '' || invDateRegister.value == null) {
            removeError(invnombre);
            removeError(invapaterno);
            removeError(invamaterno);
            removeError(invedad);
            removeError(invtelefono);
            removeError(invcantinvertida);
            removeError(invclabe);
            removeError(invemail);
            showError(invDateRegister, 'Capture la fecha de registro del inversionista');
        } else {
            removeError(invDateRegister);
            
           

            verifInsInsvestor(
                invnombre.value,
                invapaterno.value,
                invamaterno.value,
                invedad.value,
                invtelefono.value,
                invcantinvertida.value,
                invclabe.value,
                invemail.value,
                invDateRegister.value 
            );
            
            // insertInvestor(
            //     invnombre.value,
            //     invapaterno.value,
            //     invamaterno.value,
            //     invedad.value,
            //     invtelefono.value,
            //     invcantinvertida.value,
            //     invclabe.value,
            //     invemail.value,
            //     invDateRegister.value
            // );
        }
    }

    valFormInvestor();
});

btnUpdateInvestor.addEventListener('click', () => {
    let id = document.getElementById('udp-idcveinvestor').value;
    console.log('Valor al dar click ' + id);
        let udpidcveinvestor = document.getElementById('udp-idcveinvestor').value;
        let udpinvnombre = document.getElementById('udp-invnombre').value;
        let udpinvapaterno = document.getElementById('udp-invapaterno').value;
        let udpinvamaterno = document.getElementById('udp-invamaterno').value;
        let udpinvedad = document.getElementById('udp-invedad').value;
        let udpinvtelefono = document.getElementById('udp-invtelefono').value;
        let udpinvclabe = document.getElementById('udp-invclabe').value;
        let udpinvemail = document.getElementById('udp-invemail').value;
        let udpinvDateRegister = document.getElementById('udp-invDateRegister').value;

        updateInvestor(
            udpidcveinvestor,
            udpinvnombre,
            udpinvapaterno,
            udpinvamaterno,
            udpinvedad,
            udpinvtelefono,
            udpinvclabe,
            udpinvemail,
            udpinvDateRegister
        );
    // // dataTableCliente.destroy();
    $('#modalEditar').modal('hide');
    // location.reload();

});


btnEliminarCliente.addEventListener('click', () => {
    let id = $('#deleteCliente').val();
    eliminarCliente(id);
    $('#modalBorrarCliente').modal('hide');
    location.reload();
});
// Función para leer los Inversionistas


const getInvestors = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            var tableInvestors = document.querySelector('#tableInvestors');
            new DataTable(tableInvestors, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['ID', 'Nombre', 'A. Paterno', 'A. Materno', 'Telefono', 'Edad', 'Cant. Inversion', 'Fec. Registro', 'Cta. Bancaria', '','',''],
                    data: data.map(function (item) {
                        // return Object.values(item);
                        var id = item['icveinversionista'];
                        let cantidadInvertida = parseFloat(item['fcantidadinvertida']);
                        let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX',{
                            style: 'currency',
                            currency: 'MXN'
                        });
                        return [
                            id,
                            item['cnombre'],
                            item['capaterno'],
                            item['camaterno'],
                            item['ctelefono'],
                            item['iedad'],
                            cantidadFormateada,
                            item['dfecha_alta'],
                            item['cuentabancaria'],
                            `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="openDetailInv(${id})"><i class="fas fa-money-check"></i></button>`, 
                            `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`,
                            `<button class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Eliminar Datos" onclick=""><i class="fas fa-trash-alt"></i></button>`
                        ]
                    })
                }
            });
        } else {
            console.error('Error al leer los Inversionistas');
        }
    };
    xhr.send('operation=read');
};

/**
 * 
 * @param {number} id 
 */
const readRowInvestor = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
            console.table(inversionista);
            document.getElementById('udp-idcveinvestor').value = inversionista[0].icveinversionista;
            document.getElementById('udp-invnombre').value = inversionista[0].cnombre;
            document.getElementById('udp-invapaterno').value = inversionista[0].capaterno;
            document.getElementById('udp-invamaterno').value = inversionista[0].camaterno;
            document.getElementById('udp-invedad').value = inversionista[0].iedad;
            document.getElementById('udp-invtelefono').value = inversionista[0].ctelefono;
            document.getElementById('udp-invcantinvertida').value = inversionista[0].fcantidadinvertida;
            document.getElementById('udp-invclabe').value = inversionista[0].cuentabancaria;
            document.getElementById('udp-invemail').value = inversionista[0].cemail;
            document.getElementById('udp-invDateRegister').value = inversionista[0].dfecha_alta;

            let cantTotalInvertida = document.querySelector('#cantTotalInvertida');
            let cantTotInv = parseFloat(inversionista[0].fcantidadinvertida);
            cantTotInv = cantTotInv.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });

            cantTotalInvertida.innerHTML = `<h3> ${cantTotInv} </h3>`;

            let cantPagCapital = document.querySelector('#cantPagCapital');
            let cantPagCapitalF = parseFloat(inversionista[0].cantpagadacapital);
            cantPagCapitalF = cantPagCapitalF.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });
            cantPagCapital.innerHTML = `<h3> ${ cantPagCapitalF } </h3>`;
            $('#modalEditar').modal('show');
        } else {
            console.error('Error al leer el Inversionista');
        }
    };
    xhr.send(`operation=row&id=${id}`);
};

// Función para insertar un Inversionista
/**
 * 
 * @param {String} cnombre 
 * @param {String} capelpat 
 * @param {String} capelmat 
 * @param {number} cedad 
 * @param {String} ctelefono
 * @param {number} typeClient 
 * @param {date} cdatebirthd 
 * @param {date} clientDateRegister 
 * @param {number} InversionistaStatus 
 */
const insertInvestor = (
    invnombre, invapaterno, invamaterno,
    invedad, invtelefono, invcantinvertida,
    invclabe, invemail, invDateRegister) => {
    
    invcantinvertida = invcantinvertida.substring(4);
    invcantinvertida = invcantinvertida.replace(/,/g, '');

    let params = 
        'operation=create'+ 
        '&invnombre='+ invnombre +
        '&invapaterno='+ invapaterno +
        '&invamaterno='+ invamaterno +
        '&invedad='+ invedad +
        '&invtelefono='+ invtelefono + 
        '&invcantinvertida=' + invcantinvertida +
        '&invclabe=' + invclabe +
        '&invemail=' + invemail +
        '&invDateRegister=' + invDateRegister;
    console.log(params);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
            console.table(inversionista); //Cachamos el error
                inversionista ? location.reload() : console.warn('Error al crear el inversionista');
        } else {
            console.error('Error al insertar el Inversionista');
        }
    };
    xhr.send(params);
};

const verifInsInsvestor = ( 
    invnombre, invapaterno, invamaterno,
    invedad, invtelefono, invcantinvertida,
    invclabe, invemail, invDateRegister
    ) => {
    let params = 
        'operation=rowCount'+ 
        '&invnombre='+ invnombre +
        '&invapaterno='+ invapaterno +
        '&invamaterno='+ invamaterno;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', baseURL, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const inversionista = JSON.parse(xhr.responseText);
                
                if( !inversionista[0] ) {
                    console.warn('No existe el inversionista');
                    insertInvestor(
                        invnombre, invapaterno, invamaterno,
                        invedad, invtelefono, invcantinvertida,
                        invclabe, invemail, invDateRegister
                    );
                }else {
                    $('#modalAgregar').modal('hide');
                    document.getElementById('go-icveinvestor').value = inversionista[0].icveinversionista;
                    $('#m-danger-msj').modal('show');
                    
                }
                
            } else {
                console.error('Error al insertar el Inversionista');
            }
        };
        xhr.send(params);
}


// Función para actualizar un Inversionista
/**
 * 
 * @param {number} udpidcveinvestor 
 * @param {String} udpinvnombre 
 * @param {String} udpinvapaterno 
 * @param {String} udpinvamaterno 
 * @param {number} udpinvedad 
 * @param {String} udpinvtelefono 
 * @param {number} udpinvcantinvertida 
 * @param {String} udpinvclabe 
 * @param {String} udpinvemail 
 * @param {date} udpinvDateRegister 
 */
const updateInvestor = (
    udpidcveinvestor,
    udpinvnombre,
    udpinvapaterno,
    udpinvamaterno,
    udpinvedad,
    udpinvtelefono,
    udpinvclabe,
    udpinvemail,
    udpinvDateRegister
) => {
    let params = 
        'operation=update'+ 
        '&udpidcveinvestor='+ udpidcveinvestor +
        '&udpinvnombre='+ udpinvnombre +
        '&udpinvapaterno='+ udpinvapaterno +
        '&udpinvamaterno='+ udpinvamaterno +
        '&udpinvedad='+ udpinvedad + 
        '&udpinvtelefono=' + udpinvtelefono +
        '&udpinvclabe=' + udpinvclabe +
        '&udpinvemail=' + udpinvemail + 
        '&udpinvDateRegister=' + udpinvDateRegister;
    console.log(params);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Inversionista actualizado actualizado correctamente');
            location.reload();
        } else {
            console.error('Error al actualizar el Inversionista');
        }
    };
    xhr.send(params);
};


const totalInvestors = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);

            const tInversionistas = document.getElementById('totalInvestors');
            tInversionistas.innerHTML = data[0].total;
            console.log(data.total);
        } else {
            console.error('Error al ejecutar el metodo total de inversionistas');
        }
    };
    xhr.send(`operation=total`);
}

const totalCapital = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);

            const totalCapitalInv = document.getElementById('totalInvestorsCapital');
            let totalCapital = parseFloat(data[0].capital);
            let cantidadFormateada = totalCapital.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });

            data[0].capital == null ? totalCapitalInv.innerHTML = `$ 0.00` :  totalCapitalInv.innerHTML = cantidadFormateada;
            console.log(data.capital);
        } else {
            console.error('Error al ejecutar el metodo total de inversionistas');
        }
    };
    xhr.send(`operation=totalCapital`);
}

//TODO: Refactorizar cada una de las funciones
// const totalCapital = async () => {
//     try {
//         const response = await fetch(baseURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: 'operation=totalCapital'
//         });
//         if (response.ok) {
//             const data = await response.json();
//             console.table(data);

//             const totalCapitalInv = document.getElementById('totalInvestorsCapital');
//             let totalCapital = parseFloat(data[0].capital);
//             let cantidadFormateada = totalCapital.toLocaleString('es-MX', {
//                 style: 'currency',
//                 currency: 'MXN'
//             });

//             totalCapitalInv.innerHTML = data[0].capital == null ? '$ 0.00' : cantidadFormateada;
//             console.log(data.capital);
//         } else {
//             console.error('Error al ejecutar el método total de inversionistas');
//         }
//     } catch (error) {
//         console.error('Error inesperado:', error);
//     }
// };


// Función para abrir el modal de insertar Inversionista
const openModalInsertInvestor = () => {
    // Lógica para abrir el modal de insertar inversionista
    $('#modalAgregar').modal('show');
};

// Función para abrir el modal de actualizar datos del Inversionista
const abrirModalActualizarCliente = (id) => {
    $('#udp-idcustomer').val(id);
    $('#modalEditar').modal('show');
};



// Función para eliminar el registro de un Inversionista
const confirmarEliminarCliente = (id) => {
    // Lógica para mostrar confirmación de eliminar Inversionista
    $('#deleteCliente').val(id);
    $('#modalBorrarCliente').modal('show');
};

getInvestors();
totalInvestors();
totalCapital();



