//comando para establecer conexion:
var socket = io();

var searchParms = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParms.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Escritorio es obligatorio.');
}

var desk = searchParms.get('escritorio');
console.log('escritorio: ' + desk);
$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {
    socket.emit('servTicket', { escritorio: desk }, function(resp) {
        console.log(resp);

        if (!resp.num) {
            alert('No hay Tickets pendientes');
            label.text('No hay Tickets pendientes');
            return;
        } else {
            label.text('Ticket ' + resp.num);
        }

    });


})