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
                message: err.detail
            }
        });
        
    }

    async getHome(reqBody, params, user_id){

        // get homes of user
        return knex('home').select().where({'home_owner': user_id, 'home_id' : params.id})
       .then(function(home) {
            if(home.length > 0){
                return {
                    status: "SUCCESS",
                    message: "home is found",
                    user_id: user_id,
                    home: home[0],
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
                message: err.detail
            }
        });
        
    }


    async addHome(reqBody, params, user_id){

        reqBody['home_owner'] = user_id;
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
                message: err.detail
            }
        });
        
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
                message: err.detail
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
                    message: err.detail
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
}

module.exports = Home;
