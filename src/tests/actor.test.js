const supertest = require("supertest")
const app = require("../app")
require('../models')

let actorId;

test("POST -> '/api/v1/actors' should return status code 201",async ()=>{
    const body = {
            firstName:"Leonardo",
            lastName:"DiCaprio",
            nationality:"American",
            image:"https://intn24.lalr.co/cms/2023/06/09102029/Leonardo-DiCaprio.jpg?r=1_1",
            birthday:"11/11/1974"
    }
    const res = await supertest(app)
            .post('/api/v1/actors')
            .send(body)

    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
})

test("GET -> '/api/v1/actors' should return status code 200 and to have length is 1",async()=>{
    const res = await supertest(app).get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})



test("GET ONE -> '/api/v1/actors/:id', should return status code 200",async ()=> {
    const res = await supertest(app).get(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(200)
 
})

test("PUT -> '/api/v1/actors/:id', should return status code and res.body.name === actor.name", async()=>{
    const body = {
        firstName:"Leonardo"
    }

    const res = await supertest(app)
        .put(`/api/v1/actors/${actorId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)

})

test("DELETE -> '/api/v1/actors/:id', should return status code 204", async()=> {
    const res = await supertest(app).delete(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(204)
})