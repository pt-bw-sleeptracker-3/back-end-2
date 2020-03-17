const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userSchema = require('./graphgl/users/users.gql')
const userResolvers = require('./graphgl/users/users.resolvers')

const { ApolloServer, graphqlExpress } = require('apollo-server-express')

const userRouter = require('./users/usersRouter')
const sleepRouter = require('./sleepRoutes/sleepRouter')

const middleware = require('./middleware')

const server = express()

// const rootSchema = `
// schema {
//     query: Query
//     mutation: Mutation
// }
// `

const typeDefs =[...userSchema]
const resolvers = userResolvers

const gqlApi = new ApolloServer({typeDefs, resolvers})


server.use(helmet())
server.use(express.json())
server.use(cors())
gqlApi.applyMiddleware({ app: server, path: '/graphql' })
// server.use('/graphql', gqlApi)
server.use('/api/auth', userRouter)
server.use('/api/sleep-data',middleware.validateToken, sleepRouter)

server.get('/', (req,res) => {
    res.status(200).json({message: 'Server for Sleep Tracker is up and running'})
})


module.exports = server