const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/usersRouter')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', userRouter)

server.get('/', (req,res) => {
    res.status(200).json({message: 'Server for Sleep Tracker is up and running'})
})

module.exports = server