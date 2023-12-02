//Constante de Declaracion para la base Url
const baseURL = '../Controllers/InvestorsController.php';

// document.addEventListener('',);

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

$('#inputMontoInver').inputmask('currency', {
  radixPoint: '.',
  groupSeparator: ',',
  allowMinus: false,
  autoGroup: true,
  prefix: 'MXN ',
  digits: 2,
  rightAlign: false
});

$('#udpinputMontoInver').inputmask('currency', {
  radixPoint: '.',
  groupSeparator: ',',
  allowMinus: false,
  autoGroup: true,
  prefix: 'MXN ',
  digits: 2,
  rightAlign: false
});

//Eventos de modales
$("#m-confirm-pay").on('hidden.bs.modal', function () {
  // location.reload();
});

//Declaracion de variables para los botones y campos globales

const btnAddInversion = document.querySelector("#btnAddInversion");
const btnSaveInvesments = document.querySelector("#btnSaveInvesments");
const btnSaveUpdateInvesmentsDetail = document.querySelector('#btnSaveUpdateInvesmentsDetail');
const btnSaveDocument = document.querySelector('#btnSaveDocument');
const btnSeeBankData = document.querySelector('#seeBankData');

//Declaracion de las pestagnas

const panelPagos = document.getElementById('custom-tabs-pays');

//Declaracion para los selects
const selectInterest = document.getElementById('udpicveinteres');
const sInpuInterest = document.getElementById('inputInteres');
const selInversiones = document.getElementById('selInversiones');
const selDetailsPaysInterest = document.getElementById('selInversionesPays');


//Funciones generales
const descifra = () => {
  const queryParams = new URLSearchParams(window.location.search);

  if (queryParams.has('cveinvestors')) {
    const paramEncriptado = decodeURIComponent(queryParams.get('cveinvestors'));
    var paramDescript = CryptoJS.AES.decrypt(paramEncriptado, 'financiera').toString(CryptoJS.enc.Utf8);

    const params = JSON.parse(paramDescript);
    getInterests();
    getInvestment(params.icveinvestor);
    getInvestmentDetails(params.icveinvestor);
    getInvestmentsByInvestor(params.icveinvestor);
    document.getElementById('fieldicveinversionista').value = params.icveinvestor;
  }

  console.log(`Parametros son: ${queryParams}`);
  console.log(`Parametros son: ${queryParams.has('cveinvestors')}`);
  console.table(paramDescript);

}

const getInvestment = async (icveinversionista) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=getRowsInvestments&icveinversionista=${icveinversionista}`
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
    }

    const data = await response.json();
    console.warn(`Datos personales del inversionista`);
    console.table(data);

    document.getElementById('fieldicveinversionista').value = data[0].icveinversionista;

    document.getElementById('idInvestor').innerHTML = `${data[0].cnombre} ${data[0].capaterno} ${data[0].camaterno}`;
    document.getElementById('nameInvestor').innerHTML = `${data[0].cnombre} ${data[0].capaterno} ${data[0].camaterno}`;
    document.getElementById('telephoneInvestor').innerHTML = `${data[0].ctelefono}`;
    document.getElementById('mailInvestor').innerHTML = `${data[0].cemail}`;

    //Seccion de Datos Bancarios
    let tipoCuenta = '';
    switch (data[0].itipocuenta) {
      case '1':
        tipoCuenta = `CLABE`;
        break;

      case '2':
        tipoCuenta = `TARJETA DÉBITO`;
        break;

      case '3':
        tipoCuenta = `CTA BANCARIA`;
        break;

      default:
        tipoCuenta = `Error Tipo Cuenta`;
    }

    document.getElementById('tipoCuenta').innerHTML = tipoCuenta;
    document.getElementById('instBancaria').innerHTML = data[0].cnombrebanco;
    document.getElementById('ctaBancaria').innerHTML = data[0].cuentabancaria;
  } catch (error) {
    throw new Error(`No se pudo completar la consulta de inversiones del inversionista ${error.message}`);
  }
}

const getInvestmentDetails = async (icveinversionista) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=getInvestorStatistics&icveinversionista=${icveinversionista}`
    });

    if (!response.ok) {
      throw new Error(`Error con el servidor, no se puede ejecutar la operacion de estadisticas`);
    }

    const data = await response.json();

    console.warn(`Estadisticas del inversionista`);
    console.table(data);

    let cantTotalInvertida = document.querySelector('#totalCapital');
    let cantTotInv = parseFloat(data[0].totalcapital);
    cantTotInv = cantTotInv.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });

    cantTotalInvertida.innerHTML = cantTotInv;

    document.querySelector('#totalInversiones').innerHTML = data[0].total

  } catch (error) {
    throw new Error(`No se pudo completar las estadisticas del inversionista ${error.message}`);
  }
}

