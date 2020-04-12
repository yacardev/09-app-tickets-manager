var socket = io();
socket.on('connect', function() {
    console.log('conectado al servidor');
});

//on: escuchar
socket.on('disconnect', function() {
    console.log('conexion perdida.');
});

//emit: envia informacion
socket.emit('sendMsg', {
    user: 'Matias',
    msg: 'Hello World!'
}, function(resp) {
    console.log('response server: ', resp);
});

//escuchar informacion del backend
socket.on('sendMsg', function(data) {
    console.log('Servidor: ', data);
})