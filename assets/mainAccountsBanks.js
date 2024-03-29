import * as moduleAccBanks from "./Modules/AccountsBanks/opBanksAccounts.js";

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$('#inputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#udpinputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

$('#setInputMontoInver').inputmask('currency', {
    radixPoint: '.',
    groupSeparator: ',',
    allowMinus: false,
    autoGroup: true,
    prefix: 'MXN ',
    digits: 2,
    rightAlign: false
});

//Events Modals

$("#modalAddDataBank").on('shown.bs.modal', () => {
    const selectBanks = document.getElementById('selCatIcveBanco');
    drawCatalogBanks(selectBanks);
    // getBanks(selectBanks);
});

const tblAccountsBanks = document.getElementById('tblAccountsBanks');
const btnReturnInvestor = document.getElementById('btnReturnInvestor');
const btnAddAccountBank = document.getElementById('btnAddAccountBank');
const btnSaveAccountBank = document.getElementById('btnSaveAccountBank');
const btnSaveEditAccountBank = document.getElementById('btnSaveEditAccountBank');

btnReturnInvestor.addEventListener('click', () => {
    let icveinvestor = getParamsInvestor();
    const parametro = { icveinvestor: icveinvestor };
    const paraEncryp = CryptoJS.AES.encrypt(JSON.stringify(parametro), 'financiera').toString();

    window.location.href = `InvestorsDetailsBlade.php?cveinvestors=${encodeURIComponent(paraEncryp)}`;
});

btnAddAccountBank.addEventListener('click', () => {
    $('#modalAddDataBank').modal('show');
});


btnSaveAccountBank.addEventListener('click', () => {
    let icveinversionista = document.getElementById('fieldicveinversionista');
    let selCatIcveBanco = document.getElementById("selCatIcveBanco");
    let numberAccountBank = document.getElementById("numberAccountBank");
    let typeAccountBank = document.getElementById("typeAccountBank");
    let statusAccountBank = document.getElementById("statusAccountBank");
    let observationsAccountBank = document.getElementById("observationsAccountBank");
    let customSwitch3 = document.getElementById("customSwitch3");

    const valFormAddCtaBanks = () => {
        const fields = [
            { element: selCatIcveBanco, message: 'Seleccione el banco de esta cuenta bancaria' },
            { element: numberAccountBank, message: 'Ingrese el número de cuenta.' },
            { element: typeAccountBank, message: 'Seleccione el tipo de cuenta.' },
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
            removeError(typeAccountBank);

            fields.push(
                { element: statusAccountBank, message: null },
                { element: observationsAccountBank, message: null },
                { element: customSwitch3, message: null },
                { element: icveinversionista, message: null }
            )
            addAccountBank(fields);
        }
    }

    valFormAddCtaBanks();

});


btnSaveEditAccountBank.addEventListener('click', () => {
    let icvecuentacveinver         = document.getElementById('icvecuentacveinver');
    let udpselCatIcveBanco         = document.getElementById('udp-selCatIcveBanco');
    let udpnumberAccountBank       = document.getElementById('udp-numberAccountBank');
    let udptypeAccountBank         = document.getElementById('udp-typeAccountBank');
    let udpstatusAccountBank       = document.getElementById('udp-statusAccountBank');
    let udpobservationsAccountBank = document.getElementById('udp-observationsAccountBank');
    let udpcustomSwitch3           = document.getElementById('udp-customSwitch3');
    let udpcveinversionista        = document.getElementById('fieldicveinversionista');

    const valFormAddCtaBanks = () => {
        const fields = [
            { element: udpselCatIcveBanco, message: 'Seleccione el banco de esta cuenta bancaria' },
            { element: udpnumberAccountBank, message: 'Ingrese el número de cuenta.' },
            { element: udptypeAccountBank, message: 'Seleccione el tipo de cuenta.' },
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
            removeError(typeAccountBank);

            fields.push(
                { element: udpstatusAccountBank, message: null },
                { element: udpobservationsAccountBank, message: null },
                { element: udpcustomSwitch3, message: null },
                { element: icvecuentacveinver, message: null },
                { element: udpcveinversionista, message: null }
            )
            editAccountBank(fields);
        }
    }

    valFormAddCtaBanks();
});

/**
 * 
 * @param {Object} fields 
 */
const addAccountBank = async (fields) => {
    let result = await moduleAccBanks.moduleAccountsBanks.insertaCuenta(fields);
    if (result.msj) {
        Swal.fire({
            title: "Cuenta bancaria agregada.",
            text: result.text,
            icon: "success",
            customClass: {
                confirmButton: 'btn btn-success'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#modalAddDataBank').modal('hide');
                location.reload();
            }
        });
    }
}

const editAccountBank = async (fields) => {
    let result = await moduleAccBanks.moduleAccountsBanks.actualizaCuenta(fields);
    if (result.msj) {
        Swal.fire({
            title: "Cuenta actualizada correctamente.",
            text: result.text,
            icon: "success",
            customClass: {
                confirmButton: 'btn btn-success'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#modalEditDataBank').modal('hide');
                location.reload();
            }
        });
    }
}

/**
 * 
 * @returns number | icveinvestor
 */
const getParamsInvestor = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('cveinvestors')) {
        const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
        var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

        var params = JSON.parse(paramDescript);
        document.getElementById('fieldicveinversionista').value = params.icveinvestor;

    }

    return params.icveinvestor;
}

