
//Params from the URL
const paramsURL = new URLSearchParams( window.location.search );

//HTML References
const divUsers = document.querySelector('#divUsers');

//Functions to render users
function renderUsers( users ) { //[{}, {}, {}]

    let html = `
        <li>
            <a href="javascript:void(0)" class="active"> Chat room: <span>${ paramsURL.get('chat-room') }</span></a>
        </li>    
    `;

    for( let i = 0; i < users.length; i++){
        html += `
            <li>
                <a data-id="${users[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>
            </li>
        `
    }

    divUsers.innerHTML = html;

}