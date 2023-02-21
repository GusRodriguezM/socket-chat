
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
function renderMessages( message ) {
    let html = `
        <li>
            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
            <div class="chat-content">
                <h5>${message.name}</h5>
                <div class="box bg-light-info">${message.message}</div>
            </div>
            <div class="chat-time">10:56 am</div>
        </li>    
    `
    //Inserts data below the previous element in the html without delete it
    divChatbox.insertAdjacentHTML( 'beforeend', html );
}

//Listeners
//Listener for the user on the left of the screen when is selected
divUsers.addEventListener( 'click', ( e ) => {
    if( e.target.dataset.id ){
        console.log(e.target.dataset.id);
    }
});

formSend.addEventListener( 'submit', ( e ) => {
    e.preventDefault();

    const message = txtMessage.value;

    if( message.trim().length === 0 ){
        return;
    }

    socket.emit('create-message', { user: userName, message }, ( message ) => {
        txtMessage.value = '';
        renderMessages( message );
    });

});

