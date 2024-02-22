/** @format */

const express = require("express");
const app = express();

const {
	getStatus,
	getTopics,
	getAPI,
	getArticleById,
	getArticles,
	getCommentsByArticle,
	postCommentOnArticle,
	patchArticleVotes,
    deleteCommentById,
    getUsers,
} = require("./controller");

app.use(express.json());

app.get("/api/healthcheck", getStatus);
app.get("/api", getAPI);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticle);
app.post("/api/articles/:article_id/comments", postCommentOnArticle);
app.patch("/api/articles/:article_id", patchArticleVotes);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.get("/api/users", getUsers)

app.use((err, request, response, next) => {
	console.log("err in error handling in middleware", err);

	if (err.status && err.msg) {
		response.status(err.status).send({ msg: err.msg });
	} else if (
		err.code === "22P02" ||
		err.code === "23503" ||
		err.code === "23502"
	) {
		response.status(400).send({ msg: "Bad request" });
	}
});

module.exports = app;
