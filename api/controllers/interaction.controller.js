const express = require('express')
const interactionRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

interactionRouter.get('/sent-request-list', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "sentList", user_id))
})

interactionRouter.get('/received-request-list', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "receivedList", user_id))
})

interactionRouter.post('/send-request', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "sendRequest", user_id))
})

interactionRouter.delete('/delete-request/:home_id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "deleteRequest", user_id))
})

interactionRouter.patch('/reject-request', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "rejectRequest", user_id))
})


interactionRouter.patch('/accept-request', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "acceptRequest", user_id))
})


interactionRouter.post('/join-event', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "joinEvent", user_id))
})


interactionRouter.delete('/cancel-participation/:event_id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('interactions')-1)
    res.status(200).json(await validation.validateRequest(req, "interaction", "cancelParticipation", user_id))
})

module.exports = interactionRouter;