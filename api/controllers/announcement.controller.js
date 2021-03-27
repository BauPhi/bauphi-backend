const express = require('express')
const announcementRouter = express.Router()

const Validation = require('./validation.controller')
const validation = new Validation()

announcementRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(await validation.validateRequest(req, "announcement", "getAnnouncements", user_id))
})

announcementRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(await validation.validateRequest(req, "announcement", "getAnnouncement", user_id))
})


announcementRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(await validation.validateRequest(req, "announcement", "addAnnouncement", user_id))
})

announcementRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(await validation.validateRequest(req, "announcement", "deleteAnnouncement", user_id))
})

announcementRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    res.status(200).json(await validation.validateRequest(req, "announcement", "updateAnnouncement", user_id))
})

module.exports = announcementRouter;