const express = require('express')
const userRouter = express.Router()

const User = require('../sample/models/user.model')
const user = new User()

const Session = require('./session.controller')
const session = new Session()

userRouter.get('/', async (req, res) => {
    res.status(200).json(await user.getAllUsers(req.body, req.params))
})

userRouter.get('/:id', async (req, res) => {
    res.status(200).json(await user.getUser(req.body, req.params))
})

userRouter.post('/', async (req, res) => {
    res.status(200).json(await user.addUser(req.body, req.params));
})

userRouter.delete('/:id', async (req, res) => {
    var sk = req.get("session_key")
    if(session.check(sk, req.params.id)) 
        res.status(200).json(await user.deleteUser(req.body, req.params))
    else 
        res.status(200).json(session.sendErrorMessage())
    
})

userRouter.patch('/:id', async (req, res) => {
    var sk = req.get("session_key")
    if(session.check(sk, req.params.id)) 
        res.status(200).json(await user.updateUser(req.body, req.params))
    else 
        res.status(200).json(session.sendErrorMessage())
})

userRouter.post('/login', async (req, res) => {
    res.status(200).json(await user.login(req.body, req.params));
})

module.exports = userRouter;