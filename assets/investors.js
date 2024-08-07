//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';


$('#invcantinvertida').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#udp-invcantinvertida').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#modalAgregar').on('shown.bs.modal', () => {
    const invnombre       = document.querySelector('#invnombre');
    const invinstbancaria = document.querySelector('#invinstbancaria');
    getBanks(invinstbancaria);
    getInterestInvesment();
    invnombre.focus();
});


$("#modalAgregar").on('hidden.bs.modal', function () {
    // location.reload();
});

$("#modalEditar").on('hidden.bs.modal', function () {
    location.reload();
});

//Recuperacion de los valores de los botones dentro de la vista Customers
const btnAgregar = document.querySelector('#agregar-inversionista');
const btnEliminarCliente = document.querySelector('#btnEliminarCliente');
const btnInsertInvestor = document.querySelector('#btnInsertInvestor');
const btnUpdateInvestor = document.querySelector('#btnUpdateInvestor');
const selectTipoCliente = document.querySelector('#typeClient');
const btnRegresaModal = document.querySelector('#btnRegresaModal');
const btnIrAInv = document.querySelector('#btnIrAInv');
const selectBancoUDP = document.querySelector('#udp-invinstbancaria');
const selectInterests = document.querySelector('#invinteres');



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
    let invnombre = document.getElementById('invnombre');
    let invapaterno = document.getElementById('invapaterno');
    let invamaterno = document.getElementById('invamaterno');
    let invedad = document.getElementById('invedad');
    let invtelefono = document.getElementById('invtelefono');
    let invinteres = document.getElementById('invinteres');
    let invcantinvertida = document.getElementById('invcantinvertida');
    let invtipocuenta = document.getElementById('invtipocuenta');
    let invinstbancaria = document.getElementById('invinstbancaria');
    let invctabancaria = document.getElementById('invctabancaria');
    let invemail = document.getElementById('invemail');
    let invDateRegister = document.getElementById('invDateRegister');




    const valFormInvestor = () => {
        const fields = [
            { element: invnombre, message: 'Ingrese el nombre del inversionista por favor' },
            { element: invapaterno, message: 'Ingrese el apellido paterno del Inversionista' },
            { element: invamaterno, message: 'Ingrese el apellido materno del inversionista' },
            { element: invedad, message: 'Ingrese la edad del inversionista' },
            { element: invtelefono, message: 'Ingrese el n\u00famero de telefono del inversionista' },
            { element: invinteres, message: 'Seleccione el Interes para este inversionista.' },
            { element: invcantinvertida, message: 'Ingrese el nombre del inversionista' },
            { element: invtipocuenta, message: 'Ingrese el tipo de cuenta bancaria del inversionista' },
            { element: invinstbancaria, message: 'Seleccione el banco de la cuenta bancaria' },
            { element: invctabancaria, message: 'Ingrese el n\u00famero de cuenta CLABE, dep\u00f3sito o tarjeta.' },
            { element: invemail, message: 'Ingrese el correo electr\u00f3nico del inversionista' },
            { element: invDateRegister, message: 'Seleccione la fechca de registro' }
        ];

        let hasError = false;

        for (const field of fields) {
            removeError(field.element);
            if (field.element.value === '' || field.element.value === null) {
                showError(field.element, field.message);
                field.element.focus();
                hasError = true;
                break;
            }
        }

        if (!hasError) {
            removeError(invDateRegister);
            verifInsInsvestor(
                invnombre.value,
                invapaterno.value,
                invamaterno.value,
                invedad.value,
                invtelefono.value,
                invinteres.value,
                invcantinvertida.value,
                invtipocuenta.value,
                invinstbancaria.value,
                invctabancaria.value,
                invemail.value,
                invDateRegister.value
            );
        }
    }

    valFormInvestor();
});

//*

btnUpdateInvestor.addEventListener('click', () => {
    let id = document.getElementById('udp-idcveinvestor').value;

    const fields = [
        'udp-idcveinvestor',
        'udp-invnombre',
        'udp-invapaterno',
        'udp-invamaterno',
        'udp-invedad',
        'udp-invtelefono',
        'udp-invtipocuenta',
        'udp-invinstbancaria',
        'udp-invctabancaria',
        'udp-invemail',
        'udp-invDateRegister'
    ];

    const values = {};

    fields.forEach((field) => {
        values[field] = document.getElementById(field).value;
    });

    updateInvestor(
        values['udp-idcveinvestor'],
        values['udp-invnombre'],
        values['udp-invapaterno'],
        values['udp-invamaterno'],
        values['udp-invedad'],
        values['udp-invtelefono'],
        values['udp-invtipocuenta'],
        values['udp-invinstbancaria'],
        values['udp-invctabancaria'],
        values['udp-invemail'],
        values['udp-invDateRegister']
    );
    // // dataTableCliente.destroy();
    // $('#modalEditar').modal('hide');
    // location.reload();

});


