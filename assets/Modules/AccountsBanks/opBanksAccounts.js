
export const moduleAccountsBanks = (() => {
    const baseURL = '../Controllers/BanksAccountsController.php';
    const baseURL2 = '../Controllers/InvestorsController.php';

    /**
     * 
     * @param {number} icveinversionista 
     * @returns 
     */
    const getAccountsBanks = async (icveinversionista) => {
        try {
            const data = await getDataAccountsBanks(icveinversionista);
            return data;
        } catch (error) {
            throw new Error(`Error al dibujar la tabla de las cuentas del inversionista ${error.message}`);
        }
    }


    const getBanks = async () => {
        try {
            const data = await getDataBanks();
            return data;
        } catch (error) {
            throw new Error(`Error al dibujar el catalogo de instituciones bancarias ${error.message}`);
        }
    }



    /**
     * 
     * @param {number} icveinversionista 
     * @returns Promise
     */
    const getDataAccountsBanks = async (icveinversionista) => {
        let params = 'operation=getBanksAccounts' +
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

    /**
     * 
     * @returns Promise
     */
    const getDataBanks = async () => {
        try {
            const response = await fetch(baseURL2, {
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

            return banks;

        } catch (error) {
            console.error(`Error en la consulta de los bancos: ${error.message}`);
        }
    }

    return {
        obtenerCuentas: getAccountsBanks,
        obtenerBancos: getBanks
    };

})();