const cors = require('cors')
const express = require("express");
const app = express();


app.use(cors());
app.use(express.json());

const apiRouter = require("./routes/api-router");

app.use("/api", apiRouter);


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