btnEliminarCliente.addEventListener('click', () => {
    let id = $('#deleteCliente').val();
    eliminarCliente(id);
    $('#modalBorrarCliente').modal('hide');
    location.reload();
});

// Función para leer los Inversionistas
const getInvestors = async () => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getAllInvestments`
        });

        if (!response.ok) {
            throw new Error(`Error con el servidor`);
        }

        const data = await response.json();

        var tableInvestors = document.querySelector('#tableInvestors');
        new DataTable(tableInvestors, {
            data: {
                // headings: Object.keys(data[0]),
                headings: ['ID', 'Nombre', 'Telefono', 'Edad', 'Cant. Inversion', 'Fec. Registro', 'Detalle', 'Modificar'],
                data: data.map(function (item) {
                    // return Object.values(item);
                    var id = item['icveinversionista'];
                    let cantidadInvertida = parseFloat(item['fcantidadinvertida']);
                    let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                    });
                    return [
                        id,
                        `${item['cnombre']} ${item['capaterno']} ${item['camaterno']}`,
                        item['ctelefono'],
                        item['iedad'],
                        cantidadFormateada,
                        item['dfecha_alta'],
                        `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="openDetailInv(${id})"><i class="fas fa-money-check"></i></button>`,
                        `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                    ]
                })
            }
        });
    } catch (error) {
        throw new Error(`No se pudo completar la consulta de los inversionistas ${error.message}`);
    }
}

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
            document.getElementById('udp-idcveinvestor').value = inversionista[0].icveinversionista;
            document.getElementById('udp-invnombre').value = inversionista[0].cnombre;
            document.getElementById('udp-invapaterno').value = inversionista[0].capaterno;
            document.getElementById('udp-invamaterno').value = inversionista[0].camaterno;
            document.getElementById('udp-invedad').value = inversionista[0].iedad;
            document.getElementById('udp-invtelefono').value = inversionista[0].ctelefono;
            document.getElementById('udp-invcantinvertida').value = inversionista[0].fcantidadinvertida;
            document.getElementById('udp-invtipocuenta').value = inversionista[0].itipocuenta;
            document.getElementById('udp-invinstbancaria').value = inversionista[0].icvebanco;
            const dOption = document.createElement('option');
            dOption.value = inversionista[0].icvebanco;
            dOption.textContent = inversionista[0].cnombrebanco;
            selectBancoUDP.append(dOption);
            document.getElementById('udp-invctabancaria').value = inversionista[0].cuentabancaria;
            document.getElementById('udp-invemail').value = inversionista[0].cemail;
            document.getElementById('udp-invDateRegister').value = inversionista[0].dfecha_alta;

            let cantTotalInvertida = document.querySelector('#cantTotalInvertida');
            let cantTotInv = parseFloat(inversionista[0].fcantidadinvertida);
            cantTotInv = cantTotInv.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });

            cantTotalInvertida.innerHTML = `<h3> ${cantTotInv} </h3>`;

            let cantPagCapital = document.querySelector('#cantPagCapital');
            let cantPagCapitalF = parseFloat(inversionista[0].cantpagadacapital);
            cantPagCapitalF = cantPagCapitalF.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });
            cantPagCapital.innerHTML = `<h3> ${cantPagCapitalF} </h3>`;
            getBanks(true, inversionista[0].icvebanco, '');
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
    invedad, invtelefono, invinteres, invcantinvertida,
    invtipocuenta, invinstbancaria, invctabancaria,
    invemail, invDateRegister) => {

    invcantinvertida = invcantinvertida.substring(4);
    invcantinvertida = invcantinvertida.replace(/,/g, '');

    let params =
        'operation=create' +
        '&invnombre=' + invnombre +
        '&invapaterno=' + invapaterno +
        '&invamaterno=' + invamaterno +
        '&invedad=' + invedad +
        '&invtelefono=' + invtelefono +
        '&invinteres=' + invinteres +
        '&invcantinvertida=' + invcantinvertida +
        '&invtipocuenta=' + invtipocuenta +
        '&invinstbancaria=' + invinstbancaria +
        '&invctabancaria=' + invctabancaria +
        '&invemail=' + invemail +
        '&invDateRegister=' + invDateRegister;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
        } else {
            console.error('Error al insertar el Inversionista');
        }
    };
    xhr.send(params);
};

