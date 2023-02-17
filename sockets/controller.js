import Users from "../models/users.js";

const users = new Users();

export const socketController = ( socket ) => {

    console.log('Client connected...', socket.id);

    //Listen when a user connects
    socket.on( 'enter-chat', ( user, callback ) => {

        //If there is no name as a payload throw an error
        if( !user.name ){
            return callback({
                error: true,
                message: 'The name is required'
            });
        }
        
        //If the name exists then add it to the list of connected users
        let usersList = users.addUser( socket.id, user.name );

        //Send back the list of users
        callback( usersList );

    });
    
}