export const moduleBene = (() => {
    const baseURL = '../Controllers/BeneficiariesController.php';

    /**
     * 
     * @param {number} icveinversionista 
     * @returns Promise
     */
    const getBeneficiaries = (icveinversionista) => {
        let params = 'operation=getBeneficiaries';
        params += '&icveinversionista=' + icveinversionista;
        return crudData(params);
    }

    /**
     * 
     * @param {number} icvebeneficiario 
     * @returns 
     */
    const getSingleBeneficiarie = (icvebeneficiario) => {
        let params = 'operation=getSingleBenefi';
        params += '&icvebeneficiario=' + icvebeneficiario;
        return crudData(params);
    }

    /**
     * 
     * @param {number} icveinversionista 
     * @returns 
     */
    const getStatics = (icveinversionista) => {
        let params = 'operation=getBeneficiariesStatics';
        params += '&icveinversionista=' + icveinversionista;
        return crudData(params);
    }

    /**
     * 
     * @param {Array} values 
     * @returns Promise
     */
    const setNewBeneficiaries = ( values ) => {
        let params = 'operation=newBeneficiaries';
        values.forEach(dataBeneficiaries => {
            let value;
            if(dataBeneficiaries.element.type === 'checkbox'){
                value = dataBeneficiaries.element.checked ? '1': '0';
            }else{
                value = dataBeneficiaries.element.value;
            }
            params += '&' + dataBeneficiaries.element.id + '=' + value;
        });

        return crudData(params);
    }

    /**
     * 
     * @param {Array} values 
     * @returns 
     */
    const setUpdateBenefi = ( values ) => {
        let params = 'operation=updateDateBenefi';
        values.forEach(dataBeneficiaries => {
            let value;
            if(dataBeneficiaries.element.type === 'checkbox'){
                value = dataBeneficiaries.element.checked ? '1': '0';
            }else{
                value = dataBeneficiaries.element.value;
            }
            params += '&' + dataBeneficiaries.element.id + '=' + value;
        });

        return crudData(params);
    }

    /**
     * 
     * @param {number} icvebeneficiario 
     * @returns 
     */
    const setDeleteBenefi = ( icvebeneficiario ) => {
        let params = 'operation=setDeleteBenefi';
        params += '&icvebeneficiario=' + icvebeneficiario;
        return crudData(params);
    }

    const crudData = async (params) => {
        try{
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });
    
            if (!response.ok) {
                throw new Error(`No se pueden gestionar los datos del beneficiarios`);
            }
    
            const data = await response.json();
            return data;
        }catch(error){
            throw new Error(`Error en la solicitud contacte a su administrador ${error.message}`);
        }
        
    }

    return {
        obtenerBenef:     getBeneficiaries,
        insertarBenef:    setNewBeneficiaries,
        obtEstadisticas:  getStatics,
        beneficiariorow:  getSingleBeneficiarie,
        actualizarBenefi: setUpdateBenefi,
        eliminaBenefi:    setDeleteBenefi
    };
})();