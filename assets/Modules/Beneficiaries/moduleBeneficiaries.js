export const moduleBene = (() => {
    const baseURL = '../Controllers/BeneficiariesController.php';

    const getBeneficiaries = (icveinversionista) => {
        let params = 'operation=getBeneficiaries';
        params += '&icveinversionista=' + icveinversionista;
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
        obtenerBenef: getBeneficiaries
    };
})();