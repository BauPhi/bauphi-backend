const User = require('../models/user.model')
const user = new User()

const Home = require('../models/home.model')
const home = new Home()

const Event = require('../models/event.model')
const event = new Event()

const Announcement = require('../models/announcement.model')
const announcement = new Announcement()

const Interaction = require('../models/interaction.model')
const interaction = new Interaction()

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
                "getCloseLocation": {
                    mustFields: ["latitude", "longitude"],
                    mayFields: [],
                    sessionControl: false
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
                "getEvents": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "getEvent": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "addEvent": {
                    mustFields: ["start_time", "end_time", "type", "title", "description"],
                    mayFields: ["is_emergency", "country", "state", "city", "neighbourhood", "latitude", "longitude", "currency", "amount"],
                    sessionControl: true
                },
                "deleteEvent": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "updateEvent": {
                    mustFields: [],
                    mayFields: ["start_time", "end_time", "type", "title", "description", "is_emergency", "country", "state", "city", "neighbourhood", "latitude", "longitude", "currency", "amount"],
                    sessionControl: true
                }
            },
            "announcement": {
                "getAnnouncements": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "getAnnouncement": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "addAnnouncement": {
                    mustFields: ["phone", "title", "description", "isHuman"],
                    mayFields: ["image"],
                    sessionControl: true
                },
                "deleteAnnouncement": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "updateAnnouncement": {
                    mustFields: [],
                    mayFields: ["image", "phone", "title", "description", "isHuman"],
                    sessionControl: true
                }
            },
            "interaction": {
                "sendRequest": {
                    mustFields: ["home", "description", "home_owner"],
                    mayFields: [],
                    sessionControl: true
                },
                "sentList": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "deleteRequest": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "receivedList": {
                    mustFields: [],
                    mayFields: [],
                    sessionControl: true
                },
                "rejectRequest": {
                    mustFields: ["victim", "home"],
                    mayFields: [],
                    sessionControl: true
                },
                "acceptRequest": {
                    mustFields: ["victim", "home"],
                    mayFields: [],
                    sessionControl: true
                },
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
            sessionCheck = await session.check(sk, parentId)
            if(!sessionCheck)
                return session.sendErrorMessage()
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
            case "getCloseLocation": 
                return home.getCloseLocation(reqBody, params);
            case "addHome": 
                return home.addHome(reqBody, params, parentId);
            case "deleteHome": 
                return home.deleteHome(reqBody, params, parentId);
            case "updateHome": 
                return home.updateHome(reqBody, params, parentId);
            case "getEvents": 
                return event.getEvents(reqBody, params, parentId);
            case "getEvent": 
                return event.getEvent(reqBody, params, parentId);
            case "addEvent": 
                return event.addEvent(reqBody, params, parentId);
            case "deleteEvent": 
                return event.deleteEvent(reqBody, params, parentId);
            case "updateEvent": 
                return event.updateEvent(reqBody, params, parentId);
            case "getAnnouncements": 
                return announcement.getAnnouncements(reqBody, params, parentId);
            case "getAnnouncement": 
                return announcement.getAnnouncement(reqBody, params, parentId);
            case "addAnnouncement": 
                return announcement.addAnnouncement(reqBody, params, parentId);
            case "deleteAnnouncement": 
                return announcement.deleteAnnouncement(reqBody, params, parentId);
            case "updateAnnouncement": 
                return announcement.updateAnnouncement(reqBody, params, parentId);
            case "sendRequest": 
                return interaction.send(reqBody, params, parentId);
            case "sentList": 
                return interaction.sentList(reqBody, params, parentId);
            case "deleteRequest": 
                return interaction.delete(reqBody, params, parentId); 
            case "receivedList": 
                return interaction.receivedList(reqBody, params, parentId); 
            case "rejectRequest": 
                return interaction.rejectRequest(reqBody, params, parentId); 
            case "acceptRequest": 
                return interaction.acceptRequest(reqBody, params, parentId); 
            default:
                return {status: "validation failure"}
        }
    }


}

module.exports = Validation;