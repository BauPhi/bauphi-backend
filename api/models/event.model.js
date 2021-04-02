const knex = require('../dbfunctions/dbControls');
class Event {
    
    async getEvents(reqBody, params, user_id){

        var meetings = await knex('meeting').where('event_starter', user_id).select()
        .then(function(meetings) {
            return meetings;
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });

        var moneyDonations = await knex('money').where('event_starter', user_id).select()
        .then(function(dons) {
            return dons;
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });

        var supplyDonations = await knex('supply').where('event_starter', user_id).select()
        .then(function(dons) {
            return dons;
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });

        var events = meetings.concat(moneyDonations, supplyDonations)

        return {
            status: "SUCCESS",
            message: "all events of user is displayed",
            events: events
        }
    }


    async getEvent(reqBody, params, user_id){

        return knex('events').where({'event_starter': user_id, 'event_id': params.id}).select()
        .then(function(event) {
            if(event.length !== 0){

                var tablename = ""
                if(event[0].type === "Meeting"){
                    tablename = "meeting"
                }
                else if(event[0].type === "Donation/Money"){
                    tablename = "money"
                }
                else if(event[0].type === "Donation/Supply"){
                    tablename = "supply"
                }
                else{
                    return {
                        status: "FAILURE",
                        message: "unknown error"
                    }
                }

                return knex(tablename).where({'event_starter': user_id, 'event_id': params.id}).select()
                .then((event) => {
                    return {
                        status: "SUCCESS",
                        message: "event is found",
                        event: event[0],
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
                    message: "event is not found",
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
    }

    async addEvent(reqBody, params, user_id){

        const User = require('../models/user.model')
        const user = new User()

        var userData = await user.getUser({}, {id: user_id})

        if(userData.status === "FAILURE"){
            return {
                status: "FAILURE",
                message: "no such user found"
            }
        }

        var tablename = ""
        if(reqBody.type === "Meeting")
            tablename = "meeting"
        else if(reqBody.type === "Donation/Money")
            tablename = "money"
        else if(reqBody.type === "Donation/Supply")
            tablename = "supply"
        else{
            return {
                status: "FAILURE",
                message: "event type is undefined"
            }
        }

        reqBody['event_starter'] = user_id;
        
        return knex(tablename).insert(reqBody).returning('event_id')
        .then((id) => {
            return {
                status: "SUCCESS",
                message: "meeting event is added",
                event: {
                    event_id: "" + id[0],
                    event_starter: user_id,
                    start_time: reqBody.start_time,
                    end_time: reqBody.end_time,
                    title: reqBody.title,
                    description: reqBody.description,
                    type: reqBody.type,
                    isEmergency: reqBody.isEmergency,
                    country: reqBody.isEmergency,
                    state: reqBody.state,
                    city: reqBody.city,
                    neighbourhood: reqBody.neighbourhood,
                    latitude: reqBody.latitude,
                    longitude: reqBody.longitude,
                    currency: reqBody.currency,
                    amount: reqBody.amount
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error when adding meeting event"
            }
        })
        
        
    }

    async deleteEvent(reqBody, params, user_id){

        var event = await this.getEvent(reqBody, params, user_id);

        return knex('events').where({'event_starter': user_id, 'event_id':params.id}).del()
        .then(function(num) {
            if(num > 0){
                return{
                    status: "SUCCESS",
                    message: "event is deleted",
                    user_id: user_id,
                    event: event.event
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "event is not found",
                }
            }

        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
    }



    async updateEvent(reqBody, params, user_id){

        var event = await this.getEvent(reqBody, params, user_id);

        var tablename = ""
        if(event.event.type === "Meeting"){
            tablename = "meeting"
        }
        else if(event.event.type === "Donation/Money"){
            tablename = "money"
        }
        else if(event.event.type === "Donation/Supply"){
            tablename = "supply"
        }
        
        return knex(tablename).where({'event_starter': user_id, 'event_id':params.id}).update(reqBody)
        .then(function(event){
            return {
                status: "SUCCESS",
                message: "event is updated",
                user_id: user_id,
                event: {
                    event_id: params.id,
                    event_starter: user_id,
                    event_start: reqBody.event_start,
                    event_end: reqBody.event_end,
                    title: reqBody.title,
                    description: reqBody.description,
                    type: reqBody.type,
                    isEmergency: reqBody.isEmergency,
                    country: reqBody.country,
                    state: reqBody.state,
                    city: reqBody.city,
                    neighbourhood: reqBody.neighbourhood,
                    latitude: reqBody.latitude,
                    longitude: reqBody.longitude,
                    currency: reqBody.currency,
                    amount: reqBody.amount
                }
            }

        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });   

    }

}

module.exports = Event;