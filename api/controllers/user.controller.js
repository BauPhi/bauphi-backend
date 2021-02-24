const express = require('express')

const User = require('../sample/models/user.model')

const userRouter = express.Router()

const user = new User()

userRouter.get('/', (req, res) => {
    // check if request is valid
    res.status(200).json(user.getAllUsers(req.body, req.params))
})

userRouter.post('/', (req, res) => {
    // check if request is valid
    res.status(200).json(user.addUser(req.body, req.params));
})

userRouter.delete('/:id', (req, res) => {
    res.status(200).json(user.deleteUser(req.body, req.params))
})

userRouter.patch('/:id', (req, res) => {
    res.status(200).json(user.updateUser(req.body, req.params));
})

userRouter.post('/login', (req, res) => {
    res.status(200).json(user.login(req.body, req.params));
})

module.exports = userRouter;