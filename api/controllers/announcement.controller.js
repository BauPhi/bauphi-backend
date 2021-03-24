const express = require('express')
const announcementRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Announcement = require('../sample/models/announcement.model')
const announcement = new Announcement()

announcementRouter.get('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(await announcement.getAnnouncements(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.get('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(await announcement.getAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})


announcementRouter.post('/', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(await announcement.addAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.delete('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(await announcement.deleteAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.patch('/:id', async (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(await announcement.updateAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = announcementRouter;