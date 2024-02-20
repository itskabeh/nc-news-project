const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app")
const request = require("supertest")
// const fs = require('fs')
const apiEndpointsJSON = require('../endpoints.json')
//const sorted = require("sorted")

beforeEach(() => { return seed(data) })
afterAll(() => db.end()); 


describe("GET /api/healthcheck" , ()=> {
    test("responds with a 200 status code" ,()=> {
        return request(app).get("/api/healthcheck").expect(200)
    })
})


describe('GET /api/topics', () => {
    describe('behaviours', () => {
        test('responds with 200 status code when accessing topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200).then((response) => {
                
                    const topics = response.body.topics;
                    expect(topics.length).toBe(3);
                    expect(Array.isArray(topics)).toBe(true);
                    topics.forEach((topic) => {
                        expect(topic).toHaveProperty("slug"),
                            expect(typeof topic.slug).toBe('string');
                        expect(topic).toHaveProperty("description")
                        expect(typeof topic.description).toBe('string');
                   
                    })
                })
        })
    })
    describe('error handling', () => {
        test('responds with a 404 status when given a valid but non-existent endpoint', () => {
            return request(app)
                .get('/api/topicssss')
                .expect(404)
        })
    })
})



describe('GET /api', () => {
    describe('behaviours', () => {
        test('retrieves data from the endpoints file with the correct properties', () => {
            return request(app)
                .get('/api')
                .expect(200).then((response) => {
                    expect(response.body).toEqual(apiEndpointsJSON)
                    expect(response.body['GET /api'])
                        .toEqual
                        ({ "description": "serves up a json representation of all the available endpoints of the api" })
                    expect(response.body['GET /api/topics'])
                        .toEqual
                        ({
                            "description": "serves an array of all topics",
                            "queries": [],
                            "exampleResponse": {
                                "topics": [{ "slug": "football", "description": "Footie!" }]
                            }
                        })
                })
        })
    })
})
    



            
