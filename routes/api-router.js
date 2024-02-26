/** @format */

const apiRouter = require("express").Router();

const { getStatus, getAPI } = require("../controller");
const articlesRouter = require("./articles-router")
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");


apiRouter.get("/healthcheck", getStatus);
apiRouter.get("/", getAPI);
apiRouter.use("/articles", articlesRouter)
apiRouter.use("/comments", commentsRouter)
apiRouter.use("/topics", topicsRouter)
apiRouter.use("/users", usersRouter)

module.exports = apiRouter;

