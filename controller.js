const { accessTopics, selectArticleById, accessArticles } = require("./model")
const apiCEndpointsJSON = require('./endpoints.json')



exports.getStatus = (request, response) => {
    response.status(200).send();
}

exports.getTopics = (request, response) => {
    accessTopics().then((topics) => {
        response.status(200).send({ topics })
        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAPI = (request, response) => {
        response.status(200).send(apiCEndpointsJSON);
    }



exports.getArticleById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticleById(article_id).then((article) => {
        response.status(200).send({ article });

    }).catch((err) => {
        next(err)
    })
}

exports.getArticles = (request, response, next) => {
    accessArticles().then((articles) => {
        response.status(200).send({ articles })
        
    })
    .catch((err) => {
        next(err)
    })

}; 

