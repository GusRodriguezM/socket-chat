
//Client socket
const socket = io();

//Params from the URL
const params = new URLSearchParams( window.location.search );

//If there is no name in the url then redirect to the index.html
if( !params.has('name') || !params.has('chat-room') ){
    window.location = 'index.html';
    throw new Error( 'The user name and the chat room are required' );
}

//Get the name if it exists in the url and the chat room to join
const user = {
    name: params.get( 'name' ),
    chatRoom: params.get( 'chat-room' )
};

//Listen when a users connects to the server
socket.on('connect', () => {
    console.log('Connected to the server');

    //Send the user and receive the response from the server
    socket.emit( 'enter-chat', user, ( res ) => {
        renderUsers( res );
    });
});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('send-message', {
//     user: 'Fernando',
//     message: 'Hello world!'
// }, function(resp) {
//     console.log('server response: ', resp);
// });

// Listen the message when an user left the chat
socket.on('create-message', ( message ) => {
    renderMessages( message );
});

// Listen changes when an user enters or leaves a chat
socket.on( 'users-list', ( users ) => {
    renderUsers( users );
})

//Private messages
//Action when a client send a private message
socket.on( 'private-message', ( message ) => {
    console.log('private message', message);
});