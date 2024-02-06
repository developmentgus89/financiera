
export const moduleAccountsBanks = (() => {
    const baseURL = '../Controllers/BanksAccountsController.php';

    const getAccountsBanks = async (icveinversionista) => {
        try {
            const data = await getDataAccountsBanks(icveinversionista);
            return data;
        } catch (error) {
            throw new Error(`Error al dibujar la tabla de las cuentas del inversionista ${error.message}`);
        }
    }

    /**
     * 
     * @param {number} icveinversionista 
     * @returns Promise
     */
    const getDataAccountsBanks = async (icveinversionista) => {
        let params = 'operation=getBanksAccounts'+
                     '&icveinversionista=' + icveinversionista;
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });

            const data = await response.json();
            return data;

        } catch (error) {
            throw new Error(`Error en la solicitud de datos de cuenta bancaria ${error.message}`);
        }
    }

    return {
        obtenerCuentas: getAccountsBanks
    };

})();