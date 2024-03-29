//? Control de layouts

/**
 * 
 * @param {number} icveinvestor 
 */
const openDetailInv = ( icveinvestor ) => {
    const parametro = { icveinvestor: icveinvestor};
    const paraEncryp = CryptoJS.AES.encrypt(JSON.stringify(parametro),'financiera').toString();

    window.location.href = `InvestorsDetailsBlade.php?cveinvestors=${encodeURIComponent(paraEncryp)}`;
    // window.location.href = `InvestorsDetailsBlade.php?cveinvestors=${icveinvestor}`;
}

/**
 * 
 * @param {number} icveinversionista Es el ID del Inversionista
 * @param {number} icveinvestor Es la clave de insersion
 * @param {number} interes 
 * @param {number} dmonto 
 */
const openViewPaysInvestment = (icveinversionista, icveinvestor, interes, dmonto) => {
    const params = {
        icveinversionista: icveinversionista,
        icveinvestor: icveinvestor,
        interes: interes,
        dmonto: dmonto
    }

    const paramsEncrypt = CryptoJS.AES.encrypt(JSON.stringify(params),'financiera').toString();

    window.location.href = `ViewPaysInvestments.php?params=${encodeURIComponent(paramsEncrypt)}`;

}

/**
 * 
 */
const openViewCapitalPayments = (icveinversionista, icveinvestor) => {
    const params = {
        icveinversionista: icveinversionista,
        icveinvestor: icveinvestor,
    }

    const paramsEncrypt = CryptoJS.AES.encrypt(JSON.stringify(params),'financiera').toString();

    window.location.href = `ViewCapitalPayments.php?params=${encodeURIComponent(paramsEncrypt)}`;
}

/**
 * 
 * @param {number} icveinversionista 
 * @param {number} icveinvestor 
 */
const openEditionInvesment = async (icveinversionista, icveinvestor) =>{
    let params = 'operation=rowReadInvertion';
        params += '&icveinversionista=' + icveinversionista;
        params += '&icveinvestor=' + icveinvestor;

    try {
        const response = await fetch('../Controllers/InvestorsController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const result = await response.json();
        console.table(result);
        document.getElementById('udpcveinverdetalle').value  = result[0].icvedetalleinver;
        document.getElementById('udpcveinversionista').value = result[0].icveinversionista;
        document.getElementById('udpinputDateInver').value   = result[0].dfecharegistro;
        document.getElementById('udpicveinteres').value      = result[0].icvetasascomisiones;
        document.getElementById('udpinputMontoInver').value  = result[0].dmonto;
        document.getElementById('udpinputObsInver').value    = result[0].invdetobservaciones;
        $("#modalEditionInvesment").modal('show');
    } catch (error) {
        throw new Error(`Error en la solicitud para leer el detalle de la inversion ${error.message}`);
    }


}

