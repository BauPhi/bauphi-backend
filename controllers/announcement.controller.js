const express = require('express')

const announcementRouter = express.Router()

announcementRouter.get('/', (req, res) => {
    res.status(200).json({
        description: "get all announcements"
    })
})

announcementRouter.post('/', (req, res) => {
    const newAnnouncement = req.body;
    res.status(200).json({
        description: "add a new announcement",
        announcement: newAnnouncement
    });
})

announcementRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        description: "delete a announcement",
        announcement_id: id
    })
})

announcementRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const announcement = req.body;
    res.status(200).json({
        description: "update a announcement",
        announcement_id: id,
        announcement: announcement
    });
})

module.exports = announcementRouter;