/**
 * 
 * @param {Number} icveinversionista 
 */
const getInvestmentsByInvestor = async (icveinversionista) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=getInvestments&icveinversionista=${icveinversionista}`
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
    }

    const data = await response.json();
    console.warn('Inversiones registradas');
    console.table(data);

    var tblInvestments = document.getElementById('tblInversiones');

    new DataTable(tblInvestments, {
      data: {
        // headings: Object.keys(data[0]),
        headings: ['ID', 'Monto', '% Interes', 'Fec. Registro', 'INTERESES', 'RETIROS', 'EDITAR'],
        data: data.map(function (item) {
          // return Object.values(item);
          var id = item['icvedetalleinver'];
          let cantidadInvertida = parseFloat(item['dmonto']);
          let cantidadFormateada = cantidadInvertida.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          });
          return [
            id,
            cantidadFormateada,
            `${item['ftasainteres']} %`,
            item['dfecharegistro'],
            `<button class="btn bg-gradient-info btn-sx" data-toggle="tooltip" data-placement="top" title="Intereses"><i class="fas fa-money-check"></i></button>`,
            `<button class="btn bg-gradient-primary btn-sx" data-toggle="tooltip" data-placement="top" title="Retiros a Capital"><i class="fas fa-coins"></i></button>`,
            `<button class="btn bg-gradient-warning btn-sx" id="btnEditionInvest" onclick="openEditionInvesment(${id})" data-toggle="tooltip" data-placement="top" title="Editar Datos"><i class="fas fa-edit"></i></button>`
          ]
        })
      }
    });


  } catch (error) {
    throw new Error(`No se pudo completar la consulta de inversiones del inversionista ${error.message}`);
  }
}

/**
 * 
 * @param {Bolean} op 
 */
const getInterests = async (op) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=getInterests`
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud `);
    }

    const interests = await response.json();
    console.table(interests);

    selectInterest.innerHTML = ``;
    sInpuInterest.innerHTML = ``;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'SELECCIONE INTERES';
    selectInterest.appendChild(defaultOption);

    const defaultOption2 = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'SELECCIONE INTERES';
    sInpuInterest.appendChild(defaultOption);

    interests.forEach(interest => {
      const option = document.createElement('option');
      option.value = interest.icvetasascomisiones;
      option.textContent = `${interest.ftasainteres} % --> ${interest.cdescripciontascom}`;
      selectInterest.append(option);

    });

    interests.forEach(interest => {
      const option = document.createElement('option');
      option.value = interest.icvetasascomisiones;
      option.textContent = `${interest.ftasainteres} % --> ${interest.cdescripciontascom}`;
      sInpuInterest.append(option);

    });


  } catch (error) {
    throw new Error(`Error en la solicitud par obtener los interes del catalogo ${error.message}`);
  }
}


/**
* 
* @param {number} icveinvestor 
*/
const openEditionInvesment = async (icvedetalleinver) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=readUDPPago&icvedetalleinver=${icvedetalleinver}`
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud, no se pueden consultar las inversiones ${icveinversionista}`);
    }

    const data = await response.json();

    console.warn('Detalle de la confirmación del pago a inversionista');
    console.table(data);
    document.getElementById('udpcveinverdetalle').value = data[0].icvedetalleinver;
    document.getElementById('udpinputDateInver').value = data[0].dfecharegistro;
    document.getElementById('udpicveinteres').value = data[0].icvetasascomisiones;
    document.getElementById('udpinputMontoInver').value = data[0].dmonto;
    document.getElementById('udpinputObsInver').value = data[0].invdetobservaciones;
    $('#modalEditionInvesment').modal('show');
  } catch (error) {
    throw new Error(`Error en la apertura del modal para modificacion de la inversion ${error.message}`);
  }

};

const updateInvestmentData = async (
  udpcveinverdetalle,
  udpinputDateInver,
  udpicveinteres,
  udpinputMontoInver,
  udpinputObsInver) => {
  let params =
    'operation=update' +
    '&udpcveinverdetalle=' + udpcveinverdetalle +
    '&udpinputDateInver=' + udpinputDateInver +
    '&udpicveinteres=' + udpicveinteres +
    '&udpinputMontoInver=' + udpinputMontoInver +
    '&udpinputObsInver=' + udpinputObsInver;
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `operation=readUDPPago&icvedetalleinver=${icvedetalleinver}`
    });
  } catch (error) {

  }
}

const setNewInvesmentDetail = async (icveinversionista, InputDateInver, InputMontoInver, InputInteres, InputObsInver) => {
  let params =
        'operation=insertAddInvestment' +
        '&icveinversionista=' + icveinversionista +
        '&InputDateInver=' + InputDateInver +
        '&InputMontoInver=' + InputMontoInver +
        '&InputInteres=' + InputInteres +
        '&InputObsInver=' + InputObsInver;
  try {
    //TODO: Continua manana con la creacion de la funcion para la insertar add inversion
  } catch (error) {
    
  }
}

btnSaveUpdateInvesmentsDetail.addEventListener('click', function () {
  const fields = [
    'fieldicveinversionista',
    'setInputDateInver',
    'setInputMontoInver',
    'setIinputInteres',
    'setInputObsInver',
  ];

  const values = {};

  fields.forEach((field) => {
    values[field] = document.getElementById(field).value;
  });

  updateInvestmentData(
    values['udpcveinverdetalle'],
    values['udpinputDateInver'],
    values['udpicveinteres'],
    values['udpinputMontoInver'],
    values['udpinputObsInver']
  );
});

btnSeeBankData.addEventListener('click', function () {
  $('#modalSeeDataBank').modal('show');
});


btnAddInversion.addEventListener('click', function () {
  $('#modalAddInversion').modal('show');
});

btnSaveInvesments.addEventListener('click', function () {
  let icveinversionista = document.getElementById('fieldicveinversionista').value;
  let setInputDateInver = document.getElementById('setInputDateInver');
  let setInputMontoInver = document.getElementById('setInputMontoInver');
  let setInputInteres = document.getElementById('setIinputInteres');
  let setInputObsInver = document.getElementById('setInputObsInver');

  const valFormAddInvestment = () => {
    const fields = [
      { element: setInputDateInver, message: 'Seleccione una fecha.' },
      { element: setInputMontoInver, message: 'Ingrese la cantidad a invertir.' },
      { element: setInputInteres, message: 'Seleccione del catalogo una tasa de interes.' },
      { element: setInputObsInver, message: 'Capture las observaciones.' },
    ];

    let hasError = false;

    for (const field of fields) {
      removeError(field.element);
      if (field.element.value === '' || field.element.value === null) {
        showError(field.element, field.message);
        field.element.focus();
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      removeError(setInputObsInver);
      setNewInvesmentDetail(
        icveinversionista,
        setInputDateInver.value,
        setInputMontoInver.value,
        setInputInteres.value,
        setInputObsInver.value
      );
    }
  }

  valFormAddInvestment();
});


//! Graficos

$(function () {
  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //--------------
  //- AREA CHART -
  //--------------

  // Get context with jQuery - using jQuery's .get() method.
  // var areaChartCanvas = $('#areaChart').get(0).getContext('2d')

  var areaChartData = {
    labels: [
      'Enero', 'Febrero', 'Marzo',
      'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Digital Goods',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: 'Electronics',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  var areaChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        gridLines: {
          display: false,
        }
      }]
    }
  }

  //-------------
  //- LINE CHART -
  //--------------
  var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
  var lineChartOptions = $.extend(true, {}, areaChartOptions)
  var lineChartData = $.extend(true, {}, areaChartData)
  lineChartData.datasets[0].fill = false;
  lineChartData.datasets[1].fill = false;
  lineChartOptions.datasetFill = false

  var lineChart = new Chart(lineChartCanvas, {
    type: 'line',
    data: lineChartData,
    options: lineChartOptions
  })

  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
  var pieData = donutData;
  var pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  new Chart(pieChartCanvas, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  })

  //-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas = $('#barChart').get(0).getContext('2d')
  var barChartData = $.extend(true, {}, areaChartData)
  var temp0 = areaChartData.datasets[0]
  var temp1 = areaChartData.datasets[1]
  barChartData.datasets[0] = temp1
  barChartData.datasets[1] = temp0

  var barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    datasetFill: false
  }

  new Chart(barChartCanvas, {
    type: 'bar',
    data: barChartData,
    options: barChartOptions
  })

  //---------------------
  //- STACKED BAR CHART -
  //---------------------
  var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
  var stackedBarChartData = $.extend(true, {}, barChartData)

  var stackedBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }

  new Chart(stackedBarChartCanvas, {
    type: 'bar',
    data: stackedBarChartData,
    options: stackedBarChartOptions
  })
});


window.addEventListener('load', descifra);