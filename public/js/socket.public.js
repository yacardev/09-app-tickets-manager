//comando para establecer conexion:
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesk1 = $('#lblEscritorio1');
var lblDesk2 = $('#lblEscritorio2');
var lblDesk3 = $('#lblEscritorio3');
var lblDesk4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4,
];
var lblDesks = [lblDesk1,
    lblDesk2,
    lblDesk3,
    lblDesk4,
];


socket.on('currentTicket', function(data) {
    console.log('currentTicket');
    console.log(data);
    updateHTML(data.last4);

});
//ultimos 4
socket.on('last4', function(data) {
    console.log('last4');
    console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.last4);
});

function updateHTML(last4) {
    console.log('updateHTML');
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].num);
        lblDesks[i].text('Escritorio ' + last4[i].desk);
    }
}