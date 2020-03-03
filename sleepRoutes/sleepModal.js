const db = require('../data/dbConfig')

module.exports = {
    find,
    findById,
    findByUserId,
    insert,
    update,
    remove
}

function find() {
    return db('sleepData')
}

function findById(id) {
    return db('sleepData').where({ id })
        .then(([data]) => data)
}

function findByUserId(user_id) {
    return db('sleepData').where({ user_id })
}

function insert(data) {
    return db('sleepData').insert(data, 'id')
        .then(([id]) => id)
}

function update(id, data) {
    return db('sleepData').where({ id }).update(data)
}

function remove(id) {
    return db('sleepData').where({ id }).del()
}