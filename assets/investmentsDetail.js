//Constante de Declaracion para la base Url
const URL = '../Controllers/InvestorsController.php';

//Eventos de modales


//Declaracion de variables para los botones

const btnAddInversion = document.querySelector("#btnAddInversion");

//Funciones generales

const descifra = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if(queryParams.has('cveinvestors')){
        const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
        var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

        const params = JSON.parse(paramDescript);
        console.log(`Dentro del IF ${queryParams}`);
        
        // document.getElementById('cveinversionista').innerHTML= `CVE: ${params.icveinvestor}`;
        readPersonInvestor(params.icveinvestor);
        getDetailsInvestor(params.icveinvestor);
    }

    console.log(`Parametros son: ${queryParams}`);
    console.log(`Parametros son: ${queryParams.has('cveinvestors')}`);
    console.table(paramDescript);
}

/**
 * 
 * @param {number} icveinvestor 
 */
const readPersonInvestor = ( icveinvestor ) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const inversionista = JSON.parse(xhr.responseText);
            console.table(inversionista);

            document.getElementById('selInvNombre').value = inversionista[0].cnombre;
            document.getElementById('selInvAPaterno').value = inversionista[0].capaterno;
            document.getElementById('selInvAMaterno').value = inversionista[0].camaterno;
            document.getElementById('selInvEdad').value = inversionista[0].iedad;
            document.getElementById('selInvTelefono').value = inversionista[0].ctelefono;
            document.getElementById('selInvCapInv').value = inversionista[0].fcantidadinvertida;
       
            let cantTotalInvertida = document.querySelector('#cTotalInvertida');
            let cantTotInv = parseFloat(inversionista[0].fcantidadinvertida);
            cantTotInv = cantTotInv.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });

            cantTotalInvertida.innerHTML = `${cantTotInv}`;

            let cantPagCapital = document.querySelector('#cPagCapital');
            let cantPagCapitalF = parseFloat(inversionista[0].cantpagadacapital);
            cantPagCapitalF = cantPagCapitalF.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });
            cantPagCapital.innerHTML = cantPagCapitalF;

            let cantPendCapital = document.querySelector('#cPendCapital');
            let cantPendCapResto = parseFloat(inversionista[0].fcantidadinvertida) - parseFloat(inversionista[0].cantpagadacapital);
            cantPendCapResto = cantPendCapResto.toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            });

            cantPendCapital.innerHTML = cantPendCapResto;
        } else {
            console.error('Error al leer el Inversionista');
        }
    };
    xhr.send(`operation=row&id=${icveinvestor}`);
}

/**
 * 
 * @param {number} icveinvestor 
 */

const getDetailsInvestor = ( icveinvestor) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.warn('Detalle de inversionistas');
            console.table(data);
            var tableInvestors = document.querySelector('#tableInvestorsDetails');
            new DataTable(tableInvestors, {
                data: {
                    // headings: Object.keys(data[0]),
                    headings: ['No.','Fecha Inversion', 'Monto', 'Estatus', 'Tipo de Operación', 'Observaciones'],
                    data: data.map(function (item) {
                        // return Object.values(item);
                        let count = 0;
                        count ++;
                        var id = item['icvedetalleinver'];
                        let cantidadInvertida = parseFloat(item['dmonto']);
                        let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX',{
                            style: 'currency',
                            currency: 'MXN'
                        });
                        return [
                            
                            count,
                            item['dfecharegistro'],
                            cantidadFormateada,
                            item['cstatus'] == 'A' ? 'ACTIVO' : 'INACTIVO',
                            item['invtipooperacion'] == 'I' ? 'INGRESO': 'EGRESO',
                            item['invdetobservaciones'],
                            // `<button class="btn bg-gradient-info btn-sm" data-toggle="tooltip" data-placement="top" title="Inversiones" onclick="openDetailInv(${id})"><i class="fas fa-money-check"></i></button>`, 
                            // `<button class="btn bg-gradient-success btn-sm" data-toggle="tooltip" data-placement="top" title="Editar Datos" onclick="readRowInvestor(${id})"><i class="fas fa-edit"></i></button>`
                        ]
                    })
                }
            });
        } else {
            console.error('Error al leer los Inversionistas');
        }
    };
    xhr.send(`operation=readdetails&icveinves=${icveinvestor}`);
    console.log('Estoy entrando a la otra función');
};

//Funciones para botones

btnAddInversion.addEventListener('click', function(){
    $('#modal-add-inversion').modal('show');
});

window.addEventListener('load', descifra);