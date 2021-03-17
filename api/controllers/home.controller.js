const express = require('express')

const Home = require('../sample/models/home.model')

const homeRouter = express.Router()

const home = new Home()

homeRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(home.getHomes(req.body, req.params, user_id))
})

homeRouter.post('/autoLocation', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(await home.autoLocation(req.body, req.params, user_id))
})

homeRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(home.getHome(req.body, req.params, user_id))
})

homeRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(home.addHome(req.body, req.params, user_id))
})

homeRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(home.deleteHome(req.body, req.params, user_id))
})

homeRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json(home.updateHome(req.body, req.params, user_id))
})

module.exports = homeRouter;