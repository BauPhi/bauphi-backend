const knex = require('../dbfunctions/dbControls');
class Event {
    constructor(){
        this.dbEvents = [
            {
                event_id: "1",
                event_starter: "2",
                event_start: "2021-07-09::16-00",
                event_end: "2021-07-09::19-00",
                title: "Deprem Buluşma",
                description: "Deprem bölgesinde olanlar erzak ve sağlık hizmeti için acil toplanma alanına gelsinler!",
                type: "Meeting",
                additionalData: {
                    isEmergency: true,
                    country: "Turkey",
                    state: "Diyarbakır",
                    city: "Bağlar",
                    neighbourhood: "Bağcılar Mah. X Cad. Y Sok. No: 2/4",
                    latitude: "37.927193",
                    longitude: "40.184143"
                }
            },
            {
                event_id: "2",
                event_starter: "1",
                event_start: "2021-03-20::12-00",
                event_end: "2021-03-20::14-00",
                title: "Sel Afetzedeleri İçin Kermes",
                description: "Siz de afetzedeler için düzenlediğimiz kermese katılabilirsiniz.",
                type: "Donation/Supply",
                additionalData: {
                    country: "Turkey",
                    state: "Diyarbakır",
                    city: "Bağlar",
                    neighbourhood: "Bağcılar Mah. X Cad. Y Sok. No: 2/4",
                    latitude: "37.927193",
                    longitude: "40.184143"
                }
            },
            {
                event_id: "3",
                event_starter: "3",
                event_start: "2021-10-30::12-00",
                event_end: "2021-12-30::12-00",
                title: "Elazığ Deprem Mağdurlarına Bağış",
                description: "Elazığ depreminde evini, sağlını kaybeden vatandaşlarımız için sen de 10 TL gönder. Link: www.samplelink.com",
                type: "Donation/Money",
                additionalData: {
                    currency: "TL",
                    amount: "10"
                }
            },
            {
                event_id: "4",
                event_starter: "3",
                event_start: "2021-10-09::00-00",
                event_end: "2021-12-09::00-00",
                title: "Belediye Yemek Alanı",
                description: "Günlük yemek ihtiyacınızı belediyemizin yemek hizmetlerinden karşılayabilirsiniz.",
                type: "Meeting",
                additionalData: {
                    isEmergency: false,
                    country: "Turkey",
                    state: "Elazığ",
                    city: "Merkez",
                    neighbourhood: "Elazığ X Cad. Y Sok. No: 2/4",
                    latitude: "38.675406",
                    longitude: "39.222979"
                }
            }
        ]
    }

    async getEvents(reqBody, params, user_id){

        return knex('events').where('event_starter', user_id).select()
        .then(function(events) {
            let sampleGetEventsResponse = {}
            if(events && events.length !== 0){
                sampleGetEventsResponse = {
                    status: "SUCCESS",
                    message: "all events of user are listed",
                    user_id: user_id,
                    events: events,
                }
            }
            else{
                sampleGetEventsResponse = {
                    status: "FAILURE",
                    message: "events are not found",
                }
            }
    
            return sampleGetEventsResponse;
        })       
    }


    async getEvent(reqBody, params, user_id){

        return knex('events').where({'event_starter': user_id, 'event_id': params.id}).select()
        .then(function(event) {
            let sampleGetEventResponse = {}
            if(event){
                sampleGetEventResponse = {
                    status: "SUCCESS",
                    message: "event is found",
                    user_id: user_id,
                    event: event,
                }
            }
            else{
                sampleGetEventResponse = {
                    status: "FAILURE",
                    message: "event is not found",
                }
            }

            return sampleGetEventResponse
        })
    }

    async addEvent(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("event_start" && "event_end" && "title" && "description" && "type") && fields.length < 6

        let sampleAddEventResponse = {}
        if(fieldCheck){
            reqBody['event_starter'] = user_id;
            knex('events').insert(reqBody).then();
            sampleAddEventResponse = {
                status: "SUCCESS",
                message: "new event is added",
                user_id: user_id,
                event: {
                    event_id: Math.floor(Math.random()*100 +1).toString(),
                    event_starter: user_id,
                    event_start: reqBody.event_start,
                    event_end: reqBody.event_end,
                    title: reqBody.title,
                    description: reqBody.description,
                    type: reqBody.type,
                    additionalData: {}
                }
            }
        }
        else{
            sampleAddEventResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleAddEventResponse;

    }


    async deleteEvent(reqBody, params, user_id){

        // get events of user
        /*const event = this.dbEvents.find(x => {
            if(x.event_id === params.id && x.event_starter === user_id){
                return true;
            }
        });*/
        var event =  await this.getEvent(reqBody, params, user_id);

        return knex('events').where({'event_starter': user_id, 'event_id':params.id}).del()
        .then(function(num) {
            let sampleDeleteEventResponse = {}
            if(num > 0){
                sampleDeleteEventResponse = {
                    status: "SUCCESS",
                    message: "event is deleted",
                    user_id: user_id,
                    event: event
                }
            }
            else{
                sampleDeleteEventResponse = {
                    status: "FAILURE",
                    message: "event is not found",
                }
            }

            return sampleDeleteEventResponse;
        })
    }



    async updateEvent(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 13

        let sampleUpdateEventResponse = {}
        if(fieldCheck){
            knex('events').where({'event_starter': user_id, 'event_id':params.id}).update(reqBody).then();
            sampleUpdateEventResponse = {
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
                    additionalData: {
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
            }
        }
        else{
            sampleUpdateEventResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateEventResponse;

    }
}

module.exports = Event;