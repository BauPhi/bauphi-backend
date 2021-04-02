const express = require('express')
const eventRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

eventRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(await validation.validateRequest(req, "event", "getEvents", user_id))
})


eventRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(await validation.validateRequest(req, "event", "getEvent", user_id))
})

eventRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(await validation.validateRequest(req, "event", "addEvent", user_id))
})

eventRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(await validation.validateRequest(req, "event", "deleteEvent", user_id))
})

eventRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('events')-1)
    res.status(200).json(await validation.validateRequest(req, "event", "updateEvent", user_id))
})

module.exports = eventRouter;