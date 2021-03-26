const express = require('express')
const homeRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

homeRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "getHomes", user_id))
})

homeRouter.post('/autoLocation', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "autoLocation", user_id))
})

homeRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "getHome", user_id))
})

homeRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "addHome", user_id))
})

homeRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "deleteHome", user_id))
})

homeRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await validation.validateRequest(req, "home", "updateHome", user_id))
})

module.exports = homeRouter;