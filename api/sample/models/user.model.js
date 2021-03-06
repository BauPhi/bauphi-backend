class User {

    constructor(){
        this.dbUsers = [
            {
                user_id: "1",
                name: "Gökhan",
                surname: "Bulut",
                email: "gbulut@hotmail.com",
                password: "123",
                phone: "+905055550505",
            },
            {
                user_id: "2",
                name: "Işıl",
                surname: "Güneş",
                email: "igunes@gmail.com",
                password: "456",
                phone: "+905435586504",
            },
            {
                user_id: "3",
                name: "Deniz",
                surname: "Okyanus",
                email: "dokyanus@gmail.com",
                password: "789",
                phone: "+905068476956",
            },
        ]
        this.safeUsers = JSON.parse(JSON.stringify(this.dbUsers, this.hideFields))

        this.sessionKeys = [
            {
                user_id: "1",
                session_key: "st1"
            },
            {
                user_id: "2",
                session_key: "st2"
            },
            {
                user_id: "3",
                session_key: "st3"
            }
        ]
    }

    hideFields(key,value){
        if (key=="password") return undefined;
        else if (key=="session_key") return undefined;
        else return value;
    }

    login(reqBody, params){

        const user = this.dbUsers.find(x => x.email === reqBody.email);

        // check if login request is valid
        const isValid = user.password === reqBody.password;
        
        let sampleLoginResponse = {}

        if(isValid){
            const safeUser = this.safeUsers.find(x => x.email === reqBody.email);

            sampleLoginResponse = {
                status: "SUCCESS",
                message: "login is successful",
                user: safeUser,
                session: this.sessionKeys.find(x => x.user_id === user.user_id)
            }
        }
        else{
            sampleLoginResponse = {
                status: "SUCCESS",
                message: "login has failed"
            }
        }

        return sampleLoginResponse;
    }

    getAllUsers(reqBody, params){

        // get users from db

        let sampleUsersResponse = {
            status: "SUCCESS",
            message: "all users are listed",
            users: this.safeUsers
        }

        return sampleUsersResponse;
    }

    getUser(reqBody, params){
        // SESSION KEY CONTROL
        const key = reqBody.session_key;
        
        // check if request is valid
        const user = this.safeUsers.find(x => x.user_id === params.id);

        let sampleGetUserResponse = {}
        if(user){
            sampleGetUserResponse = {
                status: "SUCCESS",
                message: "user is found",
                user: user
            }
        }
        else{
            sampleGetUserResponse = {
                status: "FAILURE",
                message: "user is not found"
            }
        }

        return sampleGetUserResponse;
    }

    addUser(reqBody, params){

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("name" && "surname" && "password" && "email" && "phone") && fields.length < 6

        let sampleAddUserResponse = "";
        if(fieldCheck){
            // add user to database
            sampleAddUserResponse = {
                status: "SUCCESS",
                message: "new user is added(sample)",
                user: {
                    user_id: Math.floor(Math.random()*100 +1).toString(),
                    name: reqBody.name,
                    surname: reqBody.surname,
                    email: reqBody.email,
                    phone: reqBody.phone
                }
            }
        }
        else{
            // return error message
            sampleAddUserResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }
        

        return sampleAddUserResponse;
    }

    deleteUser(reqBody, params){

        // SESSION KEY CONTROL
        const key = reqBody.session_key;
        
        // check if request is valid
        const user = this.safeUsers.find(x => x.user_id === params.id);

        let sampleDeleteUserResponse = {}
        if(user){
            sampleDeleteUserResponse = {
                status: "SUCCESS",
                message: "user is deleted",
                user: user
            }
        }
        else{
            sampleDeleteUserResponse = {
                status: "FAILURE",
                message: "user is not found"
            }
        }

        return sampleDeleteUserResponse;
    }

    updateUser(reqBody, params){

        // SESSION KEY CONTROL
        const key = reqBody.session_key;

        // check if request is valid
        const user = this.dbUsers.find(x => x.user_id === params.id);

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 7

        let sampleUpdateUserResponse = {}

        if(fieldCheck && user){
            // add user to database
            sampleUpdateUserResponse = {
                status: "SUCCESS",
                message: "user is updated(sample)",
                user: {
                    user_id: params.id,
                    name: reqBody.name,
                    surname: reqBody.surname,
                    email: reqBody.email,
                    phone: reqBody.phone
                }
            }
        }
        else{
            // return error message
            sampleUpdateUserResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateUserResponse;
    }

}

module.exports = User;