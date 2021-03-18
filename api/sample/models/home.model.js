class Home {
    constructor(){
        this.dbHomes = [
            {
                home_id: "1",
                home_owner: "1",
                country: "Turkey",
                state: "İstanbul",
                city: "Sarıyer",
                neighbourhood: "Zekeriyaköy Mah. X Cad. Y Sok. No: 1/2",
                latitude: "41.201170",
                longitude: "29.032128"
            },
            {
                home_id: "2",
                home_owner: "2",
                country: "Turkey",
                state: "Kastamonu",
                city: "Merkez",
                neighbourhood: "Aktekke Mah. X Cad. Y Sok. No: 1/2",
                latitude: "41.381227",
                longitude: "33.782458"
            },
            {
                home_id: "3",
                home_owner: "1",
                country: "Turkey",
                state: "İstanbul",
                city: "Beykoz",
                neighbourhood: "İncirköy Mah. X Cad. Y Sok. No: 1/2",
                latitude: "41.121082",
                longitude: "29.122104"
            },
            {
                home_id: "4",
                home_owner: "3",
                country: "Turkey",
                state: "Akdeniz Bölgesi",
                city: "Mersin",
                neighbourhood: "Selçuklar Mah. X Cad. Y Sok. No: 1/2 Toroslar",
                latitude: "36.821536",
                longitude: "34.624811"
            }
        ]
    }

    getHomes(reqBody, params, user_id){

        // get homes of user
        const homes = this.dbHomes.filter(x => x.home_owner === user_id);
       
        let sampleGetHomesResponse = {}
        if(homes && homes.length !== 0){
            sampleGetHomesResponse = {
                status: "SUCCESS",
                message: "all homes of user are listed",
                user_id: user_id,
                homes: homes,
            }
        }
        else{
            sampleGetHomesResponse = {
                status: "FAILURE",
                message: "homes are not found",
            }
        }

        return sampleGetHomesResponse
    }

    getHome(reqBody, params, user_id){

        // get homes of user
        const home = this.dbHomes.find(x => {
            if(x.home_id === params.id && x.home_owner === user_id){
                return true;
            }
        });
       
        let sampleGetHomeResponse = {}
        if(home){
            sampleGetHomeResponse = {
                status: "SUCCESS",
                message: "home is found",
                user_id: user_id,
                home: home,
            }
        }
        else{
            sampleGetHomeResponse = {
                status: "FAILURE",
                message: "home is not found",
            }
        }

        return sampleGetHomeResponse
    }


    addHome(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("home_owner" && "home_name" && "country" && "state" && "city" && "neighbourhood" && "latitude" && "longitude") && fields.length < 9

        let sampleAddHomeResponse = {}
        if(fieldCheck){
            sampleAddHomeResponse = {
                status: "SUCCESS",
                message: "new home is added",
                user_id: user_id,
                home: {
                    home_id: Math.floor(Math.random()*100 +1).toString(),
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
        }
        else{
            sampleAddHomeResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleAddHomeResponse;

    }

    deleteHome(reqBody, params, user_id){

        // get homes of user
        const home = this.dbHomes.find(x => {
            if(x.home_id === params.id && x.home_owner === user_id){
                return true;
            }
        });

        let sampleDeleteHomeResponse = {}
        if(home){
            sampleDeleteHomeResponse = {
                status: "SUCCESS",
                message: "home is deleted",
                user_id: user_id,
                home: home
            }
        }
        else{
            sampleDeleteHomeResponse = {
                status: "FAILURE",
                message: "home is not found",
            }
        }

        return sampleDeleteHomeResponse;

    }
    
    updateHome(reqBody, params, user_id){

        // check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 9

        // check db
        const home = this.dbHomes.find(x => {
            if(x.home_id === params.id && x.home_owner === user_id){
                return true;
            }
        });

        let sampleUpdateHomeResponse = {}
        if(fieldCheck && home){
            sampleUpdateHomeResponse = {
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
        }
        else{
            sampleUpdateHomeResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateHomeResponse;

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