const verifInsInsvestor = (
    invnombre,
    invapaterno,
    invamaterno,
    invedad,
    invtelefono,
    invinteres,
    invcantinvertida,
    invtipocuenta,
    invinstbancaria,
    invctabancaria,
    invemail,
    invDateRegister
) => {
    let params =
        'operation=rowCount' +
        '&invnombre=' + invnombre +
        '&invapaterno=' + invapaterno +
        '&invamaterno=' + invamaterno;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
            console.table(inversionista);
            if (!inversionista[0]) {
                insertInvestor(
                    invnombre, invapaterno, invamaterno,
                    invedad, invtelefono, invinteres, invcantinvertida,
                    invtipocuenta, invinstbancaria, invctabancaria,
                    invemail, invDateRegister
                );
                toastr.success('Se inserto el inversionista correctamente');
                setTimeout(() => {
                    location.reload();
                }, 750);
            } else {
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
    udpinvtipocuenta,
    udpinvinstbancaria,
    udpinvctabancaria,
    udpinvemail,
    udpinvDateRegister
) => {
    let params =
        'operation=update' +
        '&udpidcveinvestor=' + udpidcveinvestor +
        '&udpinvnombre=' + udpinvnombre +
        '&udpinvapaterno=' + udpinvapaterno +
        '&udpinvamaterno=' + udpinvamaterno +
        '&udpinvedad=' + udpinvedad +
        '&udpinvtelefono=' + udpinvtelefono +
        '&udpinvtipocuenta=' + udpinvtipocuenta +
        '&udpinvinstbancaria=' + udpinvinstbancaria +
        '&udpinvctabancaria=' + udpinvctabancaria +
        '&udpinvemail=' + udpinvemail +
        '&udpinvDateRegister=' + udpinvDateRegister;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            toastr.success('Registro actualizado correctamente');
            setTimeout(() => {
                getInvestors();
                $("#modalEditar").modal("hide");
            }, 650);
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

            const tInversionistas = document.getElementById('totalInvestors');
            tInversionistas.innerHTML = data[0].total;
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

            const totalCapitalInv = document.getElementById('totalInvestorsCapital');
            let totalCapital = parseFloat(data[0].capital);
            let cantidadFormateada = totalCapital.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });

            data[0].capital == null ? totalCapitalInv.innerHTML = `$ 0.00` : totalCapitalInv.innerHTML = cantidadFormateada;
        } else {
            console.error('Error al ejecutar el metodo total de inversionistas');
        }
    };
    xhr.send(`operation=totalCapital`);
}


/**
 * @param {HTMLSelectElement} selectBanco //* Select que trae la lista de bancos HTML
 * @param {boolean} op //* Operacion para cargar el catálogo de bancos
 * @param {number} idbank //* Clave del banco
 * @param {String} bankdesc //* Descripción larga del banco
 */
const getBanks = async (selectBanco, op = false , idbank = null, bankdesc = null) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'operation=readbanks'
        });

        if (!response.ok) {
            throw new Error('Error al leer las categorías');
        }

        const banks = await response.json();

        selectBanco.innerHTML = `<option value="">SELECCIONE BANCO</option>` +
            banks.map(bank => `<option value="${bank.icvebanco}">${bank.cnombrebanco}</option>`).join('');

        if (op) {
            selectBanco.innerHTML += banks.map(bankUDP => `<option value="${bankUDP.icvebanco}">${bankUDP.cnombrebanco}</option>`).join('');
        }
    } catch (error) {
        console.error(error.message);
    }
}


const getInterestInvesment = async () => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'operation=getInterests'
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud para recuperar los intereses del catalogo');
        }

        const dataInterest = await response.json();
        selectInterests.innerHTML = ``;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'SELECCIONE INTERES';
        selectInterests.appendChild(defaultOption);

        dataInterest.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.icvetasascomisiones;
            option.textContent = `Descripcion: ${interest.cdescripciontascom} -> ${interest.ftasainteres}`;
            selectInterests.append(option);

        });

    } catch (error) {
        throw new Error(`Error al leer los registro del catalogo de intereses ${error.message}`);
    }
}


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
    getBanks(true, selectBanco);
    $('#modalBorrarCliente').modal('show');
};

getInvestors();
totalInvestors();
totalCapital();



