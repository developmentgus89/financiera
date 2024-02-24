
import * as moduleBenefs from "./Modules/Beneficiaries/moduleBeneficiaries.js";

//* Loading Params

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


//* 🌃 Events Modals

//* 🔲 Buttons

const btnAddBenefs      = document.getElementById('btnAddBenefs');
const btnReturnInvestor = document.getElementById('btnReturnInvestor');
const btnSaveBenefi     = document.getElementById('btnSaveBenefi');


//* Events Buttons

btnAddBenefs.addEventListener('click', () => {
    $("#modalAddBenefs").modal("show");
});

btnReturnInvestor.addEventListener('click', ( ) => {
    let icveinvestor = getParamsInvestor();
    const parametro = { icveinvestor: icveinvestor };
    const paraEncryp = CryptoJS.AES.encrypt(JSON.stringify(parametro), 'financiera').toString();

    window.location.href = `InvestorsDetailsBlade.php?cveinvestors=${encodeURIComponent(paraEncryp)}`;
});


btnSaveBenefi.addEventListener('click', () => {
    //TODO: Implementa el guardaddo
});

//* 🛠️ Functions  

const getBeneficiaries = async () => {
    let instanceTable = null;
    let icveinvestor = getParamsInvestor();
    let tblBenefs = document.getElementById('tblBenefs');

    const benefs = await moduleBenefs.moduleBene.obtenerBenef(icveinvestor); 

    if (instanceTable) {
        instanceTable.destroy();
    }
    //Se dibuja con la tabla
    instanceTable = new DataTable(tblBenefs, {
        data: {
            // headings: Object.keys(data[0]),
            headings: ['ID', 'Nombre Beneficiario', 'Teléfono', 'Dirección', 'Editar', 'Eliminar'],
            data: benefs.map(function (item) {
                // return Object.values(item); 

                return [
                    item['icvecatinvbenefi'],	
                    item['cnombrebenef'],	
                    item['ctelefonobenef'],	
                    item['cdireccionbenef'],
                    `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Cuenta" onclick="editarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-edit"></i></button>`,
                    `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Desactivar Cuenta" onclick="desactivarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-trash"></i></button>`
                ]
            })
        }
    });
}

//* Window Events
getBeneficiaries();
