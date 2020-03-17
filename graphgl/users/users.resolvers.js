const  db = require('../../data/dbConfig')

const users = async () => {
    const res = await db('users').select()
    return res
}

module.exports = {
    Query: {
        users: users
    },
    // Mutation: {

    // }
}