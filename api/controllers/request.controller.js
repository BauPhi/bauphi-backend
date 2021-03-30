const express = require('express')
const requestRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

requestRouter.get('/sentlist', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "sentList", user_id))
})

requestRouter.get('/receivedlist', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "receivedList", user_id))
})

requestRouter.post('/send', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "sendRequest", user_id))
})

requestRouter.delete('/delete/:home_id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "deleteRequest", user_id))
})

requestRouter.patch('/reject', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "rejectRequest", user_id))
})


requestRouter.patch('/accept', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('requests')-1)
    res.status(200).json(await validation.validateRequest(req, "request", "acceptRequest", user_id))
})




module.exports = requestRouter;