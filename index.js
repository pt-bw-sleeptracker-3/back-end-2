require('dotenv').config()



const server = require('./server')

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})