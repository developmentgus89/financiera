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

