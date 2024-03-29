/** @format */

const articlesRouter = require("express").Router();

const {
	getArticleById,
	getArticles,
	getCommentsByArticle,
	postCommentOnArticle,
    patchArticleVotes,
    postNewArticle
} = require("../controller");


articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getCommentsByArticle);
articlesRouter.post("/:article_id/comments", postCommentOnArticle);
articlesRouter.patch("/:article_id", patchArticleVotes);
articlesRouter.post("/", postNewArticle);

module.exports = articlesRouter