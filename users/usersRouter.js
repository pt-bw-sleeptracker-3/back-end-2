const router = require('express').Router()
const db = require('./usersModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req,res) => {
    const user = req.body
    !user.username || !user.password || !user.email || !user.name ?
        res.status(403).json({message: 'Please provide all reqired fields (username, password, email, name)'}) :
    db.insert({...user, password: bcrypt.hashSync(user.password, 4)})
        .then(userId => {
            db.findById(userId)
                .then(user => {
                    res.status(201).json({...user, message: 'success!!'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({message: 'unable to get new user'})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to register new user'})
        })
})

router.post('/login', (req,res) => {
    const { username, password } = req.body
    !username || !password ?
        res.status(403).json({message: 'please provide username and password'}) :
    db.findByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({...user, token: token})
            }else {
                res.status(403).json({message: 'token not valid'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to login user'})
        })
})

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router