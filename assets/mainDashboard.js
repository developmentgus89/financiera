//Manejo de Notificaciones en el Dash Board
$(function (){
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
        
        document.getElementById('totalClientes').textContent = `${ data[0].total}`;

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
        
        document.getElementById('totalInversionistas').textContent = `${ data[0].total}`;

    } catch (error) {
        throw new Error(`No se puede obtener el conteo de clientes: ${error.message}`);
    }
}

getCountClients();
getCountInvestors();

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