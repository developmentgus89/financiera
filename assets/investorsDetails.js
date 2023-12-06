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

