const knex = require('../../dbfunctions/dbControls');
class User {

    
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

        return knex('users').select().
        then(function(users) {

        
        let sampleUsersResponse = {
            status: "SUCCESS",
            message: "all users are listed",
            users: users
        }

        return sampleUsersResponse;
    }).catch((err) => {
        sampleGetUserResponse = {
            status: "FAILURE",
            message: "db error"
        }
        console.log(err)
        return sampleGetUserResponse;
    });
    }

    async getUser(reqBody, params){

        let sampleGetUserResponse = {}
        return await knex('users').select().where({'user_id':params.id})
        .then(function(user) {
            if(user.length !== 0){
                sampleGetUserResponse = {
                    status: "SUCCESS",
                    message: "user is found",
                    user: user[0]
                }
            }
            else{
                sampleGetUserResponse = {
                    status: "FAILURE",
                    message: "user is not found"
                }
            }
            
            return sampleGetUserResponse;
        }).catch((err) => {
            sampleGetUserResponse = {
                status: "FAILURE",
                message: "db error"
            }
            console.log(err)
            return sampleGetUserResponse;
        });
        
    }

    async addUser(reqBody, params){

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("name" && "surname" && "password" && "email" && "phone") && fields.length < 6

        let sampleAddUserResponse = "";
        if(fieldCheck){
            return knex('users').insert(reqBody)
            .then(function() {
                sampleAddUserResponse = {
                    status: "SUCCESS",
                    message: "new user is added(sample)",
                    user: {
                        name: reqBody.name,
                        surname: reqBody.surname,
                        email: reqBody.email,
                        phone: reqBody.phone
                    }
                }
                return sampleAddUserResponse;
            })
            .catch((err) => {
                sampleAddUserResponse = {
                    status: "FAILURE",
                    message: "db error"
                }
                console.log(err)
                return sampleAddUserResponse;
            });
            
        }
        else{
            sampleAddUserResponse = {
                status: "FAILURE",
                message: "request fields are wrong"
            }
            return sampleAddUserResponse;
        }
        

        return sampleAddUserResponse;
    }

    async deleteUser(reqBody, params){

        return await knex('users').select().where({'user_id':params.id})
        .then((user) => {
            return knex('users').where('user_id', params.id).delete()
            .then(function(queryResult){
                if(queryResult){
                    return {
                        status: "SUCCESS",
                        message: "user is deleted",
                        user: user
                    }
                }
                else{
                    return {
                        status: "FAILURE",
                        message: "problem at finding user"
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                return {
                    status: "FAILURE",
                    message: "db error"
                }
            });
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db problem at finding user"
            }

        })
    }

    async updateUser(reqBody, params){

        // check if request is valid
        //const user = this.dbUsers.find(x => x.user_id === params.id);

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 6

        let sampleUpdateUserResponse = {}


        if(fieldCheck){
            return await knex('users').where('user_id', params.id).update(reqBody)
            .then((queryResult) => {
                if(queryResult){
                    return {
                        status: "SUCCESS",
                        message: "user is updated",
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
                    return {
                        status: "FAILURE",
                        message: "user is not found",
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                return {
                    status: "FAILURE",
                    message: "db error when updating user"
                }
            });
        }
        else{
            sampleUpdateUserResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateUserResponse;
    }

}

module.exports = User;