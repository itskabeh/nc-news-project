/** @format */


const usersRouter = require("express").Router();

const { getUsers } = require("../controller");

usersRouter.get("/", getUsers);

module.exports = usersRouter
