const express = require('express')
const userRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

userRouter.get('/', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "getAllUsers"))
})

userRouter.get('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "getUser"))
})

userRouter.post('/', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "addUser"));
})

userRouter.delete('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "deleteUser"))
})

userRouter.patch('/:id', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "updateUser"))
})

userRouter.post('/login', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "login"));
})

module.exports = userRouter;