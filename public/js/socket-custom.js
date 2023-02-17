
//Client socket
const socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('send-message', {
    user: 'Fernando',
    message: 'Hello world!'
}, function(resp) {
    console.log('server response: ', resp);
});

// Escuchar información
socket.on('send-message', function(mensaje) {

    console.log('Server:', mensaje);

});