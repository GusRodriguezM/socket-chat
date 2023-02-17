
//Client socket
const socket = io();

//Params from the URL
const params = new URLSearchParams( window.location.search );

//If there is no name in the url then redirect to the index.html
if( !params.has('name') ){
    window.location = 'index.html';
    throw new Error( 'The user name is required' );
}

//Get the name if it exists in the url
const user = {
    name: params.get( 'name' )
};

//Listen when a users connects to the server
socket.on('connect', () => {
    console.log('Connected to the server');

    //Send the user and receive the response from the server
    socket.emit( 'enter-chat', user, ( res ) => {
        console.log( 'Connected users', res );
    });
});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('send-message', {
    user: 'Fernando',
    message: 'Hello world!'
}, function(resp) {
    console.log('server response: ', resp);
});

// Listen the message when an user left the chat
socket.on('create-message', (mensaje) => {

    console.log('Server:', mensaje);

});

// Listen changes when an user enters or leaves a chat
socket.on( 'users-list', ( users ) => {
    console.log( users );
})