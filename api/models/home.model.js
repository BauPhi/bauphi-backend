const knex = require('../dbfunctions/dbControls');
class Home {

    async getHomes(reqBody, params, user_id){

        // get homes of user
        return knex('home').select().where('home_owner', user_id)
        .then(function(homes) {
            if(homes && homes.length !== 0){
                return {
                    status: "SUCCESS",
                    message: "all homes of user are listed",
                    user_id: user_id,
                    homes: homes,
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "homes are not found",
                }
            }

        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error"
            }
        });
        
    }

    async getHome(reqBody, params, user_id){

        // get homes of user
        return knex('home').select().where({'home_owner': user_id, 'home_id' : params.id})
       .then(function(home) {
            if(home.length !== 0){
                return {
                    status: "SUCCESS",
                    message: "home is found",
                    user_id: user_id,
                    home: home,
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "home is not found",
                }
            }

       }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error"
            }
        });
        
    }


    async addHome(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("home_owner" && "isVisible" && "home_name" && "country" && "state" && "city" && "neighbourhood" && "latitude" && "longitude") && fields.length < 10
        reqBody['home_owner'] = user_id;
        if(fieldCheck){
            return knex('home').insert(reqBody)
            .then(function(home) {
                return {
                    status: "SUCCESS",
                    message: "new home is added",
                    user_id: user_id,
                    home: {
                        home_owner: reqBody.home_owner,
                        home_name: reqBody.home_name,
                        isVisible: reqBody.isVİsible,
                        country: reqBody.country,
                        state: reqBody.state,
                        city: reqBody.city,
                        neighbourhood: reqBody.neighbourhood,
                        latitude: reqBody.latitude,
                        longitude: reqBody.longitude
                    }
                }
            }).catch((err) => {
                console.log(err)
                return {
                    status: "FAILURE",
                    message: "db error"
                }
            });
        }
        else{
            return {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }
    }
        
    

    async deleteHome(reqBody, params, user_id){
        var home = await this.getHome(reqBody, params, user_id);
        return knex('home').where({'home_owner': user_id, 'home_id':params.id}).del()
        .then(function(num) {
            if(num > 0){
                return {
                    status: "SUCCESS",
                    message: "home is deleted",
                    user_id: user_id,
                    home: home.home
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "home is not found",
                }
            }
    
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "db error"
            }
        });
    }
    
    async updateHome(reqBody, params, user_id){

        const home = await this.getHome(reqBody, params, user_id);

        if(home.home){
            return knex('home').where({'home_owner': user_id,'home_id': params.id}).update(reqBody)
            .then(function() {
                return {
                    status: "SUCCESS",
                    message: "home is updated",
                    user_id: user_id,
                    home: {
                        home_id: params.id,
                        home_owner: reqBody.home_owner,
                        home_name: reqBody.home_name,
                        country: reqBody.country,
                        state: reqBody.state,
                        city: reqBody.city,
                        neighbourhood: reqBody.neighbourhood,
                        latitude: reqBody.latitude,
                        longitude: reqBody.longitude
                    }
                }       
            }).catch((err) => {
                console.log(err)
                return {
                    status: "FAILURE",
                    message: "db error"
                }
            });
        }
        else {
            return {
                status: "FAILURE",
                message: "home is not found"
            }
        }
    }
        
    async getCloseLocation(reqBody, params){

        Number.prototype.toRad = function(){
            return this * Math.PI /180;
        }
        
        return await knex('home').select().where('isVisible', true)
        .then(function(homes) {
            
            var dist_list = {};

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
                        Math.cos(lat1.toRad()) * Math.cos(reqBody.latitude.toRad) *
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
            return {
                status: "FAILURE",
                message: "db error"
            }
        });
    }

    async autoLocation(reqBody, params, user_id){

        const fetch = require("node-fetch")

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("latitude" && "longitude") && fields.length < 3

        let apiResponse = {}
        await fetch('https://nominatim.openstreetmap.org/reverse?lat=' + reqBody.latitude + '&lon=' + reqBody.longitude + '&format=json')
        .then(res => res.json())
        .then(json => {
            const apiFields = Object.keys(json)
            const apiFieldCheck = apiFields.includes("address")
            if(apiFieldCheck){
                const addressFields = Object.keys(json.address)
                const addressFieldCheck = addressFields.includes("country" && "province" && "county")
                if(addressFieldCheck){
                    apiResponse = {
                        api_status: "SUCCESS",
                        api_message: "address is returned",
                        home_name: json.address.county + "/" + json.address.province,
                        country: json.address.country,
                        state: json.address.province,
                        city: json.address.county,
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


        let sampleAutoDefineResponse = {}
        if(fieldCheck){
            sampleAutoDefineResponse = {
                status: "SUCCESS",
                message: "location api response is returned",
                api_response: apiResponse
            }
        }
        else{
            sampleAutoDefineResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleAutoDefineResponse;
    }

}

module.exports = Home;