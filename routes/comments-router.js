/** @format */

const commentsRouter = require("express").Router();

const { deleteCommentById, patchCommentVotes } = require("../controller");

commentsRouter.delete("/:comment_id", deleteCommentById);
commentsRouter.patch("/:comment_id", patchCommentVotes);


module.exports = commentsRouter
