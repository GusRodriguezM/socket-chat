
//Class for the users
class Users {

    constructor() {
        //Array for the users
        this.users = [];
    }

    //Add user to the chat
    addUser( id, name ) {
        let user = { id, name };
        this.users.push( user );
        return this.users;
    }

    //Get an user by the id
    getUserById( id ) {
        let user = this.users.find( user => user.id === id );
        return user;
    }

    //Get all the connected users
    getUsers() {
        return this.users;
    }

    //Get all the users of a specific chat room
    getUsersByChatRoom( chatRoom ) {

    }

    //Delete an user from a chat room
    deleteUser( id ) {
        let deletedUser = this.getUserById( id );
        this.users = this.users.filter( user => user.id !== id );
        return deletedUser;
    }

}

export default Users;