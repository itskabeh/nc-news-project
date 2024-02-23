/** @format */

const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const app = require("../app");
const request = require("supertest");
const apiEndpointsJSON = require("../endpoints.json");

beforeEach(() => {
	return seed(data);
});
afterAll(() => db.end());

//// question 1 getStatus

describe("GET /api/healthcheck", () => {
	test("responds with a 200 status code", () => {
		return request(app).get("/api/healthcheck").expect(200);
	});
});

//// question 2 getTopics

describe("GET /api/topics", () => {
	describe("behaviours", () => {
		test("responds with 200 status code when accessing topics", () => {
			return request(app)
				.get("/api/topics")
				.expect(200)
				.then((response) => {
					const topics = response.body.topics;
					expect(topics.length).toBe(3);
					expect(Array.isArray(topics)).toBe(true);
					topics.forEach((topic) => {
						expect(topic).toHaveProperty("slug"),
							expect(typeof topic.slug).toBe("string");
						expect(topic).toHaveProperty("description");
						expect(typeof topic.description).toBe("string");
					});
				});
		});
	});
	describe("error handling", () => {
		test("responds with a 404 status when given a valid but non-existent endpoint", () => {
			return request(app).get("/api/topicssss").expect(404);
		});
	});
});

//// question 3 getAPI

describe("GET /api", () => {
	describe("behaviours", () => {
		test("retrieves data from the endpoints file with the correct properties", () => {
			return request(app)
				.get("/api")
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(apiEndpointsJSON);
					expect(response.body["GET /api"]).toEqual({
						description:
							"serves up a json representation of all the available endpoints of the api",
					});
					expect(response.body["GET /api/topics"]).toEqual({
						description: "serves an array of all topics",
						queries: [],
						exampleResponse: {
							topics: [{ slug: "football", description: "Footie!" }],
						},
					});
				});
		});
	});
});

//// question 4 getArticleById

describe("GET /api/articles/:article_id", () => {
	test("responds with a 200 status code", () => {
		return request(app)
			.get("/api/articles/3")
			.expect(200)
			.then((res) => {
				expect(res.body.article.article_id).toBe(3);
				const numCreatedAt = new Date(res.body.article.created_at).getTime();
				expect(numCreatedAt).toBe(1604394720000);
				expect(res.body.article.article_img_url).toEqual(
					"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
				);
			});
	});
});

//// question 5 getArticles and question 11 get articles by topic

describe("GET /api/articles", () => {
	describe("behaviours", () => {
		test("GET:article should return all articles and they should be sorted in age order desc", () => {
			return request(app)
				.get("/api/articles")
				.expect(200)
				.then((response) => {
					const articles = response.body.articles;
					expect(Array.isArray(articles)).toBe(true);
					expect(articles).toBeSortedBy("created_at", { descending: true });

					articles.forEach((article) => {
						expect(article).not.toHaveProperty("body");
						expect(article).toHaveProperty("author"),
							expect(typeof article.author).toBe("string");
						expect(article).toHaveProperty("title");
						expect(typeof article.title).toBe("string");
						expect(article).toHaveProperty("article_id");
						expect(typeof article.article_id).toBe("number");
						expect(article).toHaveProperty("topic");
						expect(typeof article.topic).toBe("string");
						expect(article).toHaveProperty("created_at");
						expect(typeof article.created_at).toBe("string");
						expect(article).toHaveProperty("votes");
						expect(typeof article.votes).toBe("number");
						expect(article).toHaveProperty("article_img_url");
						expect(typeof article.article_img_url).toBe("string");
						expect(article).toHaveProperty("comment_count");
						expect(typeof article.comment_count).toBe("number");
					});
				});
		});
	});
	describe("error handling", () => {
		test("responds with a 404 status when given a valid but non-existent endpoint", () => {
			return request(app).get("/api/article").expect(404);
		});
	});
    
});


//// question 6 getCommentsByArticle

