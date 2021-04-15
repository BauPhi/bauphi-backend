const express = require('express')
const User = require('../models/user.model')
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

userRouter.post('/google-auth', async (req, res) => {
    res.status(200).json(await validation.validateRequest(req, "user", "googleAuth"));
})

userRouter.post('/get-id', async (req, res) => {
    res.status(200).json(await new User().getSubId(req.body.access_token));
})

module.exports = userRouter;