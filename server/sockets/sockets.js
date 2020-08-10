const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('io.on-connection');
    client.on('eNextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log('Siguiente ticket: ' + nextTicket);
        callback(nextTicket);
    });

    client.emit('currentTicket', {
        currentTicket: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });


    client.on('servTicket', (data, callback) => {
        console.log('client.on');
        if (!data.escritorio) {
            return callback({
                ok: false,
                err: { msg: 'No se envio desktop a servir.' }
            })
        }

        let servTicket = ticketControl.setTicketDesktop(data.escritorio);
        callback(servTicket);

        //actualizar/notificar cambios en los ultimos 4
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        });
    });










    /*
    console.log('usuario conectado.');

    client.emit('sendMsg', { user: 'Admin', msg: 'Bienvenido!' });

    client.on('disconnect', () => {
        console.log('usuario desconectado.');
    });

    //escucha mensaje del cliente
    client.on('sendMsg', (data, callback) => {
        console.log(data);
        client.broadcast.emit('sendMsg', data);
        //if (msg.user) {
        //    callback({
        //        resp: 'OK'
        //    })
        //} else {
        //    callback({
        //        resp: 'Error'
        //    })
        //}

    })*/
})