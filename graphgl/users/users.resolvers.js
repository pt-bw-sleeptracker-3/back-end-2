import db from '../../data/dbConfig'

const users = async () => {
    const res = await db('users').select()
    return res
}

export default {
    Query: {
        users: users
    },
    // Mutation: {

    // }
}