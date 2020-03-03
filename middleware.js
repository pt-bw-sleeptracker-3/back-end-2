const jwt = require('jsonwebtoken')
const db = require('./sleepRoutes/sleepModal')
const userDb = require('./users/usersModal')

module.exports = {
    validateToken,
    validateId,
    validateUserId
}

function validateToken(req,res,next) {
    const token = req.headers.authorization
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'Token not valid'})
            }else{
                req.user = decodedToken
                next()
            }
        })
    }else{
        res.status(403).json({message: 'please provide a token for protected routes'})
    }
}

function validateId(req,res,next) {
    db.findById(req.params.id)
        .then(id => {
            id ?
            next() :
            res.status(403).json({message: 'sleep data with given id does not exist'})
        })
}

function validateUserId(req,res,next) {
    userDb.findById(req.body.user_id)
        .then(user => {
            user ?
            db.findByUserId(user.id)
                .then(id => {
                    id ? 
                    next() :
                    res.status(403).json({message: 'user has no sleep data stored'})
                }) :
            res.status(403).json({message: 'user with given id does not exist'})
        })
}