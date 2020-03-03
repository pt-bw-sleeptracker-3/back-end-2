const router = require('express').Router()
const db = require('./sleepModal')
const middleware = require('../middleware')
const { validateId } = require('../middleware')


router.get('/', (req,res) => {
    db.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to get all sleep data'})
        })
})

router.get('/:id',middleware.validateId, (req,res) => {
    db.findById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to find sleep data by id'})
        })
})

router.get('/user/:id', (req,res) => {
    db.findByUserId(req.params.id)
        .then(data => {
            data[0] ?
            res.status(200).json(data) : 
            res.status(403).json({message: 'cannot find any user data'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to get sleep data by user id'})
        })
})

router.post('/',middleware.validateUserId, (req,res) => {
    db.insert(req.body)
        .then(id => {
            db.findById(id)
                .then(data => {
                    res.status(201).json({message: 'success', data})
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({message: 'unable to find new sleep data'})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to add sleep data'})
        })
})

router.put('/:id',middleware.validateId, (req,res) => {
    db.update(req.params.id, req.body)
        .then(id => {
            db.findById(id)
                .then(data => {
                    res.status(203).json({message: 'update success', data})
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({message: 'unable to find updated data'})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to update sleep data'})
        })
})

router.delete('/:id',middleware.validateId, (req,res) => {
    db.remove(req.params.id)
        .then(id => {
            res.status(203).json({message:'deleted successfully', recordsRemoved: id})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to delete sleep data'})
        })
})

module.exports = router