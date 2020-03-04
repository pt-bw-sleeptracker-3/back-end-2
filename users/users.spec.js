const server = require('../server')
const request = require('supertest')
const db = require('../data/dbConfig')


beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
})

describe('Register user', () => {
    it('POST /api/auth/register', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({username: 'chris', password: 'taco', name: 'chris', email: 'chris@test.com'})
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toMatchObject({message: 'success!!'})
    })
})

describe('Login user', () => {
    it('POST /api/auth/login', async () => {
        const register = await request(server)
            .post('/api/auth/register')
            .send({username: 'chris', password: 'taco', name: 'chris', email: 'chris@test.com'})
        const res = await request(server)
            .post('/api/auth/login')
            .send({username: 'chris', password: 'taco'})
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('token')
    })
})