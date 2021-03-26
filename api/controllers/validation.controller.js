const User = require('../sample/models/user.model')
const user = new User()

const Home = require('../sample/models/home.model')
const home = new Home()

const Session = require('./session.controller')
const session = new Session()

class Validation {
    constructor(){
        this.requests = {
            "user": {
                "getAllUsers": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: false
                },
                "getUser": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: false
                },
                "addUser": {
                    mustFields: ["name", "surname", "password", "email" ,"phone"],
                    mayFields: [],
                    sessionControl: false
                },
                "deleteUser": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "updateUser": {
                    mustFields: [],
                    mayFields: ["name", "surname", "password", "email" ,"phone"],
                    sessionControl: true
                },
                "login": {
                    mustFields: ["email", "password"],
                    mayFields: [],
                    sessionControl: false
                }
            },
            "home": {
                "getHomes": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "getHome": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "addHome": {
                    mustFields: ["home_owner", "home_name", "isVisible", "country", "state", "city", "neighbourhood", "latitude", "longitude"],
                    mayFields: [],
                    sessionControl: true
                },
                "deleteHome": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "updateHome": {
                    mustFields: [],
                    mayFields: ["home_owner", "home_name", "isVisible", "country", "state", "city", "neighbourhood", "latitude", "longitude"],
                    sessionControl: true
                },
                "autoLocation": {
                    mustFields: ["latitude", "longitude"],
                    mayFields: [],
                    sessionControl: true
                }
            },
            "event": {

            },
            "announcement": {

            }
            
        }
    }

    async validateRequest(req, controller, reqName, parentId){

        var reqBody = req.body;
        var params = req.params;
        var errMsg = ""

        var sessionCheck = true
        if(this.requests[controller][reqName].sessionControl){
            var sk = req.get("session_key")
            sessionCheck = session.check(sk, req.params.id)
            if(!sessionCheck){
                sessionCheck = false
                errMsg = "session key is wrong"
            }
        }
        

        const fields = Object.keys(reqBody)
        var fieldCheck = fields.length <= (this.requests[controller][reqName].mustFields.length + this.requests[controller][reqName].mayFields.length) && fields.length >= (this.requests[controller][reqName].mustFields.length)
        
        if(fieldCheck){
            for(var f in fields){
                if(!this.requests[controller][reqName].mustFields.includes(fields[f])){
                    if(!this.requests[controller][reqName].mayFields.includes(fields[f])){
                        fieldCheck = false
                        errMsg = errMsg + "request fields are wrong ::"
                        break
                    }
                }
            }
        }
        else{
            errMsg = errMsg + "request's field number is wrong :::"
        }

        

        if(sessionCheck && fieldCheck){
            return this.redirect(reqBody, params, reqName, parentId)
        }
        else{
            return {
                "status": "FAILURE",
                "message": errMsg
            }
        }
    }

    async redirect(reqBody, params, reqName, parentId){
        switch(reqName){
            case "getAllUsers": 
                return user.getAllUsers(reqBody, params);
            case "getUser": 
                return user.getUser(reqBody, params);
            case "addUser": 
                return user.addUser(reqBody, params);
            case "deleteUser": 
                return user.deleteUser(reqBody, params);
            case "updateUser": 
                return user.updateUser(reqBody, params);
            case "login": 
                return user.login(reqBody, params);
            case "getHomes": 
                return home.getHomes(reqBody, params, parentId);
            case "getHome": 
                return home.getHome(reqBody, params, parentId);
            case "autoLocation": 
                return home.autoLocation(reqBody, params, parentId);
            case "addHome": 
                return home.addHome(reqBody, params, parentId);
            case "deleteHome": 
                return home.deleteHome(reqBody, params, parentId);
            case "updateHome": 
                return home.updateHome(reqBody, params, parentId);
            default:
                return {status: "validation failure"}
        }
    }


}

module.exports = Validation;