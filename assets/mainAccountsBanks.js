import * as moduleAccBanks from "./Modules/AccountsBanks/opBanksAccounts";

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

const tblAccountsBanks = document.getElementById('tblAccountsBanks');
const btnReturnInvestor = document.getElementById('btnReturnInvestor');
const btnAddAccountBank = document.getElementById('btnAddAccountBank');

btnReturnInvestor.addEventListener('click', () => {
    let icveinvestor = getParamsInvestor();
    const parametro = { icveinvestor: icveinvestor};
    const paraEncryp = CryptoJS.AES.encrypt(JSON.stringify(parametro),'financiera').toString();

    window.location.href = `InvestorsDetailsBlade.php?cveinvestors=${encodeURIComponent(paraEncryp)}`;
});

btnAddAccountBank.addEventListener('click', () => {
    $('#modalAddDataBank').modal('show');
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
                    `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="hacerClick()"><i class="fas fa-edit"></i></button>`,
                    `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="hacerClick(${item['icvecatctasbancoinv']})"><i class="fas fa-trash"></i></button>`
                ]
            })
        }
    });


}

const hacerClick = (id) => {
    alert(`Hacer clik en el boton con el id ${id}`);
}

window.hacerClick = hacerClick;

// window.addEventListener('load', getParamsInvestor);

getAccountsBanks();