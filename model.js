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
    CAST(COUNT(comments.body) AS INTEGER) AS comment_count
    FROM articles
    JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`)
        .then((response) => {
            return response.rows
        })
}


exports.accessComments = (id) => {
    
    return db.query(` 
    SELECT *
    FROM comments 
    WHERE article_id = $1 
    ORDER BY comments.created_at DESC`, [id])
        .then((response) => {
            return response.rows
        })
} 

exports.addComment = ({ article_id, username, body }) => {
    
    const newComment = {
        author: username,
        body: body
    }

    if (!article_id || !username || !body) {
        return Promise.reject({status: 400, msg: 'Bad request'})
    }

    return db.query(` 
    INSERT INTO comments 
    (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;`, [article_id, newComment.author, newComment.body])
        .then((response) => {
            return response.rows[0]
        })
} 


 