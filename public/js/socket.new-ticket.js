//comando para establecer conexion:
var socket = io();

var label = $('#lblNuevoTicket');

//on: escuchar
socket.on('connect', function() {
    console.log('conectado al servidor');
});

//on: escuchar
socket.on('disconnect', function() {
    console.log('conexion perdida.');
});

socket.on('currentTicket', function(resp) {
    console.log('currentTicket' + resp.currentTicket);
    label.text(`Ticket: ${resp.currentTicket}`);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('eNextTicket', null, function(nextTicket) {
        label.text(`Ticket: ${nextTicket}`);
    });

});