const express = require('express');
// // const fs = require('fs')
const app = express();

const { getStatus, getTopics, getAPI, getArticleById } = require('./controller');

app.use(express.json());

app.get('/api/healthcheck', getStatus);
app.get('/api/topics', getTopics);
app.get('/api', getAPI);


module.exports = app;