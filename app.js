const express = require('express');
const app = express();
const { getStatus, getTopics } = require('./controller');

app.use(express.json());

app.get('/api/healthcheck', getStatus);
app.get('/api/topics', getTopics);

module.exports = app;