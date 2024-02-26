/** @format */

const commentsRouter = require("express").Router();

const { deleteCommentById } = require("../controller");

commentsRouter.delete("/:comment_id", deleteCommentById);

module.exports = commentsRouter
