const express = require('express')
const userRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

userRouter.get('/', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "getAllUsers"))
})

userRouter.get('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "getUser"))
})

userRouter.post('/', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "addUser"));
})

userRouter.delete('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "deleteUser"))
})

userRouter.patch('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "updateUser"))
})

userRouter.post('/login', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "login"));
})

module.exports = userRouter;