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
    console.warn(`openViewPaysInvestment parametros`);
    console.table(params);

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
    console.warn(`openViewPaysInvestment parametros`);
    console.table(params);

    const paramsEncrypt = CryptoJS.AES.encrypt(JSON.stringify(params),'financiera').toString();

    window.location.href = `ViewCapitalPayments.php?params=${encodeURIComponent(paramsEncrypt)}`;
}

