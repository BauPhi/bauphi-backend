const knex = require('../dbfunctions/dbControls');


class Generic{

    async listParticipants(reqBody, params, event_id){
        return knex('participation').select('attendee').where({event: event_id}).returning("*")
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
                    apiResponse = {
                        api_status: "SUCCESS",
                        api_message: "address is returned",
                        home_name: json.address.suburb + "/" + json.address.province,
                        country: json.address.country,
                        state: json.address.province,
                        city: json.address.county || json.address.town,
                        neighbourhood: json.address.suburb || json.address.village
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

}

module.exports = Generic;