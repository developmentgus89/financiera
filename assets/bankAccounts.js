const baseURL2 = '../Controllers/BanksAccountsController.php';

const btnAddDataBank = document.getElementById('btnAddDataBank');

btnAddDataBank.addEventListener('click', () => {
    $('#modalSeeDataBank').modal('hide');
    $('#modalAddDataBank').modal('show');
});

const selCatIcveBanco = document.getElementById('selCatIcveBanco');

//Se crea la instancia de la Tabla

let tblBankAccountsInstance = null;


export const getBanksAccounts = async (cveinversionista) => {
    try {
        const response = await fetch(baseURL2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `operation=getBanksAccounts&icveinversionista=${cveinversionista}`
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${cveinversionista}`);
        }

        const data = await response.json();
        console.warn(`Control de Cuentas Bancarias`);
        console.table(data);

        const tblBankAccounts = document.getElementById("tblBankAccounts");

        if(tblBankAccountsInstance){
            tblBankAccountsInstance.destroy();
        }

        tblBankAccountsInstance = new DataTable(tblBankAccounts, {
            data: {
                // headings: Object.keys(data[0]),
                headings: ['Banco', 'Numero de Cuenta', 'Observaciones','Editar','Eliminar'],
                data: data.map(function (item) {
                    // return Object.values(item);                
                    return [
                        item['cnombrebanco'],
                        item['cnumcuenta'],
                        item['cobservaciones'],
                        `<button id="btnEditAccountBank" class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" att-gus="${item['icvecatctasbancoinv']}"><i class="fas fa-edit"></i></button>`,
                        `<button id="btnDeleteAccountBank" class="btn bg-gradient-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" att-gus="${item['icvecatctasbancoinv']}"><i class="fas fa-trash"></i></button>`
                    ]
                })
            }
        });
    } catch (error) {
        throw new Error(`No se pueden obtener las cuentas bancarias ${error.message}`);
    }

}

/**
 * Catalogo de Bancos
 */
export const getBanksCat = async () => {
    const response = await fetch(baseURL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `operation=getBanksCat`
    });

    if (!response.ok) {
        throw new Error(`Error en la solicitud, no se pueden consultar los bancos desde el catalogo de bancos`);
    }

    const data = await response.json();
    console.warn(`Control de Registros de Bancos desde catalogo`);
    console.info(`Control de Registros de Bancos desde catalogo`);
    console.table(data);

    selCatIcveBanco.innerHTML = ``;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'SELECCIONE BANCO';
    selCatIcveBanco.appendChild(defaultOption);

    data.forEach(banco => {
        const option = document.createElement('option');
        option.value = banco.icvebanco;
        option.textContent = banco.cnombrebanco;
        selCatIcveBanco.append(option);
    });
}

const btnSaveAccountBank = document.getElementById('btnSaveAccountBank');

btnSaveAccountBank.addEventListener('click', () => {
    let icveinversionista = document.getElementById('fieldicveinversionista');
    let selCatIcveBanco = document.getElementById('selCatIcveBanco');
    let numberAccountBank = document.getElementById('numberAccountBank');
    let typeAccountBank = document.getElementById('typeAccountBank');
    let statusAccountBank = document.getElementById('statusAccountBank');
    let observationsAccountBank = document.getElementById('observationsAccountBank');
    let customSwitch3 = document.getElementById('customSwitch3');

    console.warn(`Valor del input`);
    console.info(customSwitch3.checked);

    const validDataAccountBank = () => {
        const fields = [
            { element: selCatIcveBanco, message: 'Seleccione el Banco.' },
            { element: numberAccountBank, message: 'Capture el numero de cuenta.' },
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
            console.warn(`Informacion del arreglo`);

            fields.push(
                { element: statusAccountBank, message: null },
                { element: observationsAccountBank, message: null },
                { element: customSwitch3, message: null },
                { element: icveinversionista, message: null },
            );

           setNewDataBank(fields); //Se manda a llmar a la funcion pero se le manda todo el arreglo //! es muy interesante
        }
    }

    validDataAccountBank();

});
/**
 * 
 * @param {Array} fields 
 */
const setNewDataBank = async (fields) => {
    
    let params = 'operation=newAccountBank';
    fields.forEach(dataBank => {
        let value;

        if(dataBank.element.type === 'checkbox'){
            value = dataBank.element.checked ? '1':'0';
        }
        else{
            value = dataBank.element.value;
        }
        params += '&' + dataBank.element.id + '=' + value;
    });

    console.warn(`String de Params ${params}`);

    //TODO: Validar correctamente la entrada de los datos en el controlador y modelo
    const response = await fetch(baseURL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    if (!response.ok) {
        throw new Error(`Error en la solicitud, no se pueden consultar los bancos desde el catalogo de bancos`);
    }

    const data = await response.json();
    console.warn(`Respueta desde el controlador al insertar la cuenta bancaria`);
    console.table(data);

    if(data.msj){
        toastr.success(data.text,'Correcto');
        setTimeout( async () => {
            let icveinversionista = document.getElementById('fieldicveinversionista');
            getBanksAccounts(icveinversionista);
            $('#modalAddDataBank').modal('hide');
            $('#modalSeeDataBank').modal('show');
            document.getElementById('selCatIcveBanco').value = '';
            document.getElementById('numberAccountBank').value = '';
            document.getElementById('typeAccountBank').value = '';
            document.getElementById('observationsAccountBank').value = '';
            document.getElementById('customSwitch3').checked = false;
            //TODO: Verificar el limpiado del formulario
        }, 650);
        setTimeout(() => {
            
        }, 950);

    }


}

const btnEditAccountBank = document.getElementById('btnEditAccountBank');

btnEditAccountBank.addEventListener('click', () => {
    console.warn(`Hola Btn`);
});

const deleteAccountBank = (id) =>{
    //TODO: Implementar este métoodo

}

export const updateAccountBank = (id) => {
    console.log(`Hola el ID de la cuenta bancaria es: ${id}`);
}