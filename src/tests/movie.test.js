const supertest = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

let movieId;

test("POST -> '/api/v1/movies' should return status code 201 and rest.body.name === body.name", async () => {
  const body = {
    name: "Titanic",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTO4uDn64PLOGg3ECiPApplZ_SI6n3ZTGYfQLxYpA1GeFPxYqaT",
    synopsis:
      "Jack es un joven artista que gana un pasaje para viajar a América en el Titanic, el transatlántico más grande y seguro jamás construido.",
    releaseYear: 1996,
  };
  const res = await supertest(app).post("/api/v1/movies").send(body);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("GET -> '/api/v1/movies' should return status code 200 and res.body.length === 1", async () => {
  const res = await supertest(app).get("/api/v1/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
});

test("GET ONE -> '/api/v1/movies/:id', should return status code 200", async () => {
  const res = await supertest(app).get(`/api/v1/movies/${movieId}`);
  expect(res.status).toBe(200);
});

test("PUT -> '/api/v1/movies/:id', should return status code and res.body.name ==== movie.name", async () => {
  const body = {
    name: "Titanic",
  };

  const res = await supertest(app).put(`/api/v1/movies/${movieId}`).send(body);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

// /movies/:id/genres

test("POST -> '/api/v1/movies/:id/genres', should return status code 200 and res.body.length === 1", async () => {
  const genreBody = {
    name: "Drama",
  };

  const genre = await Genre.create(genreBody);
  const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/genres`)
    .send([genre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await genre.destroy();
});

// /movies/:id/actors

test("POST -> '/api/v1/movies/:id/actors', should return status code 200 and res.body.length === 1", async () => {
    const actorBody = {
        firstName:"Leonardo",
        lastName:"DiCaprio",
        nationality:"American",
        image:"https://intn24.lalr.co/cms/2023/06/09102029/Leonardo-DiCaprio.jpg?r=1_1",
        birthday:"11/11/1974"
    }
  
    const actor = await Actor.create(actorBody);
    const res = await supertest(app)
      .post(`/api/v1/movies/${movieId}/actors`)
      .send([actor.id]);
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  
    await actor.destroy();
  });

// /movies/:id/directors

test("POST -> '/api/v1/movies/:id/directors', should return status code 200 and res.body.length === 1", async () => {
    const directorBody = {
        firstName:"James",
        lastName:"Cameron",
        nationality:"American",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/James_Cameron_October_2012.jpg/220px-James_Cameron_October_2012.jpg",
        birthday:"07/16/1954"
    }
  
    const director = await Director.create(directorBody);
    const res = await supertest(app)
      .post(`/api/v1/movies/${movieId}/directors`)
      .send([director.id]);
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  
    await director.destroy();
  });

test("DELETE -> '/api/v1/movies/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/movies/${movieId}`);
  expect(res.status).toBe(204);
});
