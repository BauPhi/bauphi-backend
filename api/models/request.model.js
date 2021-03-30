const knex = require('../dbfunctions/dbControls');

class Request {

    async send(reqBody, params, user_id){

        reqBody['victim'] = user_id;
        reqBody['results'] = "Pending";

        return knex('request').insert(reqBody).returning('*')
        .then((newRequest) => {
            return {
                status: "SUCCESS",
                message: "new home request is sent",
                request: newRequest
            }
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })

    }

    async sentList(reqBody, params, user_id){
        return knex('request').select().where({'victim': user_id})
        .then((requests) => {
            if(requests && requests.length !== 0){
                return {
                    status: "SUCCESS",
                    message: "sent home request list is returned",
                    requests: requests
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "no sent request are found"
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }


    async delete(reqBody, params, user_id){

        return knex('request').where({victim: user_id, home: params.home_id}).del().returning('*')
        .then((deletedRequest) => {
            if(deletedRequest.length > 0){
                return {
                    status: "SUCCESS",
                    message: "home request is deleted",
                    request: deletedRequest
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "no such request is found"
                }
            }
            
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }



    async receivedList(reqBody, params, user_id){
        return knex('request').select().where({'home_owner': user_id})
        .then((requests) => {
            if(requests && requests.length !== 0){
                return {
                    status: "SUCCESS",
                    message: "sent home request list is returned",
                    requests: requests
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "no received request are found"
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }


    async rejectRequest(reqBody, params, user_id){
        return knex('request').where({victim: reqBody.victim, home: reqBody.home}).update({results: "Rejected"}).returning('*')
        .then((requests) => {
            if(requests && requests.length > 0){
                return {
                    status: "SUCCESS",
                    message: "request is rejected",
                    request: requests[0]
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "no such request is found"
                }
            }
            
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }

}

module.exports = Request;