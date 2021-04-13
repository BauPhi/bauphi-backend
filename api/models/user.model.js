const knex = require('../dbfunctions/dbControls');
const sha256 = require('js-sha256');

class User {
    
    hideFields(key,value){
        if (key=="password") return undefined;
        else return value;
    }

    async login(reqBody, params){

        let user = "";
        let isValid = false;
        return await knex('users').where({'email':reqBody.email}).select()
        .then(async function(user) {

            if(user && user.length > 0){
                isValid = (user[0].password === sha256(reqBody.password));
    
                if(isValid){
                    const safeUser = user[0];

                    const Session = require('../controllers/session.controller')
                    const session = new Session()
        
                    return {
                        status: "SUCCESS",
                        message: "login is successful",
                        user: safeUser,
                        session: await session.createSession(user[0].user_id)
                    }
                }
                else{
                    return {
                        status: "FAILURE",
                        message: "login has failed"
                    }
                }
        
                
            }
            else{
                return {
                    status: "FAILURE",
                    message: "login error"
                }
            }
            
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        })
        // check if login request is valid
        
    }


    async oauthLogin(reqBody, params){
        const Session = require('../controllers/session.controller')
        const session = new Session()

        var user = await knex('users').select().where({ email: reqBody.email }).returning('*')
        .then((user) => {
            if(user.length > 0){
                return user[0];
            }
            else{
                return false;
            }
        })
        .catch((err) => {
            console.log(err)
            return false;
        })

        if(user){
            if(user.is_oauth_user){

                if(user.google_uid === reqBody.google_uid){
                    
                    return {
                        status: "SUCCESS",
                        message: "user is logged in using a google account",
                        user: user,
                        session: await session.createSession(user.user_id)
                    }
                }
                else{
                    return {
                        status: "FAILURE",
                        message: "user's google uid does not match"
                    }
                }

            }
            else{
                var updateResponse = await this.updateUser(
                    {
                        is_oauth_user: true,
                        google_uid: reqBody.google_uid
                    },
                    {
                        id: user.user_id
                    }
                )
                if(updateResponse.status === "SUCCESS"){
                    return {
                        status: "SUCCESS",
                        message: "existing user is now also a oauth user",
                        user: updateResponse.user,
                        session: await session.createSession(user.user_id)
                    }
                }
            }
        }
        else{
            var addResponse = await this.addUser(
                {
                    name: reqBody.email.substring(0, reqBody.email.indexOf("@")),
                    surname: "",
                    email: reqBody.email,
                    phone: "",
                    password: "notset",
                    google_uid: reqBody.google_uid,
                    is_oauth_user: true
                }
            )

            if(addResponse.status === "SUCCESS"){
                return {
                    status: "SUCCESS",
                    message: "a new user is added using oauth",
                    user: addResponse.user,
                    session: await session.createSession(addResponse.user.user_id)
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "failure when adding a brand new oauth user",
                    error: addResponse
                }
            }
        }


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
            message: err.detail
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
                message: err.detail
            }
            console.log(err)
            return sampleGetUserResponse;
        });
        
    }

    async addUser(reqBody, params){
        reqBody['password'] = sha256(reqBody['password']);
        return knex('users').insert(reqBody).returning('*')
        .then(function(user) {

            if(user.length > 0){
                return {
                    status: "SUCCESS",
                    message: "new user is added",
                    user: user[0]
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "error at db",
                    user: user[0]
                }
            }
            
        })
        .catch((err) => {
            console.log(err)

            return {
                status: "FAILURE",
                message: err.detail
            }
        });
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
                    message: err.detail
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

        return await knex('users').where('user_id', params.id).update(reqBody).returning('*')
        .then((user) => {
            if(user.length > 0){
                return {
                    status: "SUCCESS",
                    message: "user is updated",
                    user: user[0]
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
        


}

module.exports = User;