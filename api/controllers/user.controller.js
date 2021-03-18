const express = require('express')
const userRouter = express.Router()

const User = require('../sample/models/user.model')
const user = new User()

const Session = require('./session.controller')
const session = new Session()

userRouter.get('/', (req, res) => {
    res.status(200).json(user.getAllUsers(req.body, req.params))
})

userRouter.get('/:id', (req, res) => {
    res.status(200).json(user.getUser(req.body, req.params))
})

userRouter.post('/', (req, res) => {
    res.status(200).json(user.addUser(req.body, req.params));
})

userRouter.delete('/:id', (req, res) => {
    var sk = req.get("session_key")
    if(session.check(sk, req.params.id)) 
        res.status(200).json(user.deleteUser(req.body, req.params))
    else 
        res.status(200).json(session.sendErrorMessage())
    
})

userRouter.patch('/:id', (req, res) => {
    var sk = req.get("session_key")
    if(session.check(sk, req.params.id)) 
        res.status(200).json(user.deleteUser(req.body, req.params))
    else 
        res.status(200).json(session.sendErrorMessage())
})

userRouter.post('/login', (req, res) => {
    res.status(200).json(user.login(req.body, req.params));
})

module.exports = userRouter;