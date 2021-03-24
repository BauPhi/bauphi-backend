const knex = require('../../dbfunctions/dbControls');
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

    }

    hideFields(key,value){
        if (key=="password") return undefined;
        else return value;
    }

    async login(reqBody, params){

        let user = "";
        let isValid = false;
        return await knex('users').select({'email':reqBody.email})
        .then(function(user) {
            isValid = (user[0].password === reqBody.password);
    
            if(isValid){
                const safeUser = user;
                var start_time = new Date(new Date().getTime())
                var expire_time = new Date(new Date().getTime() + (12*60*60*1000))
    
                sampleLoginResponse = {
                    status: "SUCCESS",
                    message: "login is successful",
                    user: safeUser,
                    session: {
                        start_time: start_time.toString(),
                        expire_time: expire_time.toString(),
                        session_key: "admin"
                    }
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
        )
        // check if login request is valid
        
    }
        

    async getAllUsers(reqBody, params){

        const users = await knex('users').select().then()
        let sampleUsersResponse = {
            status: "SUCCESS",
            message: "all users are listed",
            users: users
        }

        return sampleUsersResponse;
    }

    async getUser(reqBody, params){
        let sampleGetUserResponse = {}
        // check if request is valid
        return knex('users').select({'user_id':params.id})
        .then(function() {
            
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
        }).catch((err) => console.log(err));
        
    }

    async addUser(reqBody, params){

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("name" && "surname" && "password" && "email" && "phone") && fields.length < 6

        let sampleAddUserResponse = "";
        if(fieldCheck){
        db.knex('users').insert(reqBody).then();
            sampleAddUserResponse = {
                status: "SUCCESS",
                message: "new user is added(sample)",
                user: {
                    //user_id: Math.floor(Math.random()*100 +1).toString(),
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

    async deleteUser(reqBody, params){
        
        // check if request is valid
        //const user = this.safeUsers.find(x => x.user_id === params.id);

        let sampleDeleteUserResponse = {}
        return sampleDeleteUserResponse = await knex('users').where('user_id', params.id).delete()
        .then(function() {
            if(user.user){
                sampleDeleteUserResponse = {
                    status: "SUCCESS",
                    message: "user is deleted",
                    user: user.user
                }
            }
            else{
                sampleDeleteUserResponse = {
                    status: "FAILURE",
                    message: "user is not found"
                }
            }
    
            return sampleDeleteUserResponse;
        });
    }

    async updateUser(reqBody, params){

        // check if request is valid
        //const user = this.dbUsers.find(x => x.user_id === params.id);

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 6
        const user = await this.getUser(reqBody, params);

        let sampleUpdateUserResponse = {}


        if(fieldCheck && user){
            knex('users').where('user_id', params.id).update(reqBody).then();
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