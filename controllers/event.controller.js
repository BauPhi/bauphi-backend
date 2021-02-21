const express = require('express')

const eventRouter = express.Router()

eventRouter.get('/', (req, res) => {
    res.status(200).json({
        description: "get all events"
    })
})

eventRouter.post('/', (req, res) => {
    const newEvent = req.body;
    res.status(200).json({
        description: "add a new event",
        event: newEvent
    });
})

eventRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        description: "delete a event",
        event_id: id
    })
})

eventRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const event = req.body;
    res.status(200).json({
        description: "update a event",
        event_id: id,
        event: event
    });
})

module.exports = eventRouter;