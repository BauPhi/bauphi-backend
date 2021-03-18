const express = require('express')
const eventRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Event = require('../sample/models/event.model')
const event = new Event()

eventRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(event.getEvents(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(event.getEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})


eventRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(event.addEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(event.deleteEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(event.updateEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = eventRouter;