const express = require('express')

const Announcement = require('../sample/models/announcement.model')

const announcementRouter = express.Router()

const announcement = new Announcement()

announcementRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(announcement.getAnnouncements(req.body, req.params, user_id))
})

announcementRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(announcement.getAnnouncement(req.body, req.params, user_id))
})


announcementRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(announcement.addAnnouncement(req.body, req.params, user_id))
})

announcementRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(announcement.deleteAnnouncement(req.body, req.params, user_id))
})

announcementRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(announcement.updateAnnouncement(req.body, req.params, user_id))
})

module.exports = announcementRouter;