const knex = require('../dbfunctions/dbControls');

class Request {

    async send(reqBody, params, user_id){

        if(user_id == reqBody.home_owner){
            return {
                status: "FAILURE",
                message: "victim and home owner cannot be the same user"
            }
        }
        else{
            return knex('home').select().where({home_owner: reqBody.home_owner, home_id: reqBody.home}).returning('*')
            .then((home) => {
                if(home.length > 0){
                    return knex('request').select().where({home: reqBody.home, victim: user_id}).returning('*')
                    .then((request) => {
                        if(request.length > 0){
                            return {
                                status: "FAILURE",
                                message: "user already sent an offer for this home"
                            }
                        }
                        else{
                            reqBody['victim'] = user_id;
                            reqBody['results'] = "Pending";
                    
                            return knex('request').insert(reqBody).returning('*')
                            .then((newRequest) => {
                                return {
                                    status: "SUCCESS",
                                    message: "new home request is sent",
                                    request: newRequest[0]
                                }
                            })
                            .catch((err) => {
                                return {
                                    status: "FAILURE",
                                    message: "db error"
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        return {
                            status: "FAILURE",
                            message: err.detail
                        }
                    })
                }
                else{
                    return {
                        status: "FAILURE",
                        message: "no such a home is found"
                    }
                }
            })
            .catch((err) => {
                return {
                    status: "FAILURE",
                    message: err.detail
                }
            })

            
            
        }
        

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
                    message: "received home request list is returned",
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


    async acceptRequest(reqBody, params, user_id){
        return knex('request').where({victim: reqBody.victim, home: reqBody.home}).update({results: "Accepted"}).returning('*')
        .then((requests) => {
            if(requests && requests.length > 0){
                return {
                    status: "SUCCESS",
                    message: "request is accepted",
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


    async joinEvent(reqBody, params, user_id){

        return knex('users').select().where({user_id: user_id}).returning('*')
        .then((user) => {
            if(user.length > 0){
                return knex('events').select().where({event_id: reqBody.event}).returning('*')
                .then((records) => {
                    if(records.length > 0){
                        reqBody['attendee'] = user_id;
                        return knex('participation').insert(reqBody).returning('*')
                        .then((newParticipation) => {
                            return {
                                status: "SUCCESS",
                                message: "new participation is added",
                                participation: newParticipation[0]
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            return {
                                status: "FAILURE",
                                message: err.detail
                            }
                        })
                    }
                    else{
                        return {
                            status: "FAILURE",
                            message: "no such event is found"
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
            else{
                return {
                    status: "SUCCESS",
                    message: "user is not found"
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


    async cancelParticipation(reqBody, params, user_id){
        return knex('participation').where({attendee: user_id, event: params.event_id}).del().returning('*')
        .then((participation) => {
            if(participation.length > 0){
                return {
                    status: "SUCCESS",
                    message: "participation is cancelled",
                    participation: participation[0]
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "participation is not found"
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

}

module.exports = Request;