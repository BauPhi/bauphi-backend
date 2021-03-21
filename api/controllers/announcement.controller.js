const express = require('express')
const announcementRouter = express.Router()

const Session = require('./session.controller')
const session = new Session()

const Announcement = require('../sample/models/announcement.model')
const announcement = new Announcement()

announcementRouter.get('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key") 
    if(session.check(sk, user_id)) 
        res.status(200).json(announcement.getAnnouncements(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.get('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(announcement.getAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})


announcementRouter.post('/', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(announcement.addAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.delete('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(announcement.deleteAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

announcementRouter.patch('/:id', (req, res) => {
    const url = req.baseUrl.substring();
    const user_id = url.substring(11, url.lastIndexOf('announcements')-1)
    
    var sk = req.get("session_key")
    if(session.check(sk, user_id)) 
        res.status(200).json(announcement.updateAnnouncement(req.body, req.params, user_id))
    else 
        res.status(200).json(session.sendErrorMessage())
})

module.exports = announcementRouter;