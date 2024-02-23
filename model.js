/** @format */

const db = require("./db/connection.js");

exports.accessTopics = () => {
	return db.query("SELECT * FROM topics;").then((response) => {
		return response.rows;
	});
};

exports.selectArticleById = (id) => {
	return db
		.query(
			`
        SELECT  
        articles.*,
        CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id; `,
			[id]
		)
		.then(({ rows }) => {
			const article = rows[0];
			if (!article) {
				return Promise.reject({ status: 404, msg: "article does not exist" });
			}
			return article;
		});
};


exports.accessArticles = (topic) => {

    let queryStr = `
    SELECT
        articles.article_id,
        articles.author,
        articles.title,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        CAST(COUNT(comments.body) AS INTEGER) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;
    
    
    let queryValues = []
    if (topic) {
        queryStr += ' WHERE articles.topic = $1';
        queryValues.push(topic);
    }

    queryStr += ' GROUP BY articles.article_id ORDER BY articles.created_at DESC'

    return db
        .query(queryStr, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" });

        }
            return response.rows;
        });

}
    


exports.accessComments = (id) => {
	return db
		.query(
			` 
    SELECT *
    FROM comments 
    WHERE article_id = $1 
    ORDER BY comments.created_at DESC`,
			[id]
		)
		.then((response) => {
			return response.rows;
		});
};

exports.addComment = ({ article_id, username, body }) => {

    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Article does not exist" });
            }
    

            const newComment = {
                author: username,
                body: body,
            };

            if (!article_id || !username || !body) {
                return Promise.reject({ status: 400, msg: "Bad request" });
            }

            return db
                .query(
                    ` 
    INSERT INTO comments 
    (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;`,
                    [article_id, newComment.author, newComment.body]
                )
                .then((response) => {
                    return response.rows[0];
                });
        })
};

exports.updateVotes = (article_id, newVote) => {
	const updatedVotes = {
		inc_votes: newVote,
	};
	return Promise.resolve(
		db.query(
			`
        SELECT * 
        FROM articles
        WHERE article_id = $1
        `,
			[article_id]
		)
	).then((response) => {
		if (response.rowCount === 0) {
			return Promise.reject({ status: 404, msg: "Not Found" });
		} else {
			return db
				.query(
					` 
    UPDATE articles 
    SET votes = votes + $1  
    WHERE article_id = $2
    RETURNING *`,
					[updatedVotes.inc_votes, article_id]
				)
				.then((response) => {
					return response.rows[0];
				});
		}
	});
};

exports.selectComment = (comment_id) => {
	return Promise.resolve(
		db.query(
			`
        SELECT * 
        FROM comments
        WHERE comment_id = $1
        `,
			[comment_id]
		)
	).then((response) => {
		if (response.rowCount === 0) {
			return Promise.reject({ status: 404, msg: "Not Found" });
		} else {
			return db
				.query(
					`
                DELETE comment
                FROM comments
                WHERE comment_id = $1
                RETURNING *`[comment_id]
				)
				.then((response) => {
					return response.rows;
				});
		}
	});
};

exports.accessUsers = () => {

    return db.query("SELECT * FROM users;")
        .then((response) => {
            return response.rows;
        });
}





 
    
