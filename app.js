const express = require('express');
const app = express();

const { getStatus, getTopics, getAPI, getArticleById, getArticles, getCommentsByArticle } = require('./controller');

app.use(express.json());

app.get('/api/healthcheck', getStatus);
app.get('/api/topics', getTopics);
app.get('/api', getAPI);
app.get('/api/articles/:article_id', getArticleById) 
app.get('/api/articles', getArticles)


app.use((err, request, response, next) => {
    console.log("err in error handling in middleware", err);

    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
    }
  
else if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" })

  }

})


module.exports = app;