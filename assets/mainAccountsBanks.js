import * as moduleAccBanks from "./Modules/AccountsBanks/opBanksAccounts.js";

//Constante de Declaracion para la base Url
// const baseURL = '../Controllers/InvestorsController.php';

// document.addEventListener('',);

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
    drawCatalogBanks();
    // getBanks(selectBanks);
});

const tblAccountsBanks = document.getElementById('tblAccountsBanks');
const btnReturnInvestor = document.getElementById('btnReturnInvestor');
const btnAddAccountBank = document.getElementById('btnAddAccountBank');
const btnSaveAccountBank = document.getElementById('btnSaveAccountBank');

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
    let selCatIcveBanco = document.getElementById("selCatIcveBanco");
    let numberAccountBank = document.getElementById("numberAccountBank");
    let typeAccountBank = document.getElementById("typeAccountBank");
    let statusAccountBank = document.getElementById("statusAccountBank");
    let observationsAccountBank = document.getElementById("observationsAccountBank");
    let customSwitch3 = document.getElementById("customSwitch3");

});

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
        console.table(params);

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
            headings: ['Banco', 'Numero de Cuenta', 'Observaciones', 'Editar', 'Eliminar'],
            data: accounts.map(function (item) {
                // return Object.values(item);                
                return [
                    item['cnombrebanco'],
                    item['cnumcuenta'],
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
const drawCatalogBanks = async () => {
    const banks = await moduleAccBanks.moduleAccountsBanks.obtenerBancos();
    let selectBanks = document.getElementById('selCatIcveBanco');
    selectBanks.innerHTML = `<option value="">SELECCIONE BANCO</option>` +
        banks.map(bank => `<option value="${bank.icvebanco}">${bank.cnombrebanco}</option>`).join('');
    console.table(banks);
}

/**
 * Global Function hacerClick
 * @param {number} id 
 */
window.editarCuenta = (id) => {
    console.info(`Hacer clik en el boton con el id ${id}`);
}

window.desactivarCuenta = (id) => {
    console.warn(`Se esta desactivando la cuenta con numero ${id}`);
}


getAccountsBanks();