describe("GET '/api/articles/:article_id/comments'", () => {
	test("GET:commentsByArticleId should return comments associated with the passed article sorted by most recent first", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then((response) => {
				const comments = response.body;

				expect(Array.isArray(comments)).toBe(true);
				expect(comments).toBeSortedBy("created_at", { descending: true });
				expect(comments.length).toBe(11);

				comments.forEach((comment) => {
					expect(comment).toHaveProperty("comment_id");
					expect(typeof comment.comment_id).toBe("number");
					expect(comment).toHaveProperty("votes");
					expect(typeof comment.votes).toBe("number");
					expect(comment).toHaveProperty("created_at");
					expect(typeof comment.created_at).toBe("string");
					expect(comment).toHaveProperty("author");
					expect(typeof comment.author).toBe("string");
					expect(comment).toHaveProperty("body");
					expect(typeof comment.body).toBe("string");
					expect(comment).toHaveProperty("article_id");
					expect(typeof comment.article_id).toBe("number");
				});
			});
	});

	describe("edge cases", () => {
		test("responds with an empty array if there are no comments for the specified article", () => {
			return request(app)
				.get("/api/articles/7/comments")
				.expect(200)
				.then((response) => {
					const comments = response.body;
					expect(comments).toEqual([]);
				});
		});
	});
	describe("error handling", () => {
		test("responds with a 400 status when given an invalid endpoint", () => {
			return request(app)
				.get("/api/articles/forklift/comments")
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});

		test("responds with a 404 status when given a valid but non-existent endpoint", () => {
			return request(app).get("/api/articles/1/comment").expect(404);
		});
	});
});

//// question 7 postCommentOnArticle

