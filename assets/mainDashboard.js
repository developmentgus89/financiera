//Manejo de Notificaciones en el Dash Board
$(function () {
    $('.slider').bootstrapSlider();
    $('#range_2').ionRangeSlider();
});

const baseURL = '../Controllers/DashBoardController.php';

const getCountClients = async () => {

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'operation=countClients'
        });

        if (!response.ok) {
            throw new Error(`No se puede alcanzar el controlador`);
        }

        const data = await response.json();

        document.getElementById('totalClientes').textContent = `${data[0].total}`;

    } catch (error) {
        throw new Error(`No se puede obtener el conteo de clientes: ${error.message}`);
    }
}

const getCountInvestors = async () => {

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'operation=countInvestors'
        });

        if (!response.ok) {
            throw new Error(`No se puede alcanzar el controlador`);
        }

        const data = await response.json();

        document.getElementById('totalInversionistas').textContent = `${data[0].total}`;

    } catch (error) {
        throw new Error(`No se puede obtener el conteo de clientes: ${error.message}`);
    }
}

const getWallets = async () => {
    let tblwallets = document.getElementById('tableWallets');
    let walletChart = document.getElementById('walletChart'); // Canvas para el gráfico
    let walletChartBarras = document.getElementById('walletChartBarras'); // Canvas para el gráfico
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'operation=getWallets'
        });

        if (!response.ok) {
            throw new Error(`No se puede alcanzar el controlador`);
        }

        const data = await response.json();

        console.info('información de las Wallets');
        console.table(data);
        let dsaldo = 0;
        new DataTable(tblwallets, {
            perPage: 3,
            searchable: false,
            data: {
                // headings: Object.keys(data[0]),
                headings: ['Nombre cartera', 'Saldo'],
                data: data.map(function (item) {
                    dsaldo = parseFloat(item['dsaldo']).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                    return [
                        item['cnomcartera'],
                        dsaldo,
                    ]
                })
            }
        });

        // Datos para el gráfico de pastel
        const labels = data.map(item => item['cnomcartera']);
        const saldos = data.map(item => parseFloat(item['dsaldo'])); // Mantener los saldos como números

        // Crear el gráfico de pastel con Chart.js
        new Chart(walletChart, {
            type: 'pie',
            data: {
                labels: labels, // Nombre de las carteras
                datasets: [{
                    label: 'Saldo de las carteras',
                    data: saldos, // Saldos como números
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)', // Azul claro
                        'rgba(75, 192, 192, 0.8)', // Verde claro (para equilibrio)
                        'rgba(153, 153, 153, 0.8)', // Gris claro
                        'rgba(0, 0, 139, 0.8)',     // Azul oscuro
                        'rgba(169, 169, 169, 0.8)', // Gris medio
                        'rgba(0, 0, 255, 0.8)'      // Azul brillante
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',   // Azul claro (borde)
                        'rgba(75, 192, 192, 1)',   // Verde claro (borde)
                        'rgba(153, 153, 153, 1)',   // Gris claro (borde)
                        'rgba(0, 0, 139, 1)',       // Azul oscuro (borde)
                        'rgba(169, 169, 169, 1)',    // Gris medio (borde)
                        'rgba(0, 0, 255, 1)'        // Azul brillante (borde)
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white', // Etiquetas de las leyendas en blanco
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.labels.map((label, index) => {
                                    const saldo = data.datasets[0].data[index];
                                    return {
                                        text: `${label}: ${saldo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`,
                                        fillStyle: data.datasets[0].backgroundColor[index],
                                        hidden: false,
                                        index: index
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw;
                                return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Saldos por Carteras',
                        color: 'white' // Título en blanco
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 2,
                        hoverBorderWidth: 4,
                        hoverBorderColor: 'rgba(255, 255, 255, 0.6)' // Efecto de borde al pasar el mouse
                    }
                }
            }
        });

        // Crear el gráfico de barras con Chart.js
        new Chart(walletChartBarras, {
            type: 'bar',
            data: {
                labels: labels, // Nombre de las carteras
                datasets: [{
                    label: 'Saldo de las carteras',
                    data: saldos, // Saldos como números
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)', // Azul claro
                        'rgba(75, 192, 192, 0.8)', // Verde claro (para equilibrio)
                        'rgba(153, 153, 153, 0.8)', // Gris claro
                        'rgba(0, 0, 139, 0.8)',     // Azul oscuro
                        'rgba(169, 169, 169, 0.8)', // Gris medio
                        'rgba(0, 0, 255, 0.8)'      // Azul brillante
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',   // Azul claro (borde)
                        'rgba(75, 192, 192, 1)',   // Verde claro (borde)
                        'rgba(153, 153, 153, 1)',   // Gris claro (borde)
                        'rgba(0, 0, 139, 1)',       // Azul oscuro (borde)
                        'rgba(169, 169, 169, 1)',    // Gris medio (borde)
                        'rgba(0, 0, 255, 1)'        // Azul brillante (borde)
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white' // Etiquetas de las leyendas en blanco
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw;
                                return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Saldos de las Carteras (Barras)',
                        color: 'white' // Título en blanco
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white' // Etiquetas de los ejes en blanco
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white', // Etiquetas de los ejes en blanco
                            callback: function (value) {
                                return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                            }
                        }
                    }
                },
                elements: {
                    bar: {
                        borderWidth: 2,
                        borderColor: 'rgba(255, 255, 255, 0.6)', // Borde blanco para las barras
                        backgroundColor: function (context) {
                            const index = context.dataIndex;
                            return context.dataset.backgroundColor[index];
                        }
                    }
                }
            }
        });



    } catch (error) {
        throw new Error(`No se puede obtener el conteo de clientes: ${error.message}`);
    }
}






getCountClients();
getCountInvestors();
getWallets();

// toastr.options.onclick = function () { alert('Hola mundo'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.success('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.warning('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.error('Pago de interes pendie ','PAGO PENDIENTE DE INTERES');

// toastr.options.onclick = function () { alert('Hola mundo'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.success('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.warning('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.error('Pago de interes pendiente a inversinista de Nobre ','PAGO PENDIENTE DE INTERES');

// toastr.options.onclick = function () { alert('Hola mundo'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.success('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.warning('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.error('Pago de interes pendiente a inversinista de Nobre E','PAGO PENDIENTE DE INTERES');

// toastr.options.onclick = function () { alert('Hola mundo'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.success('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.warning('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.error('Pago de interes pendiente a inversinista de Nobr','PAGO PENDIENTE DE INTERES');

// toastr.options.onclick = function () { alert('Hola mundo'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.success('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.warning('Haz clic para ir a otra página');

// toastr.options.onclick = function () { alert('Hola mundo warning'); }
// toastr.options.timeOut = 0;
// toastr.options.extendedTimeOut = 0;
// toastr.error('Pago de interes pendiente a inversinista de ','PAGO PENDIENTE DE INTERES');

// Toastify({
//     text: "This is a toast",
//     className: "info",
//     style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//     }
// }).showToast();

// Toastify({
//     text: "This is a toast",
//     className: "info",
//     style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//     }
// }).showToast();

// Toastify({
//     text: "This is a toast with offset",
//     offset: {
//         x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
//         y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
//     },
// }).showToast();