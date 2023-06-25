const supertest = require("supertest")
const app = require("../app")
require('../models')

let directorId;

test("POST -> '/api/v1/directors' should return status code 201",async ()=>{
    const body = {
            firstName:"James",
            lastName:"Cameron",
            nationality:"American",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/James_Cameron_October_2012.jpg/220px-James_Cameron_October_2012.jpg",
            birthday:"07/16/1954"
    }
    const res = await supertest(app)
            .post('/api/v1/directors')
            .send(body)

    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)

})

test("GET -> '/api/v1/directors' should return status code 200 and to have length is 1",async()=>{
    const res = await supertest(app).get('/api/v1/directors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})



test("GET ONE -> '/api/v1/directors/:id', should return status code 200",async ()=> {
    const res = await supertest(app).get(`/api/v1/directors/${directorId}`)
    expect(res.status).toBe(200)
 
})

test("PUT -> '/api/v1/directors/:id', should return status code and res.body.firstName === director.firstName", async()=>{
    const body = {
        firstName:"James"
    }

    const res = await supertest(app)
        .put(`/api/v1/directors/${directorId}`)
        .send(body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)

})

test("DELETE -> '/api/v1/directors/:id', should return status code 204", async()=> {
    const res = await supertest(app).delete(`/api/v1/directors/${directorId}`)
    expect(res.status).toBe(204)
})

