const express = require('express')

const userRouter = require('./controllers/user.controller')
const homeRouter = require('./controllers/home.controller')
const eventRouter = require('./controllers/event.controller')
const announcementRouter = require('./controllers/announcement.controller')
const interactionRouter = require('./controllers/interaction.controller')
const genericRouter = require('./controllers/generic.controller')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ description: "bauphi api route!" })
})

server.use('/api/generic', genericRouter)
server.use('/api/users', userRouter)
server.use('/api/users/:userid/homes', homeRouter)
server.use('/api/users/:userid/events', eventRouter)
server.use('/api/users/:userid/announcements', announcementRouter)
server.use('/api/users/:userid/interactions', interactionRouter)


module.exports = server;