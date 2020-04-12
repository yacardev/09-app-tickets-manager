const { io } = require('../server');
io.on('connection', (client) => {
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

    })
})