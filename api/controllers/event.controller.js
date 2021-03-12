const express = require('express')

const Event = require('../sample/models/event.model')

const eventRouter = express.Router()

const event = new Event()

eventRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(event.getEvents(req.body, req.params, user_id))
})

eventRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(event.getEvent(req.body, req.params, user_id))
})


eventRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(event.addEvent(req.body, req.params, user_id))
})

eventRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(event.deleteEvent(req.body, req.params, user_id))
})

eventRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(event.updateEvent(req.body, req.params, user_id))
})

module.exports = eventRouter;