
//Params from the URL
const paramsURL = new URLSearchParams( window.location.search );

const userName = paramsURL.get('name');
const chatRoom = paramsURL.get('chat-room');

//HTML References in the html
const divUsers = document.querySelector('#divUsers');
const formSend = document.querySelector('#formSend');
const txtMessage = document.querySelector('#txtMessage');
const divChatbox = document.querySelector('#divChatbox');

//Function to render users
function renderUsers( users ) { //[{}, {}, {}]

    let html = `
        <li class="animated fadeIn">
            <a href="javascript:void(0)" class="active"> Chat room: <span>${ chatRoom }</span></a>
        </li>    
    `;

    for( let i = 0; i < users.length; i++){
        html += `
            <li >
                <a data-id="${users[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>
            </li>
        `
    }

    divUsers.innerHTML = html;

}

//Function to render messages in the html
function renderMessages( message, myMessage ) {
    let html = '';
    const date = new Date( message.date );
    const hour = date.getHours() + ':' + date.getMinutes();

    const adminClass = ( message.name === 'Admin' ) ? 'danger' : 'info';
    const image = ( message.name !== 'Admin' ) ? '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>' : '<div></div>';
    
    //If it's my message then show it on the right else show it on the left
    if( myMessage ){
        html = `
            <li class="reverse">
                <div class="chat-content">
                    <h5>${message.name}</h5>
                    <div class="box bg-light-inverse">${message.message}</div>
                </div>
                <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                <div class="chat-time">${hour}</div>
            </li>
        `
    }else{
        html = `
            <li class="animated fadeIn">
                ${image}
                <div class="chat-content">
                    <h5>${message.name}</h5>
                    <div class="box bg-light-${adminClass}">${message.message}</div>
                </div>
                <div class="chat-time">${hour}</div>
            </li>
        `
    }

    //Inserts data below the previous element in the html without delete it
    divChatbox.insertAdjacentHTML( 'beforeend', html );
}

//Function to scroll to the bottom when a message is sent
//Use JQuery to use this function
// function scrollBottom() {

//     // selectors
//     var newMessage = divChatbox.children('li:last-child');

//     // heights
//     var clientHeight = divChatbox.prop('clientHeight');
//     var scrollTop = divChatbox.prop('scrollTop');
//     var scrollHeight = divChatbox.prop('scrollHeight');
//     var newMessageHeight = newMessage.innerHeight();
//     var lastMessageHeight = newMessage.prev().innerHeight() || 0;

//     if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//         divChatbox.scrollTop(scrollHeight);
//     }
// }

//Listeners
//Listener for the user on the left of the screen when is selected
divUsers.addEventListener( 'click', ( e ) => {
    if( e.target.dataset.id ){
        console.log(e.target.dataset.id);
    }
});

//Listener when the form is submitted
formSend.addEventListener( 'submit', ( e ) => {
    e.preventDefault();

    const message = txtMessage.value;

    if( message.trim().length === 0 ){
        return;
    }

    //Send the message after submit the form
    socket.emit('create-message', { user: userName, message }, ( message ) => {
        txtMessage.value = '';
        renderMessages( message, true );
        // scrollBottom();
    });

});