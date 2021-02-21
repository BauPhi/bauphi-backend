const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.status(200).json({
        description: "get all users"
    })
})

userRouter.post('/', (req, res) => {
    const newUser = req.body;
    res.status(200).json({
        description: "add a new user",
        user: newUser
    });
})

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        description: "delete a user",
        user_id: id
    })
})

userRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    res.status(200).json({
        description: "update a user",
        user_id: id,
        user: user
    });
})

module.exports = userRouter;