const express = require('express')
const homeRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Home = require('../sample/models/home.model')
const home = new Home()

homeRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.getHomes(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.post('/autoLocation', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.autoLocation(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.getHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.addHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.deleteHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

homeRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(home.updateHome(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = homeRouter;