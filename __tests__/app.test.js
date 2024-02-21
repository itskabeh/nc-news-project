const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app")
const request = require("supertest")
const apiEndpointsJSON = require('../endpoints.json')
const toBeSortedBy = require("jest-sorted")

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


describe("GET /api/articles/:article_id", () => {
    test("responds with a 200 status code", () => {
        return request(app).get("/api/articles/3").expect(200)
            .then((res) => {
                expect(res.body.article.article_id).toBe(3)
                const numCreatedAt = new Date(res.body.article.created_at).getTime()
                expect(numCreatedAt).toBe(1604394720000)
                expect(res.body.article.article_img_url).toEqual("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
            })
    })
})

describe("GET /api/articles", () => {
    test('GET:article should return articles sorted in age order desc', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const articles = response.body.articles
            expect(Array.isArray(articles)).toBe(true)            
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true, })
            
            articles.forEach((article) => {
                expect(article).toHaveProperty("author"),
                expect(typeof article.author).toBe('string');
                expect(article).toHaveProperty("title")
                expect(typeof article.title).toBe('string');
                expect(article).toHaveProperty("article_id")
                expect(typeof article.article_id).toBe('number');
                expect(article).toHaveProperty("topic")
                expect(typeof article.topic).toBe('string');
                expect(article).toHaveProperty("created_at")
                expect(typeof article.created_at).toBe('string');
                expect(article).toHaveProperty("votes")
                expect(typeof article.votes).toBe('number');
                expect(article).toHaveProperty("article_img_url")
                expect(typeof article.article_img_url).toBe('string');
                expect(article).toHaveProperty("comment_count")
                expect(typeof parseInt(article.comment_count)).toBe('number');
            })
        });
    })
})


