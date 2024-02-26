
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
    let icveinvestor  = document.getElementById('fieldicveinversionista');
    let nameBenefi    = document.getElementById("nameBenefi");
    let teleBenefi    = document.getElementById("teleBenefi");
    let direcciBenefi = document.getElementById("direcciBenefi");

    const valFormAddBenefis = () => {
        const fields = [
            { element: nameBenefi, message: 'Ingrese el nombe de la Beneficiario y/p beneficiario' },
            { element: teleBenefi, message: 'Ingrese el número de teléfono.' },
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
            removeError(teleBenefi);

            fields.push(
                { element: direcciBenefi, message: null },
                { element: icveinvestor, message: null }
            )
            addBeneficiaries(fields);
        }
    }

    valFormAddBenefis();
});

//* 🛠️ Functions  

const getStaticsAmount = async () => {
    let icveinvestor = getParamsInvestor();

    // const statics = await moduleBenefs.moduleBene.

}

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
            headings: ['ID', 'Nombre Beneficiario', 'Teléfono', 'Dirección', 'Porcentaje', 'Editar', 'Eliminar'],
            data: benefs.map(function (item) {
                // return Object.values(item); 

                return [
                    item['icvecatinvbenefi'],	
                    item['cnombrebenef'],	
                    item['ctelefonobenef'],	
                    item['cdireccionbenef'],
                    `${item['porcentaje']} %`,
                    `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Cuenta" onclick="editarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-edit"></i></button>`,
                    `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Desactivar Cuenta" onclick="desactivarCuenta(${item['icvecatctasbancoinv']})"><i class="fas fa-trash"></i></button>`
                ]
            })
        }
    });
}

//TODO: Validar la inserción de los datos
const addBeneficiaries = async (fields) => {
    let result = await moduleBenefs.moduleBene.insertarBenef(fields);
    if (result.msj) {
        Swal.fire({
            title: "Envio exitoso.",
            text: result.text,
            icon: "success",
            customClass: {
                confirmButton: 'btn btn-success'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#modalAddBenefs').modal('hide');
                location.reload();
            }
        });
    }
}

//* Window Events
getBeneficiaries();
