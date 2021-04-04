const express = require('express')
const genericRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

genericRouter.get('/event/:event_id/participants', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "listParticipants", req.params.event_id))
})

genericRouter.post('/auto-location', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "autoLocation"))
})

genericRouter.post('/get-close-homes', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "generic", "getCloseLocation"))
})

genericRouter.post('/get-close-events', async (req, res) => {
    req.params.type = req.query.type
    res.status(200).json(await validation.validateRequest(req, "generic", "getCloseEvents"))
})



module.exports = genericRouter;