
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

    /**
     * 
     * @returns JSON
     */
    const getBanks = async () => {
        try {
            const data = await getDataBanks();
            return data;
        } catch (error) {
            throw new Error(`Error al dibujar el catalogo de instituciones bancarias ${error.message}`);
        }
    }

    /**
     * Consulta de Cuenta Bancaria
     * @param {*} icvecuentabancaria 
     * @returns 
     */
    const getSeeAccountBank = (icvecuentabancaria) => {
        let params = 'operation=getSeeDataAccountBank';
        params += '&icvecuentabancaria=' + icvecuentabancaria;
        return getSeeDataAccountBank(params);
    }


    /**
     * Inserción de cuenta bancaria nueva
     * @param {Object} values 
     * @returns string
     */
    const setAccountBank = ( values ) => {
        let params = 'operation=newAccountBank';
        values.forEach(dataBank => {
            let value;
            if(dataBank.element.type === 'checkbox'){
                value = dataBank.element.checked ? '1': '0';
            }else{
                value = dataBank.element.value;
            }
            params += '&' + dataBank.element.id + '=' + value;
        });

        return setDataAccountBankc(params);
    }

    /**
     * Inhabilita cuenta bancaria
     * @param {number} icveinversionista 
     * @returns 
     */
    const setDeleteAccountBank = ( icvecuentabancaria ) => {
        let params = 'operation=deleteAccountBank';
        params += '&icvecuentabancaria=' + icvecuentabancaria;
        return setDataAccountBankc(params);
    }

    /**
     * Actualizacion de cuenta bancaria nueva
     * @param {Object} values 
     * @returns string
     */
    const setUpdateAccountBank = ( values ) => {
        let params = 'operation=updateAccountBank';
        values.forEach(dataBank => {
            let value;
            if(dataBank.element.type === 'checkbox'){
                value = dataBank.element.checked ? '1': '0';
            }else{
                value = dataBank.element.value;
            }
            params += '&' + dataBank.element.id + '=' + value;
        });

        return setDataAccountBankc(params);
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


    const getSeeDataAccountBank = async(params) => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });

            if (!response.ok) {
                throw new Error('Error al leer la cuenta bancaria.');
            }

            const banks = await response.json();

            return banks;

        } catch (error) {
            console.error(`Error en la consulta de la cuenta bancaria: ${error.message}`);
        }
    }

    /**
     * 
     * @param {String} params 
     * @returns JSON
     */
    const setDataAccountBankc = async( params ) =>{
        const response = await fetch(baseURL,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if(!response.ok){
            throw new Error(`No se puede insertar la cuenta bancaria`);
        }

        const data = await response.json();

        return data;
    }


    return {
        obtenerCuentas:  getAccountsBanks,
        obtenerBancos:   getBanks,
        insertaCuenta:   setAccountBank,
        eliminaCuenta:   setDeleteAccountBank,
        consultarCuenta: getSeeAccountBank,
        actualizaCuenta: setUpdateAccountBank
    };

})();