const express = require('express')
const genericRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

genericRouter.get('/event/:event_id/participants', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "listParticipants", req.params.event_id))
})

genericRouter.post('/autoLocation', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "autoLocation"))
})

genericRouter.get('/getCloseLocation', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "getCloseLocation"))
})

module.exports = genericRouter;