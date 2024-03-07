
import * as moduleBenefs from "./Modules/Beneficiaries/moduleBeneficiaries.js";

//* Formats Inputs

$('input[type="tel"]').inputmask('[(999) 999-9999]');

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
$("#modalAddBenefs").on("shown.bs.modal", () => {
    let porce = document.getElementById('pnoasignado').textContent;
    Swal.fire({
        title: "Advertencia",
        html: `<h4>Porcentaje disponible para asignar al beneficiario</h4>
                <h3><b>${porce}</b></h3>`,
        icon: "warning"
      });
});

//* 🔲 Buttons

const btnAddBenefs      = document.getElementById('btnAddBenefs');
const btnReturnInvestor = document.getElementById('btnReturnInvestor');
const btnSaveBenefi     = document.getElementById('btnSaveBenefi');
const btnSaveEditBenefi = document.getElementById('btnSaveEditBenefi');


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
    let porcbenefi    = document.getElementById("porcbenefi");

    if(porcbenefi.value == 0 ){
        Swal.fire({
            title: "Advertencia",
            html: `Debe de seleccionar un porcentaje para el beneficiario.`,
            icon: "warning"
          });
          throw new Error (`Selecciona porcentaje`);             
    } 
        

    const valFormAddBenefis = () => {
        const fields = [
            { element: nameBenefi, message: 'Ingrese el nombe de la Beneficiario y/p beneficiario' },
            { element: teleBenefi, message: 'Ingrese el número de teléfono.' },
            { element: porcbenefi, message: 'Para agregar este beneficiario seleccione el porcentaje de beneficio.' },
        ];

        let hasError = false;

        for (const field of fields) {
            removeError(field.element);
            if (field.element.value === '' || field.element.value === null ) {
                showError(field.element, field.message);
                field.element.focus();
                hasError = true;
                break;
            }
        }

        if (!hasError) {
            removeError(porcbenefi);

            fields.push(
                { element: direcciBenefi, message: null },
                { element: icveinvestor, message: null }
            )
            addBeneficiaries(fields);
        }
    }

    valFormAddBenefis();
});

btnSaveEditBenefi.addEventListener('click', () => {
    let udpnameBenefi       = document.getElementById('udpnameBenefi');
    let udpteleBenefi       = document.getElementById('udpteleBenefi');
    let udpdirecciBenefi    = document.getElementById('udpdirecciBenefi');
    let udpporcbenefi       = document.getElementById('udpporcbenefi');
    let udpicvecatinvbenefi = document.getElementById('udpicvecatinvbenefi');

    const  valFormEditBenefis = () => {
        const fields = [
            { element: udpnameBenefi, message: 'Seleccione el banco de esta cuenta bancaria' },
            { element: udpteleBenefi, message: 'Ingrese el número de cuenta.' },
            { element: udpporcbenefi, message: 'Seleccione el tipo de cuenta.' },
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
            removeError(porcbenefi);

            fields.push(
                { element: udpdirecciBenefi, message: null },
                { element: udpicvecatinvbenefi, message: null }
            )
            setUpdateDataBenefi(fields);
        }
    }
    valFormEditBenefis();
});

//* 🛠️ Functions  
/**
 * 
 * @returns number
 */
const getStaticsAmount = async () => {
    let icveinvestor = getParamsInvestor();

    const statics = await moduleBenefs.moduleBene.obtEstadisticas(icveinvestor);

    console.table(statics);

    let asignado     = document.getElementById('pasignado');
    let noasignado   = document.getElementById('pnoasignado');

    asignado.textContent   = `${(statics[0].asignado) == null? 0.00:statics[0].asignado} %`;
    noasignado.textContent = `${(statics[0].noasignado) == null? 100 : statics[0].noasignado } %`;


    if(statics[0].noasignado == 0){
        document.getElementById('btnAddBenefs').disabled = true;

    }

    let barPorcenAsignado   = document.getElementById('porcbenefi');
    let vporcentaje         = document.getElementById('vporcentaje');
    vporcentaje.textContent = `${(statics[0].noasignado) == null? 0.00:statics[0].noasignado} %`;

    barPorcenAsignado.addEventListener('input', () => {
        vporcentaje.textContent = `${barPorcenAsignado.value} %`;
    });

    barPorcenAsignado.max = statics[0].noasignado;
    barPorcenAsignado.value = 0;

    return statics[0].noasignado;
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
            headings: ['ID', 'Nombre Beneficiario', 'Teléfono', 'Porcentaje', 'Editar', 'Eliminar'],
            data: benefs.map(function (item) {
                // return Object.values(item); 

                return [
                    item['icvecatinvbenefi'],	
                    item['cnombrebenef'],	
                    item['ctelefonobenef'],	
                    `${item['porcentaje']} %`,
                    `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Beneficiario" onclick="editarBeneficiario(${item['icvecatinvbenefi']})"><i class="fas fa-edit"></i></button>`,
                    `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Desactivar Beneficiario" onclick="eliminarBeneficiario(${item['icvecatinvbenefi']})"><i class="fas fa-trash"></i></button>`
                ]
            })
        }
    });
}

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

const setUpdateDataBenefi = async (fields) => {
    let result = await moduleBenefs.moduleBene.actualizarBenefi(fields);
    if (result.msj) {
        Swal.fire({
            title: "Beneficiario actualizado correctamente.",
            text: result.text,
            icon: "success",
            customClass: {
                confirmButton: 'btn btn-success'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#modalEditBenefi').modal('hide');
                location.reload();
            }
        });
    }

}

//* Window Events

window.editarBeneficiario = async (id) => {
    const editDataBenefi = await moduleBenefs.moduleBene.beneficiariorow(id);
    console.table(editDataBenefi);
    let udpvporcentaje = document.getElementById("udpvporcentaje");
    document.getElementById('udpicvecatinvbenefi').value = editDataBenefi[0].icvecatinvbenefi;
    document.getElementById('udpnameBenefi').value       = editDataBenefi[0].cnombrebenef;
    document.getElementById('udpteleBenefi').value       = editDataBenefi[0].ctelefonobenef;
    document.getElementById('udpdirecciBenefi').value    = editDataBenefi[0].cdireccionbenef;
    document.getElementById('udpporcbenefi').value       = editDataBenefi[0].porcentaje;
    document.getElementById('udpporcbenefi').max         = (editDataBenefi[0].porcentaje + await getStaticsAmount());
    udpvporcentaje.textContent                           = `${editDataBenefi[0].porcentaje} %`;
    document.getElementById('udpporcbenefi').addEventListener('input', () => {
        udpvporcentaje.textContent = `${document.getElementById('udpporcbenefi').value} %`;
    });
    
    $('#modalEditBenefi').modal('show');
}

window.eliminarBeneficiario = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Deseas eliminar este beneficiario?",
        text: "Este beneficiario quedará eliminado.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancela la operación!",
        confirmButtonText: "Si!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const resp = await moduleBenefs.moduleBene.eliminaBenefi(id);
            if (resp.msg == 'success') {
                swalWithBootstrapButtons.fire({
                    title: "Desactivada!",
                    text: "Se ha desactivado la cuenta bancaria exitosamente!.",
                    icon: "success"
                }).then(result => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }

        }
    });
}

getStaticsAmount();
getBeneficiaries();
