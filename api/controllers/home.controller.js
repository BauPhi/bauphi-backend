const express = require('express')
const homeRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Home = require('../sample/models/home.model')
const home = new Home()

homeRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.getHomes(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.post('/autoLocation', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.autoLocation(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.getHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.addHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.deleteHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await home.updateHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = homeRouter;