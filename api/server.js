const express = require('express')

const userRouter = require('./controllers/user.controller')
const homeRouter = require('./controllers/home.controller')
const eventRouter = require('./controllers/event.controller')
const announcementRouter = require('./controllers/announcement.controller')
const requestRouter = require('./controllers/request.controller')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ description: "bauphi api route!" })
})

server.use('/api/users', userRouter)
server.use('/api/users/:userid/homes', homeRouter)
server.use('/api/users/:userid/events', eventRouter)
server.use('/api/users/:userid/announcements', announcementRouter)
server.use('/api/users/:userid/requests', requestRouter)


module.exports = server;