const express = require('express')
const eventRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Event = require('../sample/models/event.model')
const event = new Event()

eventRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await event.getEvents(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await event.getEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})


eventRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await event.addEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await event.deleteEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

eventRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await event.updateEvent(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = eventRouter;