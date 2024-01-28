const baseURL2 = '../Controllers/BanksAccountsController.php';

const btnAddDataBank = document.getElementById('btnAddDataBank');

btnAddDataBank.addEventListener('click', () => {
    $('#modalSeeDataBank').modal('hide');
    $('#modalAddDataBank').modal('show');
});



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

        new DataTable(tblBankAccounts, {
            data: {
                // headings: Object.keys(data[0]),
                headings: ['Banco', 'Numero de Cuenta', 'Observaciones'],
                data: data.map(function (item) {
                    // return Object.values(item);                
                    return [
                        item['cnombrebanco'],
                        item['cnumcuenta'],
                        item['cobservaciones']
                    ]
                })
            }
        });
    } catch (error) {
        throw new Error(`No se pueden obtener las cuentas bancarias ${error.message}`);
    }

}


