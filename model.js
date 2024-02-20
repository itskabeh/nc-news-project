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
            // console.log(article)
            return article
        });
}; 