describe("POST /api/articles/:article_id/comments", () => {
	test("POST:201 inserts a new comment to the db and sends the updated comments back to the client", () => {
		const newComment = {
			username: "rogersop",
			body: "Wow. I, for one, am shocked and appalled!!!",
		};
		return request(app)
			.post("/api/articles/4/comments")
			.send(newComment)
			.expect(201)
			.then((response) => {
				expect(response.body.comment.article_id).toBe(4);
				expect(response.body.comment.author).toBe("rogersop");
				expect(response.body.comment.body).toBe(
					"Wow. I, for one, am shocked and appalled!!!"
				);
			});
	});
	describe("error handling", () => {
		test("responds with a 400 status when given an an empty object", () => {
			const testComment = {};
			return request(app)
				.post("/api/articles/2/comments")
				.send(testComment)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});

		test("responds with a 400 status when given an incomplete request", () => {
			const testComment = {
				username: "rogersop",
			};
			return request(app)
				.post("/api/articles/3/comments")
				.send(testComment)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});

		test("responds with a 400 status when given an invalid data type as a username", () => {
			const testComment = {
				username: 1234,
				body: "Wow. I, for one, am shocked and appalled!!!",
			};
			return request(app)
				.post("/api/articles/3/comments")
				.send(testComment)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});

		test("responds with a 400 status when posting to an article that doesn't exist", () => {
			const testComment = {
				username: "rogersop",
				body: "Wow. I, for one, am shocked and appalled!!!",
			};
			return request(app)
				.post("/api/articles/9000/comments")
				.send(testComment)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
		test("responds with a 400 status when posting using an invalid data type for an article_id", () => {
			const testComment = {
				username: "rogersop",
				body: "Wow. I, for one, am shocked and appalled!!!",
			};
			return request(app)
				.post("/api/articles/forklift/comments")
				.send(testComment)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
	});
});

//// question 8 patchArticleVotes

describe("PATCH /api/articles/:article_id", () => {
	describe("behaviours", () => {
		test("PATCH:200 takes a number argument and updates the vote value on an article given the article id ", () => {
			const updatedVotes = {
				inc_votes: 6,
			};
			return request(app)
				.patch("/api/articles/1")
				.send(updatedVotes)
				.expect(200)
				.then((response) => {
					expect(response.body.vote.votes).toBe(106);
				});
		});
		test("PATCH:200 takes a negative number argument and updates the vote value on an article given the article id ", () => {
			const updatedVotes = {
				inc_votes: -17,
			};
			return request(app)
				.patch("/api/articles/1")
				.send(updatedVotes)
				.expect(200)
				.then((response) => {
					expect(response.body.vote.votes).toBe(83);
				});
		});
		test("PATCH:200 takes an argument with no value and the vote value stays the same", () => {
			const updatedVotes = {
				inc_votes: 0,
			};
			return request(app)
				.patch("/api/articles/1")
				.send(updatedVotes)
				.expect(200)
				.then((response) => {
					expect(response.body.vote.votes).toBe(100);
				});
		});

		test("works when the article does not currently have any votes to display", () => {
			const updatedVotes = {
				inc_votes: 10,
			};
			return request(app)
				.patch("/api/articles/2")
				.send(updatedVotes)
				.expect(200)
				.then((response) => {
					expect(response.body.vote.votes).toBe(10);
				});
		});
	});
	describe("Error handling", () => {
		test("takes an empty object and returns 400", () => {
			const updatedVotes = {};
			return request(app)
				.patch("/api/articles/1")
				.send(updatedVotes)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});

		test("takes an object with null value and returns 400", () => {
			const updatedVotes = {
				inc_votes: null,
			};
			return request(app)
				.patch("/api/articles/1")
				.send(updatedVotes)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
		test("when given an invalid article id returns 400", () => {
			const updatedVotes = {
				inc_votes: null,
			};
			return request(app)
				.patch("/api/articles/forklift")
				.send(updatedVotes)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
		test("when given a non-existent article id returns 404", () => {
			const updatedVotes = {
				inc_votes: null,
			};
			return request(app)
				.patch("/api/articles/9000")
				.send(updatedVotes)
				.expect(404)
				.then((response) => {
					expect(response.body.msg).toEqual("Not Found");
				});
		});
	});
});

/// QUESTION 9 deleteCommentById

describe("DELETE /api/comments/:comment_id", () => {
	describe("behaviours", () => {
		test("DELETE:204 takes a comment_id argument and deletes the comment object on the corresponding article ", () => {
			return request(app)
				.delete("/api/comments/1")
				.expect(204)
				.then((response) => {
					expect(response.body).toEqual({});
				});
		});
	});
	describe("Error handling", () => {
		test("when given a valid but non existent comment_id, returns 404", () => {
			return request(app)
				.delete("/api/comments/9000")
				.expect(404)
				.then((response) => {
					expect(response.body.msg).toEqual("Not Found");
				});
		});
		test("when given an invalid format as a comment_id, returns 400", () => {
			return request(app)
				.delete("/api/comments/forklift")
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
		test("when given no comment_id, returns 400", () => {
			const commentId = null;
			return request(app)
				.delete(`/api/comments/${commentId}`)
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toEqual("Bad request");
				});
		});
	});
});

/// QUESTION 10 getUsers

describe("GET /api/users", () => {
	describe("behaviours", () => {
		test("responds with 200 status code when accessing users", () => {
			return request(app)
				.get("/api/users")
				.expect(200)
				.then((response) => {
					const users = response.body.users;
					expect(users.length).toBe(4);
					expect(Array.isArray(users)).toBe(true);
					users.forEach((user) => {
						expect(user).toHaveProperty("username"),
							expect(typeof user.username).toBe("string");
						expect(user).toHaveProperty("name");
						expect(typeof user.name).toBe("string");
						expect(user).toHaveProperty("avatar_url");
						expect(typeof user.avatar_url).toBe("string");
					});
				});
		});
	});
	describe("error handling", () => {
		test("responds with a 404 status when given a valid but non-existent endpoint", () => {
			return request(app).get("/api/usersss").expect(404);
		});
	});
});


describe("GET /api/articles (topic query)", () => {
	test("GET: should return articles filtered by topic if given a topic query", () => {
		// const topic = "mitch";
		return request(app)
			.get("/api/articles?topic=mitch")
			.expect(200)
			.then((response) => {
                const articles = response.body.articles;
                console.log(articles)
				expect(Array.isArray(articles)).toBe(true);
				expect(articles).toBeSortedBy("created_at", { descending: true });
				expect(articles.length).toBe(12);
				articles.forEach((article) => {
					expect(article.topic).toEqual("mitch");
				});
			});
	});
});
describe("error handling", () => {
	test("responds with a 404 status when given a valid but non-existent query", () => {
		return request(app).get("/api/article?topic=witch").expect(404);
	});
});
