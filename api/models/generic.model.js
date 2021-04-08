const knex = require('../dbfunctions/dbControls');


class Generic{

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

        Number.prototype.toRad = function(){
            return this * Math.PI /180;
        }
        
        return await knex('home').select().where('isVisible', true)
        .then(function(homes) {
            
            var dist_list = [];

            var i;
            for(i = 0; i < homes.length; i++) {
                var lat1 = homes[i].latitude;
                var lon1 = homes[i].longitude;

                const R = 6371;

                var x1 = reqBody.latitude - lat1;
                var dLat = x1.toRad();
                var x2 = reqBody.longitude - lon1;
                var dLon = x2.toRad();

                var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                        Math.cos(lat1.toRad()) * Math.cos(reqBody.latitude.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;

                dist_list.push({'key': d, 'value': homes[i]});
                
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

        Number.prototype.toRad = function(test){
            return this * Math.PI /180;
        }

        console.log("in function");
        var result = await fetch('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=10')
        .then(res => res.json())
        .then(async function(res) {
            await knex('home').select('home_id', 'home_owner', 'latitude', 'longitude')
            .then(function(homes) {
                var i, j;
                
                for(j = 0; j < res.result.length; j++) {
                    for(i = 0; i < homes.length; i++) {
                        var lat1 = homes[i].latitude;
                        var lon1 = homes[i].longitude;

                        const R = 6371;

                        var x1 = res.result[j].latitude - lat1;
                        var dLat = x1.toRad();
                        var x2 = res.result[j].longitude - lon1;
                        var dLon = x2.toRad();

                        var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                                Math.cos(lat1.toRad()) * Math.cos(res.result[j].lat.toRad()) *
                                Math.sin(dLon/2) * Math.sin(dLon/2);
                        var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
                        var d = R * c;
 
                        if(d < (Math.abs(res.result[j].mag - 4) * 100)) {
                            //db action
                            //notification action
                        }                
                }}
                return;
            });
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
                var lat1 = events[i].latitude;
                var lon1 = events[i].longitude;

                const R = 6371;

                var x1 = reqBody.latitude - lat1;
                var dLat = x1.toRad();
                var x2 = reqBody.longitude - lon1;
                var dLon = x2.toRad();

                var a = Math.sin(dLat/2) * Math.sin(dLat /2) +
                        Math.cos(lat1.toRad()) * Math.cos(reqBody.latitude.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;

                dist_list.push({'key': d, 'value': events[i]});
                
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


}

module.exports = Generic;