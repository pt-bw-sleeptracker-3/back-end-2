const router = require('express').Router()
const db = require('./usersModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    }
    const options = {
        expiresIn ='1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router