const getAccountsBanks = async () => {
    let instanceTable = null;
    let icveinvestor = getParamsInvestor();
    let tableAccountsBanks = document.getElementById('tblAccountsBanks');

    const accounts = await moduleAccBanks.moduleAccountsBanks.obtenerCuentas(icveinvestor);

    if (instanceTable) {
        instanceTable.destroy();
    }
    //Se dibuja con la tabla
    instanceTable = new DataTable(tableAccountsBanks, {
        data: {
            // headings: Object.keys(data[0]),
            headings: ['Banco', 'Numero de Cuenta', 'Estatus', 'Observaciones', 'Editar', 'Eliminar'],
            data: accounts.map(function (item) {
                // return Object.values(item); 

                return [
                    item['cnombrebanco'],
                    item['cnumcuenta'],
                    item['orden'] == 1 ? `<span class="badge badge-primary">CUENTA PRINCIPAL</span>` : `<span class="badge badge-secondary">HIST.</span>`,
                    item['cobservaciones'],
                    `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Cuenta" onclick="editarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-edit"></i></button>`,
                    `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Desactivar Cuenta" onclick="desactivarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-trash"></i></button>`
                ]
            })
        }
    });
}

/**
 * Se dibuja o carga el catalogo de Bancos en un Select
 */
const drawCatalogBanks = async (element, icvebanco = null) => {
    const banks = await moduleAccBanks.moduleAccountsBanks.obtenerBancos();
    element.innerHTML = ``;
    const optionsHTML = banks.map(bank => {
        if (bank.icvebanco === icvebanco) {
            return `<option value="${bank.icvebanco}" selected>${bank.cnombrebanco}</option>`;
        } else {
            return `<option value="${bank.icvebanco}">${bank.cnombrebanco}</option>`;
        }
    }).join('');

    element.innerHTML = `<option value="">SELECCIONE BANCO</option>` + optionsHTML;
}

/**
 * Global Function hacerClick
 * @param {number} id 
 */
window.editarCuenta = async (id) => {
    const editAccountBank = await moduleAccBanks.moduleAccountsBanks.consultarCuenta(id);
    let selectBanks = document.getElementById('udp-selCatIcveBanco');
    //? Se asigna el Banco de la cuenta.
    drawCatalogBanks(selectBanks, editAccountBank[0].icvebanco);
    let cveinversionista                                         = editAccountBank[0].icveinversionista;
    document.getElementById('icvecuentacveinver').value          = editAccountBank[0].icvecatctasbancoinv;
    document.getElementById('udp-numberAccountBank').value       = editAccountBank[0].cnumcuenta;
    document.getElementById('udp-typeAccountBank').value         = editAccountBank[0].itipocuenta;
    document.getElementById('udp-statusAccountBank').value       = editAccountBank[0].cstatus;
    document.getElementById('udp-observationsAccountBank').value = editAccountBank[0].cobservaciones;
    document.getElementById('udp-customSwitch3').checked         = (editAccountBank[0].orden == 1) ? true : false; 
    $('#modalEditDataBank').modal('show');
}

window.desactivarCuenta = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Deseas eliminar esta cuenta bancaria?",
        text: "Esta cuenta quedará desactivada.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancela la operación!",
        confirmButtonText: "Si!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const resp = await moduleAccBanks.moduleAccountsBanks.eliminaCuenta(id);
            if (resp.msg == 'success') {
                swalWithBootstrapButtons.fire({
                    title: "Desactivada!",
                    text: "Se ha desactivado la cuenta bancaria exitosamente.",
                    icon: "success"
                }).then(result => {
                    if (result.isConfirmed) {
                        // location.reload();
                    }
                });
            }

        }
    });

}


getAccountsBanks();