const knex = require('../dbfunctions/dbControls');


class Generic{

    findDistance(lat1, lon1, lat2, lon2){
        
        Number.prototype.toRad = function(){
            return this * Math.PI /180;
        }

        const R = 6371;

        var x1 = lat2 - lat1;
        var dLat = x1.toRad();
        var x2 = lon2 - lon1;
        var dLon = x2.toRad();

        var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return Math.round(d);
    }

    async listParticipants(reqBody, params, event_id){
        return knex('participation').select('attendee', 'comment').where({event: event_id}).returning("*")
        .then((participants) => {
            return {
                status: "SUCCESS",
                message: "all participants are listed",
                participant_count: participants.length,
                participants: participants
            }
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: err.detail
            }
        })
    }

    async autoLocation(reqBody, params){

        const fetch = require("node-fetch")

        let apiResponse = {}
        await fetch('https://nominatim.openstreetmap.org/reverse?lat=' + reqBody.latitude + '&lon=' + reqBody.longitude + '&format=json')
        .then(res => res.json())
        .then(json => {
            const apiFields = Object.keys(json)
            const apiFieldCheck = apiFields.includes("address")
            if(apiFieldCheck){
                const addressFields = Object.keys(json.address)
                const addressFieldCheck = addressFields.includes("country" && "province")
                if(addressFieldCheck){
                    var detailedInfo = json.address.suburb || json.address.village || json.address.neighbourhood || json.address.city_district || json.address.district
                    apiResponse = {
                        api_status: "SUCCESS",
                        api_message: "address is returned",
                        home_name: detailedInfo + "/" + json.address.province,
                        country: json.address.country || "",
                        state: json.address.province || "",
                        city: json.address.county || json.address.town || "",
                        neighbourhood: detailedInfo + ", "  + (json.address.road || "") || ""
                    }
                }
                else{
                    apiResponse = {
                        api_status: "FAILURE",
                        api_message: "no detailed address, enter manually"
                    }
                }
            }
            else{
                apiResponse = {
                    api_status: "FAILURE",
                    api_message: "no address data, enter manually"
                }
            }
            
        })
        .catch((error) => {
            apiResponse = {
                api_status: "FAILURE",
                api_message: error.message
            }
        });

        return {
            status: "SUCCESS",
            message: "location api response is returned",
            api_response: apiResponse
        }
    }


    async getCloseLocation(reqBody, params){
        
        return await knex('home').select().where('isVisible', true)
        .then(function(homes) {
            
            var dist_list = [];

            var i;
            for(i = 0; i < homes.length; i++) {
                
                Number.prototype.toRad = function(){
                    return this * Math.PI /180;
                }
        
                const R = 6371;
                var lat1 = homes[i].latitude
                var lon1 = homes[i].longitude 
                var lat2 = reqBody.latitude
                var lon2 = reqBody.longitude
                var x1 = lat2 - lat1;
                var dLat = x1.toRad();
                var x2 = lon2 - lon1;
                var dLon = x2.toRad();
        
                var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;

                dist_list.push({'key': Math.round(d), 'value': homes[i]});
                
            }
            dist_list.sort(function(a,b) {
                var x = a['key'];
                var y = b['key'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            });

            if(dist_list.length > 0) {
                return {
                    status: "SUCCESS",
                    message: "all homes are listed in sorted manner",
                    homes: dist_list
                }
            }
            else {
                return {
                    status: "FAILURE",
                    message: "no home found"
                }
            }
        }).catch(err => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
    }

    async checkAndOpenForDisaster(){

        const fetch = require("node-fetch");

        var notification_list = [];

        var result = await fetch('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=10')
        .then(res => res.json())
        .then(async function(res) {
            await knex('home').select('home_id', 'home_owner', 'latitude', 'longitude')
            .then(function(homes) {
                var i, j;
                
                for(j = 0; j < res.result.length; j++) {
                    for(i = 0; i < homes.length; i++) {
                        var d = Generic.findDistance(homes[i].latitude, homes[i].longitude, res.result[j].latitude, res.result[j].longitude);
                        
                        if(d < (Math.abs(res.result[j].mag - 4) * 100)) {
                            knex('home').where({'home_owner': homes[i].home_owner,'home_id': homes[i].home_id}).update("isVisible", true)
                            .then(async function() {
                                knex('users').where('user_id', homes[i].home_owner).select("registration_id")
                                .then((user) => {
                                    notification_list.push(user.registration_id);
                                })
                            });
                        }                
                }}
            });
        })
        .then(async function() {
            var notification = {
                reg_ids: notification_list,
                title: "Disaster nearby",
                message: "Your home opened to public due to a close disaster"
                };
            if(notification_list.length > 0){
                let body = {
                    registration_ids: notification.reg_ids,
                    data: {
                        title: notification.title,
                        message: notification.message
                    }
                }
            
                await fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json' ,
                        'Accept': 'application/json',
                        'Authorization': 'key=AAAAD5bSw-0:APA91bEl_9S8KrTCt5GSEkMse-dzvbIDXHrKCtlgsW86dLReZfs7CzlCg6n39ucH_lbyyDb9RiTr7CPK_S_OlenbZAgcuBP-8r4o3rZ9Jho4kSXKK2BFcttgXkVeIcdcfxoc6mU351a3'
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        });
    }


    async getCloseEvents(reqBody, params){
        var getEvents = async (tablename) => await knex(tablename).select()
        .then(function(events) {

            Number.prototype.toRad = function(){
                return this * Math.PI /180;
            }
            
            var dist_list = [];

            var i;
            for(i = 0; i < events.length; i++) {
                if(!events[i].latitude){
                    continue;
                }

                Number.prototype.toRad = function(){
                    return this * Math.PI /180;
                }
        
                const R = 6371;

                var lat1 = events[i].latitude
                var lon1 = events[i].longitude 
                var lat2 = reqBody.latitude
                var lon2 = reqBody.longitude
                var x1 = lat2 - lat1;
                var dLat = x1.toRad();
                var x2 = lon2 - lon1;
                var dLon = x2.toRad();
        
                var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;



                dist_list.push({'key': Math.round(d), 'value': events[i]});
                
            }
            dist_list.sort(function(a,b) {
                var x = a['key'];
                var y = b['key'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            });


            if(dist_list.length > 0) {
                return {
                    status: "SUCCESS",
                    message: "all " + params.type + " events are listed in sorted manner",
                    events: dist_list
                }
            }
            else {
                return {
                    status: "FAILURE",
                    message: "no event found"
                }
            }
        }).catch(err => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
        
        if(params.type){
            if(params.type === "meeting" || params.type === "supply"){
                return getEvents(params.type)
            }
            else{
                return {
                    status: "FAILURE",
                    message: "query parameter is wrong. type can be 'meeting' or 'supply'."
                }
            }
        }
        else{
            
            var meetings = await getEvents("meeting")
            .then((res) => {
                return res.events || []
            })

            var supplies = await getEvents("supply")
            .then((res) => {
                return res.events || []
            })
            
            var events = meetings.concat(supplies)
            
            events.sort(function(a,b) {
                var x = a['key'];
                var y = b['key'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            });

            return {
                status: "SUCCESS",
                message: "all meeting & supply events are listed in sorted manner",
                events: events
            }
        }
    }

    async getUserDetails(reqBody, params){


        var user = await knex('users').select().where({user_id: params.user_id}).returning("*")
        .then((user) => {
            return user[0]
        })
        .catch((err) => {
            return {
                message: "problem at getting the user"
            }
        })

        var homes = await knex('home').select().where({home_owner: params.user_id}).returning("*")
        .then((homes) => {
            return homes
        })
        .catch((err) => {
            return {
                message: "problem at getting the homes"
            }
        })

        var events = await knex('events').select().where({event_starter: params.user_id}).returning("*")
        .then((events) => {
            return events
        })
        .catch((err) => {
            return {
                message: "problem at getting the events"
            }
        })


        var announcements = await knex('announcement').select().where({ann_starter: params.user_id}).returning("*")
        .then((announcements) => {
            return announcements
        })
        .catch((err) => {
            return {
                message: "problem at getting the announcements"
            }
        })



        var sent_home_requests = await knex('request').select().where({victim: params.user_id}).returning("*")
        .then((reqs) => {
            return reqs
        })
        .catch((err) => {
            return {
                message: "problem at getting the requests sent"
            }
        })


        var received_home_requests = await knex('request').select().where({home_owner: params.user_id}).returning("*")
        .then((reqs) => {
            return reqs
        })
        .catch((err) => {
            return {
                message: "problem at getting the requests received"
            }
        })


        var participations = await knex('participation').select().where({attendee: params.user_id}).returning("*")
        .then((parts) => {
            return parts
        })
        .catch((err) => {
            return {
                message: "problem at getting the participations"
            }
        })

        if(user){
            return {
                status: "SUCCESS",
                message: "all data related to user is returned",
                user: user,
                homes: homes,
                events: events,
                announcements: announcements,
                sent_home_requests: sent_home_requests,
                received_home_requests: received_home_requests,
                participations: participations
            }
        }
        else{
            return {
                status: "SUCCESS",
                message: "user not found"
            }
        }

        
    }




    async getAllHomes(reqBody, params){
        return knex('home').select().returning('*')
        .then((homes) => {
            return {
                status: "SUCCESS",
                message: "all homes in db are returned",
                homes: homes
            }
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }




    async getAllEvents(reqBody, params){
        return knex('events').select().returning('*')
        .then((events) => {
            return {
                status: "SUCCESS",
                message: "all events in db are returned",
                events: events
            }
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }




    async getAllAnnouncements(reqBody, params){
        return knex('announcement').select().returning('*')
        .then((announcements) => {
            return {
                status: "SUCCESS",
                message: "all announcements in db are returned",
                announcements: announcements
            }
        })
        .catch((err) => {
            return {
                status: "FAILURE",
                message: "db error"
            }
        })
    }


    async sendNotification(notification){

        // reg id's will come here as ["123", "456", "abc"]

        const fetch = require('node-fetch');

        let body = {
            registration_ids: notification.reg_ids,
            data: {
                title: notification.title,
                message: notification.message
            }
        }
    
        return await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': 'key=AAAAD5bSw-0:APA91bEl_9S8KrTCt5GSEkMse-dzvbIDXHrKCtlgsW86dLReZfs7CzlCg6n39ucH_lbyyDb9RiTr7CPK_S_OlenbZAgcuBP-8r4o3rZ9Jho4kSXKK2BFcttgXkVeIcdcfxoc6mU351a3'
            }
        }).then(res => res.json())
        .then((json) => {
            return {
                status: "SUCCESS",
                message: "response json is returned by fcm",
                data: json
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "external error, couldn't send notification"
            }
        })
    }


    async listEarthquakes(reqBody){
        const fetch = require('node-fetch');
        return await fetch('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=10')
        .then(res => res.json())
        .then((res) => {

            var listed = res.result || []
            var earthquakes = []
            for(var e in listed){
                var atom = {
                    magnitude: listed[e].mag,
                    location: listed[e].lokasyon,
                    depth: listed[e].depth + " km",
                    date: listed[e].date,
                }
                if(reqBody.latitude && reqBody.longitude){
                    var distance = this.findDistance(listed[e].lat, listed[e].lng, reqBody.latitude, reqBody.longitude);
                    atom["distance"] = distance + " km";
                }
                earthquakes.push(atom)
            }
            return {
                status: "SUCCESS",
                message: "last ten earthquakes are listed",
                earthquakes: earthquakes
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "external error"
            }
        })
    }


    async listMoneyDonations(reqBody){
        return knex('money').select().returning('*')
        .then((donations) => {
            return {
                status: "SUCCESS",
                message: "all money donations in db are returned",
                donations: donations
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

module.exports = Generic;
