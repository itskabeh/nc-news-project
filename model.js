const db = require("./db/connection.js")


exports.accessTopics = () => {
    return db.query("SELECT * FROM topics;")
        .then((response) => {
            return response.rows
        })
}




exports.selectArticleById = (id) => {
    return db
        .query('SELECT * FROM articles WHERE article_id = $1;', [id])
        .then(({ rows }) => {
            const article = rows[0];
            if (!article) {
                return Promise.reject({ status: 404, msg: 'article does not exist' })
            }
            return article
        });
}; 


exports.accessArticles = () => {

    return db.query(`
    SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.body) AS comment_count
    FROM articles
    JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`)
        .then((response) => {
            return response.rows
        })
}


 