class Home {
    constructor(){
        this.dbHomes = [
            {
                home_id: "1",
                home_owner: "1",
                country: "Turkey",
                area: "Marmara Bölgesi",
                city: "İstanbul",
                neighbourhood: "Zekeriyaköy Mah. X Cad. Y Sok. No: 1/2 Sarıyer",
                latitude: "41.201170",
                longitude: "29.032128"
            },
            {
                home_id: "2",
                home_owner: "2",
                country: "Turkey",
                area: "Karadeniz Bölgesi",
                city: "Kastamonu",
                neighbourhood: "Aktekke Mah. X Cad. Y Sok. No: 1/2 Merkez",
                latitude: "41.381227",
                longitude: "33.782458"
            },
            {
                home_id: "3",
                home_owner: "1",
                country: "Turkey",
                area: "Marmara Bölgesi",
                city: "İstanbul",
                neighbourhood: "İncirköy Mah. X Cad. Y Sok. No: 1/2 Beykoz",
                latitude: "41.121082",
                longitude: "29.122104"
            },
            {
                home_id: "4",
                home_owner: "3",
                country: "Turkey",
                area: "Akdeniz Bölgesi",
                city: "Mersin",
                neighbourhood: "Selçuklar Mah. X Cad. Y Sok. No: 1/2 Toroslar",
                latitude: "36.821536",
                longitude: "34.624811"
            }
        ]
    }

    getHomes(reqBody, params, user_id){
        // SESSION KEY CONTROL
        const key = reqBody.session_key;

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
        // SESSION KEY CONTROL
        const key = reqBody.session_key;

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
        // SESSION KEY CONTROL
        const key = reqBody.session_key;

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("session_key" && "home_owner" && "home_name" && "country" && "area" && "city" && "neighbourhood" && "latitude" && "longitude") && fields.length < 10

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
                    area: reqBody.area,
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
        // SESSION KEY CONTROL
        const key = reqBody.session_key;

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
        // SESSION KEY CONTROL
        const key = reqBody.session_key;

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
                    area: reqBody.area,
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

}

module.exports = Home;