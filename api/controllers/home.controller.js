const express = require('express')

const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    res.status(200).json({
        description: "get all homes of a user",
        user_id: user_id
    })
})

homeRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    const newHome = req.body;
    res.status(200).json({
        description: "add a new home",
        user_id: user_id,
        home: newHome
    });
})

homeRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    const { id } = req.params;
    res.status(200).json({
        description: "delete a home",
        user_id: user_id,
        home_id: id
    })
})

homeRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('homes')-1)
    const { id } = req.params;
    const home = req.body;
    res.status(200).json({
        description: "update a home",
        user_id: user_id,
        home_id: id,
        home: home
    });
})

module.exports = homeRouter;