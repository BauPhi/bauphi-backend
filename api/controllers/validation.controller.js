const User = require('../sample/models/user.model')
const user = new User()

const Session = require('./session.controller')
const session = new Session()

class Validation {
    constructor(){
        this.requests = {
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
        }
    }

    async validateRequest(req, reqName){

        var reqBody = req.body;
        var params = req.params;
        var errMsg = ""

        var sessionCheck = true
        if(this.requests[reqName].sessionControl){
            var sk = req.get("session_key")
            sessionCheck = session.check(sk, req.params.id)
            if(!sessionCheck){
                sessionCheck = false
                errMsg = "session key is wrong"
            }
        }
        

        const fields = Object.keys(reqBody)
        var fieldCheck = fields.length <= (this.requests[reqName].mustFields.length + this.requests[reqName].mayFields.length) && fields.length >= (this.requests[reqName].mustFields.length)
        
        if(fieldCheck){
            for(var f in fields){
                if(!this.requests[reqName].mustFields.includes(fields[f])){
                    if(!this.requests[reqName].mayFields.includes(fields[f])){
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
            return this.redirect(reqBody, params, reqName)
        }
        else{
            return {
                "status": "FAILURE",
                "message": errMsg
            }
        }
    }

    async redirect(reqBody, params, reqName){
        switch(reqName){
            case "getAllUsers": 
                return user.getAllUsers(reqBody, params, reqName);
            case "getUser": 
                return user.getUser(reqBody, params, reqName);
            case "addUser": 
                return user.addUser(reqBody, params, reqName);
            case "deleteUser": 
                return user.deleteUser(reqBody, params, reqName);
            case "updateUser": 
                return user.updateUser(reqBody, params, reqName);
            case "login": 
                return user.login(reqBody, params, reqName);
            default:
                return {status: "validation failure"}
        }
    }


}

module.exports = Validation;