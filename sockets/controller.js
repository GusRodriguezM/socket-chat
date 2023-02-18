import Users from "../models/users.js";
import { createMessage } from "../utils/utils.js";

const users = new Users();

export const socketController = ( socket ) => {

    console.log('Client connected...', socket.id);

    //Listen when a user connects
    socket.on( 'enter-chat', ( user, callback ) => {

        //If there is no name as a payload throw an error
        if( !user.name || !user.chatRoom ){
            return callback({
                error: true,
                message: 'The name is required'
            });
        }

        //Joins to an specified room
        socket.join( user.chatRoom );
        
        //If the name exists then add it to the list of connected users
        users.addUser( socket.id, user.name, user.chatRoom );

        //This event will be fired when an user connects or disconnects from the chat
        socket.broadcast.to( user.chatRoom ).emit( 'users-list', users.getUsersByChatRoom( user.chatRoom ) );

        //Send back the list of users connected to a specific room
        callback( users.getUsersByChatRoom( user.chatRoom ) );

    });

    //Send a message to all the users
    socket.on( 'create-message', ( data ) => {

        //Get the user by the id
        let user = users.getUserById( socket.id );

        //We create a message with the data and the user's info
        let message = createMessage( user.name, data.message );

        //Then we send to everyone that is connected
        socket.broadcast.to( user.chatRoom ).emit( 'create-message', message );
    });

    //Listen when an user disconnects
    socket.on( 'disconnect', () => {
        //Delete the user from the list when disconnects
        let deletedUser = users.deleteUser( socket.id );

        //Send a message to all the users to notify another user left the chat
        socket.broadcast.to( deletedUser.chatRoom ).emit( 'create-message', createMessage( 'Admin', `${deletedUser.name} left the chat` ) );

        //Send the list of connected users when an user disconnects
        socket.broadcast.to( deletedUser.chatRoom ).emit( 'users-list', users.getUsersByChatRoom( deletedUser.chatRoom ) );
    });

    //Private message from the client
    socket.on( 'private-message', ( data ) => {
        //Get the user by the id
        let user = users.getUserById( socket.id );
        //with to we can specify the user we want to send the message
        socket.broadcast.to( data.to ).emit( 'private-message', createMessage( user.name, data.message ) );
    });
    
}